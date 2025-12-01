-- Add restrictive policy to block all unauthenticated access to activity_log
CREATE POLICY "Block all unauthenticated access to activity_log"
ON public.activity_log
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);