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

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isEdit = !!id;

  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    price: '',
    image_url: '',
    affiliate_link: '',
    platform: 'amazon' as const,
    category: 'other' as const,
    is_published: true,
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch product',
        variant: 'destructive',
      });
      navigate('/admin/products');
    } else if (data) {
      setFormData(data);
    }
  };

  const fetchProductData = async (url: string) => {
    if (!url || (!url.includes('amazon.com') && !url.includes('amzn.to'))) {
      return;
    }

    setFetchingProduct(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-amazon-product', {
        body: { url },
      });

      if (error) throw error;

      if (data) {
        setFormData((prev: any) => ({
          ...prev,
          title: data.title || prev.title,
          price: data.price || prev.price,
          image_url: data.image_url || prev.image_url,
        }));
        toast({
          title: 'Success',
          description: 'Product data fetched from Amazon',
        });
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch product data. You can enter it manually.',
        variant: 'destructive',
      });
    } finally {
      setFetchingProduct(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...formData,
      created_by: user?.id,
    };

    if (isEdit) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update product',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
        navigate('/admin/products');
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create product',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
        navigate('/admin/products');
      }
    }

    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$99.99"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform *</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="temu">Temu</SelectItem>
                      <SelectItem value="ebay">eBay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="car_accessories">Car</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliate_link">Affiliate Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="affiliate_link"
                    type="url"
                    value={formData.affiliate_link || ''}
                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                    placeholder="https://amzn.to/..."
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => fetchProductData(formData.affiliate_link)}
                    disabled={fetchingProduct || !formData.affiliate_link}
                  >
                    {fetchingProduct ? 'Fetching...' : 'Fetch Data'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Paste an Amazon link and click "Fetch Data" to auto-populate product details
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Mark as featured</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading} className="transition-all duration-200 hover:scale-105">
                  {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/products')}
                  className="transition-all duration-200 hover:scale-105"
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

export default ProductForm;
