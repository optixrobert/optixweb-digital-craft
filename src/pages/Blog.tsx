import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  featured_image_url: string | null;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const seoComponent = useSEO({
    title: "Blog - Optixweb.space",
    description: "Leggi i nostri articoli su sviluppo web, design e tecnologia. Approfondimenti e consigli per agenzie e clienti.",
    keywords: "blog, web development, design, agenzia sviluppo, articoli tecnici",
    canonicalUrl: "https://optixweb.space/blog"
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching blog posts...');
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            excerpt,
            slug,
            created_at,
            featured_image_url,
            author_id
          `)
          .eq('published', true)
          .order('published_at', { ascending: false });

        console.log('Blog posts data:', data);
        console.log('Blog posts error:', error);

        if (error) throw error;
        
        // Fetch author profiles separately if needed
        const postsWithAuthors = data?.map(post => ({
          ...post,
          profiles: {
            first_name: 'Admin',
            last_name: 'Optix'
          }
        })) || [];
        
        setPosts(postsWithAuthors as BlogPost[]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {seoComponent}
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <CardHeader>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </CardHeader>
                  </div>
                </Card>
              ))}
            </div>
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
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Il Nostro Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Approfondimenti, guide e consigli per agenzie e clienti nel mondo dello sviluppo web e del design digitale.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">Nessun articolo trovato</h2>
                <p className="text-muted-foreground">
                  I nostri articoli sono in arrivo. Torna presto per leggere i nostri contenuti!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    {post.featured_image_url && (
                      <div className="relative overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <time>{new Date(post.created_at).toLocaleDateString('it-IT')}</time>
                        </div>
                        {post.profiles && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.profiles.first_name} {post.profiles.last_name}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button asChild variant="ghost" className="w-full group/button">
                        <Link to={`/blog/${post.slug}`}>
                          Leggi articolo
                          <ChevronRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;