import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  published: boolean;
}

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  display_order: number;
  published: boolean;
}

export default function ClientDialog({ open, onOpenChange, client, onSuccess }: ClientDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
      display_order: 0,
      published: true,
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        name: client.name,
        description: client.description || "",
        logo_url: client.logo_url || "",
        website_url: client.website_url || "",
        display_order: client.display_order,
        published: client.published,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        logo_url: "",
        website_url: "",
        display_order: 0,
        published: true,
      });
    }
  }, [client, form]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (client) {
        // Update existing client
        const { error } = await supabase
          .from('clients')
          .update({
            name: data.name,
            description: data.description || null,
            logo_url: data.logo_url || null,
            website_url: data.website_url || null,
            display_order: data.display_order,
            published: data.published,
          })
          .eq('id', client.id);

        if (error) throw error;

        toast({
          title: "Cliente aggiornato",
          description: "Le informazioni del cliente sono state aggiornate con successo",
        });
      } else {
        // Create new client
        const { error } = await supabase
          .from('clients')
          .insert({
            name: data.name,
            description: data.description || null,
            logo_url: data.logo_url || null,
            website_url: data.website_url || null,
            display_order: data.display_order,
            published: data.published,
          });

        if (error) throw error;

        toast({
          title: "Cliente creato",
          description: "Il nuovo cliente è stato aggiunto con successo",
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving client:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvataggio del cliente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Modifica Cliente' : 'Nuovo Cliente'}</DialogTitle>
          <DialogDescription>
            {client ? 'Modifica le informazioni del cliente.' : 'Aggiungi un nuovo cliente alla sezione partnership.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Cliente *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome dell'azienda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrizione della partnership o testimonianza"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Logo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://esempio.com/logo.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL dell'immagine del logo del cliente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sito Web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://esempio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordine di Visualizzazione</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Ordine in cui apparirà nella sezione clienti (0 = primo)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Pubblicato</FormLabel>
                    <FormDescription>
                      Mostra questo cliente nella sezione pubblica
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Annulla
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvataggio...' : (client ? 'Aggiorna' : 'Crea')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}