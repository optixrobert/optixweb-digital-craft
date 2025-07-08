import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MessageSquare, LogOut, CreditCard, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateTicketDialog from '@/components/CreateTicketDialog';
import SubscriptionPlans from '@/components/SubscriptionPlans';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export default function AreaClienti() {
  const { user, signOut, subscriptionData, isCheckingSubscription, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchTickets();
  }, [user, navigate]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets((data as Ticket[]) || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleManageSubscription = async () => {
    setIsManagingSubscription(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Errore",
        description: "Errore nell'apertura del portale clienti. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsManagingSubscription(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-optix-blue mx-auto"></div>
            <p className="mt-4 text-lg">Caricamento...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-optix-navy">Area Clienti</h1>
              <p className="text-muted-foreground mt-2">
                Benvenuto {user?.email}, gestisci i tuoi ticket di supporto e il tuo abbonamento
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={checkSubscription} disabled={isCheckingSubscription}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isCheckingSubscription ? 'animate-spin' : ''}`} />
                Aggiorna Status
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </Button>
            </div>
          </div>

          {/* Subscription Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Stato Abbonamento
                  </CardTitle>
                  <CardDescription>
                    {subscriptionData?.subscribed 
                      ? `Piano ${subscriptionData.subscription_tier} attivo`
                      : 'Nessun abbonamento attivo'
                    }
                  </CardDescription>
                </div>
                {subscriptionData?.subscribed && (
                  <Button 
                    variant="outline" 
                    onClick={handleManageSubscription}
                    disabled={isManagingSubscription}
                  >
                    {isManagingSubscription ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-optix-blue mr-2"></div>
                        Caricamento...
                      </div>
                    ) : (
                      'Gestisci Abbonamento'
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {subscriptionData?.subscribed ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Piano:</span>
                    <Badge className="bg-optix-green text-white">
                      {subscriptionData.subscription_tier}
                    </Badge>
                  </div>
                  {subscriptionData.subscription_end && (
                    <div className="flex justify-between">
                      <span>Rinnovo:</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(subscriptionData.subscription_end)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Sottoscrivi un abbonamento per accedere al supporto completo
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {!subscriptionData?.subscribed && (
            <div className="mb-8">
              <SubscriptionPlans />
            </div>
          )}

          {subscriptionData?.subscribed && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-optix-navy">I tuoi Ticket</h2>
              <Button onClick={() => setShowCreateDialog(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Nuovo Ticket
              </Button>
            </div>
          )}

          {subscriptionData?.subscribed && tickets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nessun ticket aperto</h3>
                <p className="text-muted-foreground mb-4">
                  Non hai ancora creato nessun ticket di supporto.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Crea il tuo primo ticket
                </Button>
              </CardContent>
            </Card>
          ) : subscriptionData?.subscribed ? (
            <div className="grid gap-6">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{ticket.title}</CardTitle>
                        <CardDescription>{ticket.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Categoria: {ticket.category}</span>
                      <span>Creato il: {formatDate(ticket.created_at)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
      
      <CreateTicketDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onTicketCreated={fetchTickets}
      />
    </div>
  );
}