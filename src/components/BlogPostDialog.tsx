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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? 'Modifica Articolo' : 'Nuovo Articolo'}</DialogTitle>
          <DialogDescription>
            {post ? 'Modifica l\'articolo del blog' : 'Crea un nuovo articolo per il blog'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo *</Label>
              <Input
                id="title"
                {...form.register('title')}
                onChange={(e) => handleTitleChange(e.target.value)}
                disabled={isLoading}
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
              placeholder="Breve descrizione dell'articolo..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenuto *</Label>
            <Textarea
              id="content"
              {...form.register('content')}
              disabled={isLoading}
              rows={12}
              placeholder="Scrivi qui il contenuto dell'articolo..."
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImageUrl">URL Immagine in Evidenza</Label>
            <Input
              id="featuredImageUrl"
              {...form.register('featuredImageUrl')}
              disabled={isLoading}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
              <Input
                id="metaTitle"
                {...form.register('metaTitle')}
                disabled={isLoading}
                placeholder="Titolo per motori di ricerca"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tag</Label>
              <Input
                id="tags"
                {...form.register('tags')}
                disabled={isLoading}
                placeholder="web design, seo, marketing (separati da virgola)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
            <Textarea
              id="metaDescription"
              {...form.register('metaDescription')}
              disabled={isLoading}
              rows={3}
              placeholder="Descrizione per motori di ricerca (max 160 caratteri)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={form.watch('published')}
              onCheckedChange={(checked) => form.setValue('published', checked)}
              disabled={isLoading}
            />
            <Label htmlFor="published">Pubblica articolo</Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvataggio...' : post ? 'Aggiorna' : 'Crea Articolo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}