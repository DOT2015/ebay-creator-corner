import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, ExternalLink, Check, RefreshCw } from 'lucide-react';

type PurchaseTrack = {
  id: string;
  product_id: string | null;
  product_title: string;
  platform: string;
  affiliate_link: string | null;
  clicked_at: string;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  converted: boolean;
  converted_at: string | null;
  notes: string | null;
};

export default function PurchaseTracking() {
  const [tracks, setTracks] = useState<PurchaseTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [conversionFilter, setConversionFilter] = useState<string>('all');
  const { toast } = useToast();

  const fetchTracks = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('purchase_tracking')
        .select('*')
        .order('clicked_at', { ascending: false })
        .limit(200);

      if (platformFilter !== 'all') {
        query = query.eq('platform', platformFilter);
      }

      if (conversionFilter === 'converted') {
        query = query.eq('converted', true);
      } else if (conversionFilter === 'pending') {
        query = query.eq('converted', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTracks(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [platformFilter, conversionFilter]);

  const toggleConversion = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('purchase_tracking')
        .update({ 
          converted: !currentStatus,
          converted_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      setTracks(tracks.map(t => 
        t.id === id 
          ? { ...t, converted: !currentStatus, converted_at: !currentStatus ? new Date().toISOString() : null }
          : t
      ));

      toast({
        title: 'Success',
        description: `Marked as ${!currentStatus ? 'converted' : 'pending'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalClicks: tracks.length,
    conversions: tracks.filter(t => t.converted).length,
    conversionRate: tracks.length > 0 
      ? ((tracks.filter(t => t.converted).length / tracks.length) * 100).toFixed(1) 
      : '0',
  };

  const getPlatformBadge = (platform: string) => {
    const colors: Record<string, string> = {
      amazon: 'bg-orange-500',
      temu: 'bg-pink-500',
      ebay: 'bg-blue-500',
      other: 'bg-gray-500',
    };
    return <Badge className={colors[platform] || colors.other}>{platform}</Badge>;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading purchase data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-8 w-8" />
              Purchase Tracking
            </h2>
            <p className="text-muted-foreground">Track affiliate link clicks and conversions</p>
          </div>
          <Button onClick={fetchTracks} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Clicks</p>
            <p className="text-3xl font-bold">{stats.totalClicks}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Conversions</p>
            <p className="text-3xl font-bold text-green-600">{stats.conversions}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="text-3xl font-bold">{stats.conversionRate}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search by product or platform..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="temu">Temu</SelectItem>
              <SelectItem value="ebay">eBay</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={conversionFilter} onValueChange={setConversionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Clicked At</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Converted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTracks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No click data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTracks.map((track) => (
                  <TableRow key={track.id}>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{track.product_title}</p>
                        {track.referrer && (
                          <p className="text-xs text-muted-foreground truncate">
                            From: {track.referrer}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getPlatformBadge(track.platform)}</TableCell>
                    <TableCell>
                      <div>
                        <p>{new Date(track.clicked_at).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(track.clicked_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono">
                        {track.ip_address || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={track.converted}
                          onCheckedChange={() => toggleConversion(track.id, track.converted)}
                        />
                        {track.converted && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {track.affiliate_link && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(track.affiliate_link!, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
