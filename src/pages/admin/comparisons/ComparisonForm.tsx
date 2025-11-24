import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Switch } from '@/components/ui/switch';

interface Product {
  id: string;
  title: string;
  platform: string;
  price: string;
}

const ComparisonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    custom_description: '',
    amazon_product_id: '',
    temu_product_id: '',
    ebay_product_id: '',
    is_published: true,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (isEdit) {
      fetchComparison();
    }
  }, [id]);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('id, title, platform, price')
      .eq('is_published', true)
      .order('title');

    if (data) {
      setProducts(data);
    }
  };

  const fetchComparison = async () => {
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch comparison',
        variant: 'destructive',
      });
      navigate('/admin/comparisons');
    } else if (data) {
      setFormData({
        title: data.title,
        custom_description: data.custom_description || '',
        amazon_product_id: data.amazon_product_id || '',
        temu_product_id: data.temu_product_id || '',
        ebay_product_id: data.ebay_product_id || '',
        is_published: data.is_published,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const comparisonData = {
      ...formData,
      created_by: user?.id,
    };

    if (isEdit) {
      const { error } = await supabase
        .from('comparisons')
        .update(comparisonData)
        .eq('id', id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update comparison',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Comparison updated successfully',
        });
        navigate('/admin/comparisons');
      }
    } else {
      const { error } = await supabase
        .from('comparisons')
        .insert([comparisonData]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create comparison',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Comparison created successfully',
        });
        navigate('/admin/comparisons');
      }
    }

    setLoading(false);
  };

  const amazonProducts = products.filter(p => p.platform === 'amazon');
  const temuProducts = products.filter(p => p.platform === 'temu');
  const ebayProducts = products.filter(p => p.platform === 'ebay');

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Edit Comparison' : 'Create New Comparison'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Comparison Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Best Wireless Earbuds Under $50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_description">Description</Label>
                <Textarea
                  id="custom_description"
                  value={formData.custom_description}
                  onChange={(e) => setFormData({ ...formData, custom_description: e.target.value })}
                  placeholder="Optional custom description for this comparison..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amazon_product">Amazon Product</Label>
                <Select
                  value={formData.amazon_product_id}
                  onValueChange={(value) => setFormData({ ...formData, amazon_product_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Amazon product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {amazonProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title} - {product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temu_product">Temu Product</Label>
                <Select
                  value={formData.temu_product_id}
                  onValueChange={(value) => setFormData({ ...formData, temu_product_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Temu product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {temuProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title} - {product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ebay_product">eBay Product (Optional)</Label>
                <Select
                  value={formData.ebay_product_id}
                  onValueChange={(value) => setFormData({ ...formData, ebay_product_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select eBay product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {ebayProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title} - {product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : isEdit ? 'Update Comparison' : 'Create Comparison'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/comparisons')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ComparisonForm;
