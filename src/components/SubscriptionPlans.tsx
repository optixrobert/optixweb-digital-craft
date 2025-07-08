import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '€200',
    period: '/mese',
    description: 'Perfetto per piccole attività',
    features: [
      'Supporto email',
      'Tempo di risposta: 24h',
      'Dashboard base',
      'Max 10 ticket/mese'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '€400',
    period: '/mese',
    description: 'Ideale per aziende in crescita',
    features: [
      'Supporto prioritario',
      'Tempo di risposta: 12h',
      'Dashboard avanzata',
      'Max 25 ticket/mese',
      'Chat in tempo reale'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '€700',
    period: '/mese',
    description: 'Per grandi organizzazioni',
    features: [
      'Supporto dedicato',
      'Tempo di risposta: 4h',
      'Dashboard personalizzata',
      'Ticket illimitati',
      'Account manager dedicato',
      'Integrazioni avanzate'
    ]
  }
];

export default function SubscriptionPlans() {
  const { user, subscriptionData } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Accesso richiesto",
        description: "Devi effettuare l'accesso per sottoscrivere un abbonamento",
        variant: "destructive",
      });
      return;
    }

    setLoading(planId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planId }
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Errore",
        description: "Errore nella creazione del checkout. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const isCurrentPlan = (planId: string) => {
    if (!subscriptionData?.subscribed) return false;
    const tierMap: { [key: string]: string } = {
      'Basic': 'basic',
      'Premium': 'premium',
      'Enterprise': 'enterprise'
    };
    return tierMap[subscriptionData.subscription_tier || ''] === planId;
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-optix-navy mb-4">
          Scegli il tuo piano
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Seleziona il piano più adatto alle tue esigenze. Puoi cambiare piano in qualsiasi momento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-optix-blue shadow-lg scale-105' : ''} ${
              isCurrentPlan(plan.id) ? 'ring-2 ring-optix-green' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-optix-blue text-white">
                Più Popolare
              </Badge>
            )}
            {isCurrentPlan(plan.id) && (
              <Badge className="absolute -top-3 right-4 bg-optix-green text-white">
                Piano Attuale
              </Badge>
            )}
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-optix-navy">
                {plan.name}
              </CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-optix-blue">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">
                  {plan.period}
                </span>
              </div>
              <CardDescription className="mt-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-optix-green mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id || isCurrentPlan(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-optix-blue hover:bg-optix-blue/90' 
                    : 'bg-optix-navy hover:bg-optix-navy/90'
                } text-white`}
              >
                {loading === plan.id ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Caricamento...
                  </div>
                ) : isCurrentPlan(plan.id) ? (
                  'Piano Attivo'
                ) : (
                  'Sottoscrivi'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}