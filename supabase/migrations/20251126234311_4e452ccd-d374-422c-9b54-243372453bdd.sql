-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add a comprehensive deny policy for anonymous (public) users for ALL operations
CREATE POLICY "Deny all public access to profiles" 
ON public.profiles 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- The existing authenticated user policies remain:
-- 1. "Users can view own profile, admins can view all" - allows authenticated users to see their own profile or admins to see all
-- 2. "Super admins can update profiles" - allows super admins to update profiles