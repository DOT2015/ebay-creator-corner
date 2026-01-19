-- Drop the overly permissive insert policy
DROP POLICY "Allow tracking inserts" ON public.purchase_tracking;

-- Create a more restrictive insert policy (allow from edge functions/service role only)
-- Public users can still track clicks via edge function
CREATE POLICY "Service role can insert purchase tracking"
ON public.purchase_tracking
FOR INSERT
TO service_role
WITH CHECK (true);