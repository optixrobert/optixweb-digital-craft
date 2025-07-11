-- Create a table for website analytics
CREATE TABLE public.website_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  session_id TEXT,
  visit_duration INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for blog post analytics
CREATE TABLE public.blog_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  visitor_ip TEXT,
  session_id TEXT,
  time_spent INTEGER DEFAULT 0,
  scroll_percentage INTEGER DEFAULT 0,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage website analytics" 
ON public.website_analytics 
FOR ALL 
USING (is_admin());

CREATE POLICY "Anyone can insert website analytics" 
ON public.website_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage blog analytics" 
ON public.blog_analytics 
FOR ALL 
USING (is_admin());

CREATE POLICY "Anyone can insert blog analytics" 
ON public.blog_analytics 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_website_analytics_page_path ON public.website_analytics(page_path);
CREATE INDEX idx_website_analytics_created_at ON public.website_analytics(created_at);
CREATE INDEX idx_blog_analytics_blog_post_id ON public.blog_analytics(blog_post_id);
CREATE INDEX idx_blog_analytics_created_at ON public.blog_analytics(created_at);