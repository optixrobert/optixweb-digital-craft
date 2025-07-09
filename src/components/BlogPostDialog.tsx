import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from './RichTextEditor';
import { Eye, FileText, Settings } from 'lucide-react';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  content: z.string().min(1, 'Il contenuto è obbligatorio'),
  excerpt: z.string().optional(),
  slug: z.string().min(1, 'Lo slug è obbligatorio'),
  featuredImageUrl: z.string().url().optional().or(z.literal('')),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  published: boolean;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
}

interface BlogPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: BlogPost | null;
  onSuccess: () => void;
}

export default function BlogPostDialog({ open, onOpenChange, post, onSuccess }: BlogPostDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      featuredImageUrl: '',
      metaTitle: '',
      metaDescription: '',
      tags: '',
      published: false,
    },
  });

  // Aggiorna i valori del form quando il post cambia
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        slug: post.slug,
        featuredImageUrl: post.featured_image_url || '',
        metaTitle: post.meta_title || '',
        metaDescription: post.meta_description || '',
        tags: post.tags?.join(', ') || '',
        published: post.published,
      });
    } else {
      form.reset({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        featuredImageUrl: '',
        metaTitle: '',
        metaDescription: '',
        tags: '',
        published: false,
      });
    }
  }, [post, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!post) {
      form.setValue('slug', generateSlug(title));
    }
  };

  const handleSubmit = async (data: BlogPostFormData) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const tagsArray = data.tags 
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : null;

      const postData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || null,
        slug: data.slug,
        author_id: user.id,
        published: data.published,
        featured_image_url: data.featuredImageUrl || null,
        meta_title: data.metaTitle || null,
        meta_description: data.metaDescription || null,
        tags: tagsArray,
        published_at: data.published ? new Date().toISOString() : null,
      };

      let error;
      if (post) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: post ? 'Articolo aggiornato' : 'Articolo creato',
        description: post ? 'L\'articolo è stato aggiornato con successo' : 'L\'articolo è stato creato con successo',
      });

      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message || 'Si è verificato un errore',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {post ? 'Modifica Articolo' : 'Nuovo Articolo'}
          </DialogTitle>
          <DialogDescription>
            {post ? 'Modifica l\'articolo del blog con l\'editor avanzato' : 'Crea un nuovo articolo per il blog con formattazione avanzata'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Contenuto
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                SEO & Impostazioni
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Anteprima
              </TabsTrigger>
            </TabsList>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informazioni Base</CardTitle>
                    <CardDescription>
                      Titolo, slug e informazioni principali dell'articolo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titolo *</Label>
                        <Input
                          id="title"
                          {...form.register('title')}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          disabled={isLoading}
                          placeholder="Inserisci il titolo dell'articolo"
                        />
                        {form.formState.errors.title && (
                          <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug URL *</Label>
                        <Input
                          id="slug"
                          {...form.register('slug')}
                          disabled={isLoading}
                          placeholder="url-articolo"
                        />
                        {form.formState.errors.slug && (
                          <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Estratto</Label>
                      <Textarea
                        id="excerpt"
                        {...form.register('excerpt')}
                        disabled={isLoading}
                        rows={3}
                        placeholder="Breve descrizione dell'articolo che apparirà nell'anteprima..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="featuredImageUrl">URL Immagine in Evidenza</Label>
                      <Input
                        id="featuredImageUrl"
                        {...form.register('featuredImageUrl')}
                        disabled={isLoading}
                        placeholder="https://esempio.com/immagine.jpg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Inserisci l'URL di un'immagine che rappresenti l'articolo
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contenuto dell'Articolo</CardTitle>
                    <CardDescription>
                      Utilizza l'editor avanzato per formattare il tuo contenuto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      value={form.watch('content')}
                      onChange={(content) => form.setValue('content', content)}
                      placeholder="Scrivi qui il contenuto dell'articolo utilizzando l'editor avanzato..."
                      height={500}
                      disabled={isLoading}
                      error={form.formState.errors.content?.message}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ottimizzazione SEO</CardTitle>
                    <CardDescription>
                      Ottimizza l'articolo per i motori di ricerca
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
                        <Input
                          id="metaTitle"
                          {...form.register('metaTitle')}
                          disabled={isLoading}
                          placeholder="Titolo ottimizzato per motori di ricerca"
                        />
                        <p className="text-sm text-muted-foreground">
                          Consigliato: 50-60 caratteri
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tag</Label>
                        <Input
                          id="tags"
                          {...form.register('tags')}
                          disabled={isLoading}
                          placeholder="web design, seo, marketing"
                        />
                        <p className="text-sm text-muted-foreground">
                          Separare i tag con virgole
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                      <Textarea
                        id="metaDescription"
                        {...form.register('metaDescription')}
                        disabled={isLoading}
                        rows={3}
                        placeholder="Descrizione dell'articolo per motori di ricerca..."
                      />
                      <p className="text-sm text-muted-foreground">
                        Consigliato: 150-160 caratteri
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impostazioni Pubblicazione</CardTitle>
                    <CardDescription>
                      Controlli per la pubblicazione dell'articolo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={form.watch('published')}
                        onCheckedChange={(checked) => form.setValue('published', checked)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="published" className="flex flex-col">
                        <span>Pubblica articolo</span>
                        <span className="text-sm text-muted-foreground font-normal">
                          {form.watch('published') ? 'L\'articolo sarà visibile pubblicamente' : 'L\'articolo rimarrà in bozza'}
                        </span>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Anteprima Articolo</CardTitle>
                    <CardDescription>
                      Visualizza come apparirà l'articolo una volta pubblicato
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6 bg-background">
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            {form.watch('title') || 'Titolo dell\'articolo'}
                          </h1>
                          {form.watch('excerpt') && (
                            <p className="text-lg text-muted-foreground">
                              {form.watch('excerpt')}
                            </p>
                          )}
                        </div>
                        
                        {form.watch('featuredImageUrl') && (
                          <div className="my-6">
                            <img 
                              src={form.watch('featuredImageUrl')} 
                              alt="Immagine in evidenza"
                              className="w-full h-64 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: form.watch('content') || '<p>Il contenuto dell\'articolo apparirà qui...</p>' 
                          }}
                        />
                        
                        {form.watch('tags') && (
                          <div className="mt-6 pt-6 border-t">
                            <div className="flex flex-wrap gap-2">
                              {form.watch('tags').split(',').map((tag, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full"
                                >
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end gap-3 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                >
                  Annulla
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvataggio...' : post ? 'Aggiorna Articolo' : 'Crea Articolo'}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}