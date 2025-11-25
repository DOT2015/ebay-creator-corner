-- Drop and recreate the SELECT policy to explicitly handle public access
DROP POLICY IF EXISTS "Super admins can view activity log" ON public.activity_log;

-- Create a more restrictive policy that explicitly denies unauthenticated access
CREATE POLICY "Only super admins can view activity log"
ON public.activity_log
FOR SELECT
TO authenticated
USING (is_super_admin(auth.uid()));

-- Ensure no public access by creating an explicit deny policy for anon users
CREATE POLICY "Deny public access to activity log"
ON public.activity_log
FOR SELECT
TO anon
USING (false);