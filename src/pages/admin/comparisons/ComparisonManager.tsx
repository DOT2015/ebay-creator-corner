import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Comparison {
  id: string;
  title: string;
  custom_description: string | null;
  is_published: boolean;
  created_at: string;
}

const ComparisonManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch comparisons',
        variant: 'destructive',
      });
    } else {
      setComparisons(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comparison?')) return;

    const { error } = await supabase
      .from('comparisons')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete comparison',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Comparison deleted successfully',
      });
      fetchComparisons();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('comparisons')
      .update({ is_published: !currentStatus })
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
        description: `Comparison ${!currentStatus ? 'published' : 'unpublished'}`,
      });
      fetchComparisons();
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading comparisons...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Comparison Manager</h2>
          <Button onClick={() => navigate('/admin/comparisons/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Comparison
          </Button>
        </div>

        <div className="grid gap-4">
          {comparisons.map((comparison) => (
            <Card key={comparison.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{comparison.title}</h3>
                      <Badge variant={comparison.is_published ? 'default' : 'secondary'}>
                        {comparison.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    {comparison.custom_description && (
                      <p className="text-sm text-muted-foreground">
                        {comparison.custom_description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/comparisons/${comparison.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublish(comparison.id, comparison.is_published)}
                    >
                      {comparison.is_published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(comparison.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {comparisons.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No comparisons yet</p>
              <Button onClick={() => navigate('/admin/comparisons/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Comparison
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ComparisonManager;
