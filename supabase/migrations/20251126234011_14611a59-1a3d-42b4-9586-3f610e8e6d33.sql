-- Remove the policy that allows authenticated users to insert activity logs from client-side
-- This prevents false data injection and ensures only server-side logging (edge functions with service role key)
DROP POLICY IF EXISTS "All authenticated users can insert activity" ON public.activity_log;

-- The existing SELECT policies remain:
-- 1. "Deny public access to activity log" - prevents any public reads
-- 2. "Only super admins can view activity log" - allows only super admins to view logs

-- Note: Edge functions using the service role key will bypass RLS and can insert logs
-- This ensures activity logging happens only from trusted server-side code