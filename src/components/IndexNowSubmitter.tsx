import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const IndexNowSubmitter = () => {
  const [urls, setUrls] = useState("");
  const [host, setHost] = useState("optixweb.space");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urls.trim()) {
      toast.error("Inserisci almeno un URL");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse URLs from textarea (one per line)
      const urlList = urls
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      if (urlList.length === 0) {
        toast.error("Inserisci almeno un URL valido");
        return;
      }

      const { data, error } = await supabase.functions.invoke('submit-to-indexnow', {
        body: {
          urlList,
          host
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast.success(`${data.submittedUrls} URL inviati a IndexNow con successo!`);
        setUrls("");
      } else {
        toast.error(data.error || "Errore durante l'invio a IndexNow");
      }

    } catch (error) {
      console.error("Error submitting to IndexNow:", error);
      toast.error("Errore durante l'invio a IndexNow");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSubmit = async (urlType: string) => {
    setIsSubmitting(true);
    
    try {
      let urlList: string[] = [];
      const baseUrl = `https://${host}`;
      
      switch (urlType) {
        case 'homepage':
          urlList = [baseUrl];
          break;
        case 'blog':
          urlList = [`${baseUrl}/blog`];
          break;
        case 'services':
          urlList = [`${baseUrl}/servizi`];
          break;
        case 'portfolio':
          urlList = [`${baseUrl}/portfolio`];
          break;
        case 'all-main':
          urlList = [
            baseUrl,
            `${baseUrl}/servizi`,
            `${baseUrl}/portfolio`,
            `${baseUrl}/blog`,
            `${baseUrl}/chi-siamo`,
            `${baseUrl}/contatti`
          ];
          break;
      }

      const { data, error } = await supabase.functions.invoke('submit-to-indexnow', {
        body: {
          urlList,
          host
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast.success(`${data.submittedUrls} URL inviati a IndexNow con successo!`);
      } else {
        toast.error(data.error || "Errore durante l'invio a IndexNow");
      }

    } catch (error) {
      console.error("Error submitting to IndexNow:", error);
      toast.error("Errore durante l'invio a IndexNow");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div>
        <h3 className="text-lg font-semibold mb-2">Invia URL a IndexNow</h3>
        <p className="text-sm text-gray-600 mb-4">
          IndexNow notifica istantaneamente i motori di ricerca (Bing, Yandex) degli aggiornamenti delle pagine.
        </p>
      </div>

      {/* Quick Submit Buttons */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Invio Rapido:</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSubmit('homepage')}
            disabled={isSubmitting}
          >
            Homepage
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSubmit('blog')}
            disabled={isSubmitting}
          >
            Blog
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSubmit('services')}
            disabled={isSubmitting}
          >
            Servizi
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSubmit('portfolio')}
            disabled={isSubmitting}
          >
            Portfolio
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSubmit('all-main')}
            disabled={isSubmitting}
            className="md:col-span-2"
          >
            Tutte le Pagine Principali
          </Button>
        </div>
      </div>

      <div className="border-t pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="optixweb.space"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="urls">URL da Inviare (uno per riga)</Label>
            <Textarea
              id="urls"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://optixweb.space/blog/nuovo-articolo&#10;https://optixweb.space/servizi"
              rows={6}
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Invia a IndexNow
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IndexNowSubmitter;