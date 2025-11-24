import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Package, FileText, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    amazonProducts: 0,
    temuProducts: 0,
    ebayProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalPosts: 0,
    publishedPosts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: products } = await supabase
      .from('products')
      .select('platform, is_published');
    
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('status');

    if (products) {
      setStats({
        totalProducts: products.length,
        amazonProducts: products.filter(p => p.platform === 'amazon').length,
        temuProducts: products.filter(p => p.platform === 'temu').length,
        ebayProducts: products.filter(p => p.platform === 'ebay').length,
        publishedProducts: products.filter(p => p.is_published).length,
        draftProducts: products.filter(p => !p.is_published).length,
        totalPosts: posts?.length || 0,
        publishedPosts: posts?.filter(p => p.status === 'published').length || 0,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/products/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/blog/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedProducts} published, {stats.draftProducts} draft
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amazon Products</CardTitle>
              <Package className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.amazonProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temu Products</CardTitle>
              <Package className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.temuProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedPosts} published
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/products')}>
                <Package className="w-4 h-4 mr-2" />
                Manage Products
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/links')}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Affiliate Links
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/blog')}>
                <FileText className="w-4 h-4 mr-2" />
                Blog Manager
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Amazon</span>
                  <span className="font-bold">{stats.amazonProducts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temu</span>
                  <span className="font-bold">{stats.temuProducts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">eBay</span>
                  <span className="font-bold">{stats.ebayProducts}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
