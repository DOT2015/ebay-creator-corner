-- Add restrictive policy to block all unauthenticated access to user_roles
CREATE POLICY "Block all unauthenticated access to user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);