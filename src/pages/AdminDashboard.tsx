import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Ticket, AlertCircle, CheckCircle, FileText, Plus, Edit, Trash2, Mail, MessageSquare, Building2 } from 'lucide-react';
import BlogPostDialog from '@/components/BlogPostDialog';
import ClientDialog from '@/components/ClientDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TicketWithProfile {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created_at: string;
  updated_at: string;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
    company: string;
  };
}

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  is_admin: boolean;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

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
  created_at: string;
  updated_at: string;
  published_at: string | null;
  profiles: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface ContactRequest {
  id: string;
  nome: string;
  email: string;
  telefono: string | null;
  azienda: string | null;
  servizio: string | null;
  messaggio: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  consultation_date: string;
  consultation_time: string;
  consultation_type: string;
  message: string | null;
  status: string;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  published: boolean;
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

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketWithProfile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);


  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkAdminStatus();
  }, [user, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      if (!data?.is_admin) {
        navigate('/area-clienti');
        return;
      }
      
      setIsAdmin(true);
      fetchData();
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/area-clienti');
    }
  };

  const fetchData = async () => {
    try {
      const [ticketsResponse, profilesResponse, subscribersResponse, blogResponse, contactResponse, consultationResponse, clientsResponse] = await Promise.all([
        supabase
          .from('tickets')
          .select(`
            *,
            profiles!tickets_user_id_fkey(email, first_name, last_name, company)
          `)
          .order('created_at', { ascending: false }),
        supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('subscribers')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('blog_posts')
          .select(`
            *,
            profiles!blog_posts_author_id_fkey(email, first_name, last_name)
          `)
          .order('created_at', { ascending: false }),
        supabase
          .from('contact_requests')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('consultation_requests')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('clients')
          .select('*')
          .order('display_order', { ascending: true })
      ]);

      if (ticketsResponse.error) throw ticketsResponse.error;
      if (profilesResponse.error) throw profilesResponse.error;
      if (subscribersResponse.error) throw subscribersResponse.error;
      if (blogResponse.error) throw blogResponse.error;
      if (contactResponse.error) throw contactResponse.error;
      if (consultationResponse.error) throw consultationResponse.error;
      if (clientsResponse.error) throw clientsResponse.error;

      setTickets((ticketsResponse.data as TicketWithProfile[]) || []);
      setProfiles(profilesResponse.data || []);
      setSubscribers(subscribersResponse.data || []);
      setBlogPosts((blogResponse.data as BlogPost[]) || []);
      setContactRequests(contactResponse.data || []);
      setConsultationRequests(consultationResponse.data || []);
      setClients(clientsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status: newStatus })
        .eq('id', ticketId);

      if (error) throw error;

      setTickets(tickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status: newStatus as any } : ticket
      ));

      toast({
        title: "Ticket aggiornato",
        description: "Lo stato del ticket è stato aggiornato con successo",
      });
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: "Errore",
        description: "Errore nell'aggiornamento del ticket",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setBlogPosts(blogPosts.filter(post => post.id !== postId));
      toast({
        title: "Articolo eliminato",
        description: "L'articolo è stato eliminato con successo",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione dell'articolo",
        variant: "destructive",
      });
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) throw error;

      setClients(clients.filter(client => client.id !== clientId));
      toast({
        title: "Cliente eliminato",
        description: "Il cliente è stato eliminato con successo",
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione del cliente",
        variant: "destructive",
      });
    }
  };

  const getStatsData = () => {
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    const totalUsers = profiles.length;
    const activeSubscriptions = subscribers.filter(s => s.subscribed).length;
    const publishedPosts = blogPosts.filter(p => p.published).length;
    const publishedClients = clients.filter(c => c.published).length;
    const totalRevenue = subscribers
      .filter(s => s.subscribed)
      .reduce((acc, s) => {
        const tierRevenue = {
          'Basic': 200,
          'Premium': 400,
          'Enterprise': 700
        };
        return acc + (tierRevenue[s.subscription_tier as keyof typeof tierRevenue] || 0);
      }, 0);

    return { openTickets, inProgressTickets, resolvedTickets, totalUsers, activeSubscriptions, publishedPosts, publishedClients, totalRevenue };
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

  if (!isAdmin) {
    return null;
  }

  const stats = getStatsData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-optix-navy">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Gestisci ticket e utenti della piattaforma
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Aperti</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.openTickets}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Lavorazione</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgressTickets}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risolti</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.resolvedTickets}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utenti Totali</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-optix-navy">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Abbonamenti Attivi</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articoli Pubblicati</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-optix-blue">{stats.publishedPosts}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clienti Pubblicati</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-optix-purple">{stats.publishedClients}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ricavi Mensili</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-optix-green">€{stats.totalRevenue}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="contacts">Richieste di Contatto</TabsTrigger>
              <TabsTrigger value="consultations">Consulenze</TabsTrigger>
              <TabsTrigger value="clients">Gestione Clienti</TabsTrigger>
              <TabsTrigger value="blog">Gestione Blog</TabsTrigger>
              <TabsTrigger value="indexnow">IndexNow</TabsTrigger>
              <TabsTrigger value="subscribers">Abbonamenti</TabsTrigger>
              <TabsTrigger value="tickets">Ticket Support</TabsTrigger>
            </TabsList>

            {/* Contact Requests */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Richieste di Contatto
                  </CardTitle>
                  <CardDescription>
                    Visualizza tutte le richieste di contatto inviate dal modulo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Azienda</TableHead>
                        <TableHead>Servizio</TableHead>
                        <TableHead>Messaggio</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div>
                              <div className="font-semibold">{request.nome}</div>
                              {request.telefono && (
                                <div className="text-sm text-muted-foreground">{request.telefono}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.azienda || '-'}</TableCell>
                          <TableCell>{request.servizio || '-'}</TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={request.messaggio}>
                              {request.messaggio}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(request.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Consultation Requests */}
            <TabsContent value="consultations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Richieste di Consulenza
                  </CardTitle>
                  <CardDescription>
                    Visualizza tutte le richieste di consulenza con calendario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo Consulenza</TableHead>
                        <TableHead>Data & Ora</TableHead>
                        <TableHead>Messaggio</TableHead>
                        <TableHead>Data Richiesta</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultationRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div>
                              <div className="font-semibold">{request.name}</div>
                              {request.phone && (
                                <div className="text-sm text-muted-foreground">{request.phone}</div>
                              )}
                              {request.company && (
                                <div className="text-sm text-muted-foreground">{request.company}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.consultation_type}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {new Date(request.consultation_date).toLocaleDateString('it-IT')}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {request.consultation_time}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {request.message && (
                              <div className="max-w-xs truncate" title={request.message}>
                                {request.message}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(request.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clients Management */}
            <TabsContent value="clients">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestione Clienti</CardTitle>
                    <CardDescription>
                      Gestisci i clienti e partnership mostrati sul sito
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowClientDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuovo Cliente
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrizione</TableHead>
                        <TableHead>Sito Web</TableHead>
                        <TableHead>Ordine</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {client.logo_url && (
                                <img
                                  src={client.logo_url}
                                  alt={client.name}
                                  className="w-8 h-8 object-contain rounded"
                                />
                              )}
                              <div>
                                <div className="font-semibold">{client.name}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {client.description && (
                              <div className="max-w-xs truncate" title={client.description}>
                                {client.description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {client.website_url && (
                              <a
                                href={client.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-optix-blue hover:underline"
                              >
                                Visita
                              </a>
                            )}
                          </TableCell>
                          <TableCell>{client.display_order}</TableCell>
                          <TableCell>
                            <Badge className={client.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {client.published ? 'Pubblicato' : 'Bozza'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingClient(client);
                                  setShowClientDialog(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteClient(client.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Management */}
            <TabsContent value="blog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestione Blog</CardTitle>
                    <CardDescription>
                      Crea e gestisci gli articoli del blog per migliorare la SEO
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowBlogDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuovo Articolo
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Autore</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Data Creazione</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div>
                              <div className="font-semibold">{post.title}</div>
                              <div className="text-sm text-muted-foreground">{post.slug}</div>
                              {post.excerpt && (
                                <div className="text-xs text-muted-foreground max-w-xs truncate">
                                  {post.excerpt}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {post.profiles.first_name} {post.profiles.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {post.profiles.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {post.published ? 'Pubblicato' : 'Bozza'}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(post.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingPost(post);
                                  setShowBlogDialog(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteBlogPost(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* IndexNow Tab */}
            <TabsContent value="indexnow">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    IndexNow - Notifica Motori di Ricerca
                  </CardTitle>
                  <CardDescription>
                    Notifica istantaneamente Bing, Yandex e altri motori di ricerca delle modifiche alle pagine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 text-center text-gray-500">
                    Funzionalità IndexNow in fase di sviluppo
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscribers */
            <TabsContent value="subscribers">
              <Card>
                <CardHeader>
                  <CardTitle>Gestione Abbonamenti</CardTitle>
                  <CardDescription>
                    Visualizza tutti gli abbonamenti dei clienti
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Piano</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Scadenza</TableHead>
                        <TableHead>Data Iscrizione</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>
                            {subscriber.subscription_tier ? (
                              <Badge className="bg-optix-blue text-white">
                                {subscriber.subscription_tier}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">Nessun piano</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={subscriber.subscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {subscriber.subscribed ? 'Attivo' : 'Inattivo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {subscriber.subscription_end ? formatDate(subscriber.subscription_end) : 'N/A'}
                          </TableCell>
                          <TableCell>{formatDate(subscriber.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>Gestione Ticket</CardTitle>
                  <CardDescription>
                    Visualizza e gestisci tutti i ticket di supporto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Priorità</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div className="font-semibold">{ticket.title}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">
                                {ticket.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {ticket.profiles.first_name} {ticket.profiles.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {ticket.profiles.email}
                              </div>
                              {ticket.profiles.company && (
                                <div className="text-xs text-muted-foreground">
                                  {ticket.profiles.company}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{ticket.category}</TableCell>
                          <TableCell>
                            <Badge className={priorityColors[ticket.priority]}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[ticket.status]}>
                              {ticket.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(ticket.created_at)}</TableCell>
                          <TableCell>
                            <Select
                              value={ticket.status}
                              onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Aperto</SelectItem>
                                <SelectItem value="in_progress">In Lavorazione</SelectItem>
                                <SelectItem value="resolved">Risolto</SelectItem>
                                <SelectItem value="closed">Chiuso</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <BlogPostDialog
            open={showBlogDialog}
            onOpenChange={(open) => {
              setShowBlogDialog(open);
              if (!open) setEditingPost(null);
            }}
            post={editingPost}
            onSuccess={fetchData}
          />

          <ClientDialog
            open={showClientDialog}
            onOpenChange={(open) => {
              setShowClientDialog(open);
              if (!open) setEditingClient(null);
            }}
            client={editingClient}
            onSuccess={fetchData}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}