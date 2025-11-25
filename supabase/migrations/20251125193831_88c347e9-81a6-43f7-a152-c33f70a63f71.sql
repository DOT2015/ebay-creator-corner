-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a new restricted SELECT policy
-- Users can only view their own profile, super admins can view all
CREATE POLICY "Users can view own profile, admins can view all" 
ON public.profiles 
FOR SELECT 
USING (
  id = auth.uid() OR is_super_admin(auth.uid())
);