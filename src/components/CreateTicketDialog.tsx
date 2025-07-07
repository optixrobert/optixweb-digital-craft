import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ticketSchema = z.object({
  title: z.string().min(5, 'Il titolo deve essere di almeno 5 caratteri'),
  description: z.string().min(10, 'La descrizione deve essere di almeno 10 caratteri'),
  category: z.enum(['general', 'technical', 'billing', 'feature_request', 'bug_report']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTicketCreated: () => void;
}

export default function CreateTicketDialog({ open, onOpenChange, onTicketCreated }: CreateTicketDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      category: 'general',
      priority: 'medium',
    },
  });

  const handleSubmit = async (data: TicketFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('tickets')
        .insert([{
          title: data.title,
          description: data.description,
          category: data.category,
          priority: data.priority,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }]);

      if (error) throw error;

      toast({
        title: "Ticket creato",
        description: "Il tuo ticket è stato creato con successo. Ti risponderemo il prima possibile.",
      });

      form.reset();
      onOpenChange(false);
      onTicketCreated();
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione del ticket",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crea Nuovo Ticket</DialogTitle>
          <DialogDescription>
            Descrivi il tuo problema o richiesta. Il nostro team ti risponderà il prima possibile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo</Label>
            <Input
              id="title"
              {...form.register('title')}
              placeholder="Breve descrizione del problema"
              disabled={isLoading}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Descrivi dettagliatamente il tuo problema o richiesta"
              rows={4}
              disabled={isLoading}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={form.watch('category')}
                onValueChange={(value) => form.setValue('category', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Generale</SelectItem>
                  <SelectItem value="technical">Tecnico</SelectItem>
                  <SelectItem value="billing">Fatturazione</SelectItem>
                  <SelectItem value="feature_request">Richiesta Feature</SelectItem>
                  <SelectItem value="bug_report">Segnalazione Bug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priorità</Label>
              <Select
                value={form.watch('priority')}
                onValueChange={(value) => form.setValue('priority', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Bassa</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creazione...' : 'Crea Ticket'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}