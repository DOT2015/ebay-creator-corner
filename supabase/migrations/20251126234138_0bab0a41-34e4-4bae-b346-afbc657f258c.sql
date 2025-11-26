-- Ensure RLS is enabled on activity_log
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Drop existing deny policy and recreate with comprehensive coverage
DROP POLICY IF EXISTS "Deny public access to activity log" ON public.activity_log;

-- Create a comprehensive deny policy for anonymous (public) users for ALL operations
CREATE POLICY "Deny all public access to activity log" 
ON public.activity_log 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- Ensure the super admin SELECT policy exists
-- (This should already exist, but we're making sure)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'activity_log' 
    AND policyname = 'Only super admins can view activity log'
  ) THEN
    CREATE POLICY "Only super admins can view activity log" 
    ON public.activity_log 
    FOR SELECT 
    TO authenticated
    USING (is_super_admin(auth.uid()));
  END IF;
END $$;