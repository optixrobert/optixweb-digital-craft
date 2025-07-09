import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const seoComponent = useSEO({
    title: post?.meta_title || post?.title || "Blog Post",
    description: post?.meta_description || post?.excerpt || "Leggi questo articolo del nostro blog",
    keywords: "blog, articolo, web development, design",
    canonicalUrl: `https://optixweb.space/blog/${slug}`
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Slug del post non trovato");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            excerpt,
            slug,
            created_at,
            featured_image_url,
            meta_title,
            meta_description,
            profiles!blog_posts_author_id_fkey(first_name, last_name)
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Post non trovato");

        setPost(data as BlogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError("Post non trovato");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {seoComponent}
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded mb-8"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        {seoComponent}
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post non trovato</h1>
            <p className="text-muted-foreground mb-8">
              Il post che stai cercando non esiste o non è più disponibile.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna alla homepage
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna al blog
            </Link>
          </Button>

          {/* Featured image */}
          {post.featured_image_url && (
            <div className="mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{new Date(post.created_at).toLocaleDateString('it-IT')}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>di {post.profiles.first_name} {post.profiles.last_name}</span>
              </div>
            </div>
          </header>

          {/* Post content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;