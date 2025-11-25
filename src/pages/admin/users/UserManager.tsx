import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Shield } from 'lucide-react';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

type UserRole = {
  id: string;
  user_id: string;
  role: 'super_admin' | 'content_manager' | 'affiliate_editor';
};

type UserWithRole = Profile & {
  role?: 'super_admin' | 'content_manager' | 'affiliate_editor';
};

export default function UserManager() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      const usersWithRoles = profiles?.map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.id);
        return {
          ...profile,
          role: userRole?.role,
        };
      }) || [];

      setUsers(usersWithRoles);
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
    fetchUsers();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', selectedUser)
        .maybeSingle();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: selectedRole as 'super_admin' | 'content_manager' | 'affiliate_editor' })
          .eq('user_id', selectedUser);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: selectedUser, role: selectedRole as 'super_admin' | 'content_manager' | 'affiliate_editor' }]);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Role assigned successfully',
      });

      setDialogOpen(false);
      setSelectedUser(null);
      setSelectedRole('');
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleRemoveRole = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user\'s role?')) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Role removed successfully',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getRoleBadge = (role?: string) => {
    if (!role) return <Badge variant="outline">No Role</Badge>;

    const variants: Record<string, any> = {
      super_admin: 'destructive',
      content_manager: 'default',
      affiliate_editor: 'secondary',
    };

    return (
      <Badge variant={variants[role] || 'outline'}>
        {role.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading users...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Users & Roles</h2>
            <p className="text-muted-foreground">Manage user access and permissions</p>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.full_name || '-'}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog open={dialogOpen && selectedUser === user.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (open) {
                        setSelectedUser(user.id);
                        setSelectedRole(user.role || '');
                      } else {
                        setSelectedUser(null);
                        setSelectedRole('');
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user.id);
                            setSelectedRole(user.role || '');
                            setDialogOpen(true);
                          }}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Assign Role
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Role</DialogTitle>
                          <DialogDescription>
                            Assign a role to {user.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Select value={selectedRole} onValueChange={setSelectedRole}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                                <SelectItem value="content_manager">Content Manager</SelectItem>
                                <SelectItem value="affiliate_editor">Affiliate Editor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAssignRole}>Assign Role</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {user.role && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRole(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
