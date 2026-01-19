-- Create purchases/click tracking table
CREATE TABLE public.purchase_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  platform TEXT NOT NULL,
  affiliate_link TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  converted BOOLEAN DEFAULT false,
  converted_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.purchase_tracking ENABLE ROW LEVEL SECURITY;

-- Block unauthenticated access
CREATE POLICY "Block all unauthenticated access to purchase_tracking"
ON public.purchase_tracking
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- Only super admins can view purchase tracking
CREATE POLICY "Only super admins can view purchase tracking"
ON public.purchase_tracking
FOR SELECT
USING (is_super_admin(auth.uid()));

-- Allow inserts from authenticated users (for tracking clicks)
CREATE POLICY "Allow tracking inserts"
ON public.purchase_tracking
FOR INSERT
WITH CHECK (true);

-- Super admins can update (mark as converted)
CREATE POLICY "Super admins can update purchase tracking"
ON public.purchase_tracking
FOR UPDATE
USING (is_super_admin(auth.uid()));