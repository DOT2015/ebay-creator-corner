-- Drop the overly permissive policy that allows all authenticated users to view all roles
DROP POLICY IF EXISTS "Users can view all roles" ON public.user_roles;

-- Create a restricted policy so users can only see their own roles, or super admins can see all
CREATE POLICY "Users see own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid() OR is_super_admin(auth.uid()));