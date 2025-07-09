import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
}

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setClients(data || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading || clients.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-optix-navy mb-4">
            I Nostri Clienti Si Fidano di Noi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aziende di successo che hanno scelto OptixWeb per il loro futuro digitale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div 
              key={client.id} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center h-full">
                {client.logo_url && (
                  <div className="w-20 h-20 mb-6 flex items-center justify-center">
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-optix-navy mb-4">
                  {client.website_url ? (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-optix-blue transition-colors"
                    >
                      {client.name}
                    </a>
                  ) : (
                    client.name
                  )}
                </h3>
                
                {client.description && (
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {client.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Vuoi unirti a loro?{" "}
            <a href="/contatti" className="text-optix-blue hover:underline font-semibold">
              Contattaci oggi stesso
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;