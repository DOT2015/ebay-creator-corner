
-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can upload media" ON public.media_library;
DROP POLICY IF EXISTS "Authenticated users can view media" ON public.media_library;

-- Restrict SELECT to super admins and content managers
CREATE POLICY "Admins and content managers can view media"
ON public.media_library
FOR SELECT
USING (is_super_admin(auth.uid()) OR has_role(auth.uid(), 'content_manager'::app_role));

-- Restrict INSERT to super admins and content managers
CREATE POLICY "Admins and content managers can upload media"
ON public.media_library
FOR INSERT
WITH CHECK (is_super_admin(auth.uid()) OR has_role(auth.uid(), 'content_manager'::app_role));
