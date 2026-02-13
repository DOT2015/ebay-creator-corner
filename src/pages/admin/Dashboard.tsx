import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Package, FileText, TrendingUp, Plus, ShoppingCart, MousePointerClick } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

type RecentClick = {
  id: string;
  product_title: string;
  platform: string;
  clicked_at: string;
  converted: boolean;
};

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
    totalClicks: 0,
    totalConversions: 0,
    recentClicks: [] as RecentClick[],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [{ data: products }, { data: posts }, { data: clicks }] = await Promise.all([
      supabase.from('products').select('platform, is_published'),
      supabase.from('blog_posts').select('status'),
      supabase.from('purchase_tracking')
        .select('id, product_title, platform, clicked_at, converted')
        .order('clicked_at', { ascending: false })
        .limit(10),
    ]);

    const allClicks = clicks || [];

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
        totalClicks: allClicks.length,
        totalConversions: allClicks.filter(c => c.converted).length,
        recentClicks: allClicks,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/products/new')} className="transition-all duration-200 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/blog/new')} className="transition-all duration-200 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
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

          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amazon Products</CardTitle>
              <Package className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.amazonProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temu Products</CardTitle>
              <Package className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.temuProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
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

        {/* Affiliate Click Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClicks}</div>
              <p className="text-xs text-muted-foreground">Last 10 tracked</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalConversions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalClicks > 0
                  ? `${((stats.totalConversions / stats.totalClicks) * 100).toFixed(1)}% rate`
                  : 'No data yet'}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer" onClick={() => navigate('/admin/purchases')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">View All Tracking</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Open full purchase tracking dashboard →</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Clicks Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointerClick className="h-5 w-5" />
                Recent Affiliate Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentClicks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No clicks tracked yet</p>
              ) : (
                <div className="space-y-3">
                  {stats.recentClicks.slice(0, 5).map((click) => (
                    <div key={click.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-medium truncate">{click.product_title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(click.clicked_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="secondary" className="capitalize">{click.platform}</Badge>
                        {click.converted && (
                          <Badge className="bg-primary text-primary-foreground">Converted</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions + Platform Breakdown */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start transition-all duration-200 hover:scale-105" variant="outline" onClick={() => navigate('/admin/products')}>
                  <Package className="w-4 h-4 mr-2" />
                  Manage Products
                </Button>
                <Button className="w-full justify-start transition-all duration-200 hover:scale-105" variant="outline" onClick={() => navigate('/admin/links')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Affiliate Links
                </Button>
                <Button className="w-full justify-start transition-all duration-200 hover:scale-105" variant="outline" onClick={() => navigate('/admin/blog')}>
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
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
