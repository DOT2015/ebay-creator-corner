-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'content_manager', 'affiliate_editor');

-- Create enum for product platform
CREATE TYPE public.product_platform AS ENUM ('amazon', 'temu', 'ebay', 'other');

-- Create enum for product category
CREATE TYPE public.product_category AS ENUM ('tech', 'home', 'kitchen', 'beauty', 'fashion', 'car_accessories', 'other');

-- Create enum for post status
CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'scheduled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  image_url TEXT NOT NULL,
  platform public.product_platform NOT NULL DEFAULT 'amazon',
  category public.product_category NOT NULL DEFAULT 'other',
  affiliate_link TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  status public.post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create blog_post_categories junction table
CREATE TABLE public.blog_post_categories (
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, category_id)
);

-- Create affiliate_links table
CREATE TABLE public.affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform public.product_platform NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create comparisons table
CREATE TABLE public.comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  amazon_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  temu_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  ebay_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  custom_description TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create media_library table
CREATE TABLE public.media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create activity_log table
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'super_admin')
$$;

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at BEFORE UPDATE ON public.affiliate_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comparisons_updated_at BEFORE UPDATE ON public.comparisons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Super admins can update profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Users can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Super admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for products
CREATE POLICY "Anyone can view published products" ON public.products
  FOR SELECT
  USING (is_published = TRUE OR auth.uid() IS NOT NULL);

CREATE POLICY "Super admins and affiliate editors can manage products" ON public.products
  FOR ALL TO authenticated
  USING (
    public.is_super_admin(auth.uid()) OR 
    public.has_role(auth.uid(), 'affiliate_editor')
  );

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Super admins and content managers can manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (
    public.is_super_admin(auth.uid()) OR 
    public.has_role(auth.uid(), 'content_manager')
  );

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view categories" ON public.blog_categories
  FOR SELECT
  USING (TRUE);

CREATE POLICY "Super admins can manage categories" ON public.blog_categories
  FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for blog_post_categories
CREATE POLICY "Anyone can view post categories" ON public.blog_post_categories
  FOR SELECT
  USING (TRUE);

CREATE POLICY "Super admins and content managers can manage post categories" ON public.blog_post_categories
  FOR ALL TO authenticated
  USING (
    public.is_super_admin(auth.uid()) OR 
    public.has_role(auth.uid(), 'content_manager')
  );

-- RLS Policies for affiliate_links
CREATE POLICY "Authenticated users can view affiliate links" ON public.affiliate_links
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Super admins and affiliate editors can manage links" ON public.affiliate_links
  FOR ALL TO authenticated
  USING (
    public.is_super_admin(auth.uid()) OR 
    public.has_role(auth.uid(), 'affiliate_editor')
  );

-- RLS Policies for comparisons
CREATE POLICY "Anyone can view published comparisons" ON public.comparisons
  FOR SELECT
  USING (is_published = TRUE OR auth.uid() IS NOT NULL);

CREATE POLICY "Super admins can manage comparisons" ON public.comparisons
  FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for media_library
CREATE POLICY "Authenticated users can view media" ON public.media_library
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Authenticated users can upload media" ON public.media_library
  FOR INSERT TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Super admins can delete media" ON public.media_library
  FOR DELETE TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for site_settings
CREATE POLICY "Authenticated users can view settings" ON public.site_settings
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Super admins can manage settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- RLS Policies for activity_log
CREATE POLICY "Super admins can view activity log" ON public.activity_log
  FOR SELECT TO authenticated
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "All authenticated users can insert activity" ON public.activity_log
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'SmartBuy Hub'),
  ('site_logo', ''),
  ('affiliate_disclosure', 'As an Amazon Associate, I earn from qualifying purchases. This site also contains affiliate links to Temu and other partners.'),
  ('contact_email', 'support@smartbuyhub.com'),
  ('theme_primary_color', '217 91% 60%'),
  ('theme_accent_color', '24 95% 53%');

-- Insert default blog categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
  ('Amazon Deals', 'amazon-deals', 'Best deals from Amazon'),
  ('Temu Finds', 'temu-finds', 'Top finds from Temu'),
  ('Product Reviews', 'product-reviews', 'Honest product reviews'),
  ('Shopping Tips', 'shopping-tips', 'Smart shopping advice'),
  ('Tech Guides', 'tech-guides', 'Technology buying guides');