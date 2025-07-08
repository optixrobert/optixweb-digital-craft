-- Creo la tabella per gli articoli del blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT NOT NULL UNIQUE,
  author_id UUID NOT NULL REFERENCES public.profiles(user_id),
  published BOOLEAN NOT NULL DEFAULT false,
  featured_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Abilito RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy per permettere a tutti di leggere gli articoli pubblicati
CREATE POLICY "Anyone can view published posts" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Policy per permettere agli admin di gestire tutti gli articoli
CREATE POLICY "Admins can manage all posts" 
ON public.blog_posts 
FOR ALL
TO authenticated
USING (public.is_admin());

-- Aggiungo trigger per aggiornare updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Creo indici per le performance
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_author ON public.blog_posts(author_id);