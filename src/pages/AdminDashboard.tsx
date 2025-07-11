import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Ticket, AlertCircle, CheckCircle, FileText, Plus, Edit, Trash2, Mail, MessageSquare, Building2, BarChart3, Eye, TrendingUp, Calendar, Globe } from 'lucide-react';
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

interface WebsiteAnalytics {
  id: string;
  page_path: string;
  visitor_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  session_id: string | null;
  visit_duration: number;
  created_at: string;
}

interface BlogAnalytics {
  id: string;
  blog_post_id: string;
  visitor_ip: string | null;
  session_id: string | null;
  time_spent: number;
  scroll_percentage: number;
  referrer: string | null;
  created_at: string;
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
  const [websiteAnalytics, setWebsiteAnalytics] = useState<WebsiteAnalytics[]>([]);
  const [blogAnalytics, setBlogAnalytics] = useState<BlogAnalytics[]>([]);

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
      const [
        ticketsResponse, 
        profilesResponse, 
        subscribersResponse, 
        blogResponse, 
        contactResponse, 
        consultationResponse, 
        clientsResponse,
        websiteAnalyticsResponse,
        blogAnalyticsResponse
      ] = await Promise.all([
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
          .order('display_order', { ascending: true }),
        supabase
          .from('website_analytics')
          .select('*')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Ultimi 30 giorni
          .order('created_at', { ascending: false }),
        supabase
          .from('blog_analytics')
          .select(`
            *,
            blog_posts (
              id,
              title,
              slug
            )
          `)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Ultimi 30 giorni
          .order('created_at', { ascending: false })
      ]);

      if (ticketsResponse.error) throw ticketsResponse.error;
      if (profilesResponse.error) throw profilesResponse.error;
      if (subscribersResponse.error) throw subscribersResponse.error;
      if (blogResponse.error) throw blogResponse.error;
      if (contactResponse.error) throw contactResponse.error;
      if (consultationResponse.error) throw consultationResponse.error;
      if (clientsResponse.error) throw clientsResponse.error;
      if (websiteAnalyticsResponse.error) throw websiteAnalyticsResponse.error;
      if (blogAnalyticsResponse.error) throw blogAnalyticsResponse.error;

      setTickets((ticketsResponse.data as TicketWithProfile[]) || []);
      setProfiles(profilesResponse.data || []);
      setSubscribers(subscribersResponse.data || []);
      setBlogPosts((blogResponse.data as BlogPost[]) || []);
      setContactRequests(contactResponse.data || []);
      setConsultationRequests(consultationResponse.data || []);
      setClients(clientsResponse.data || []);
      setWebsiteAnalytics(websiteAnalyticsResponse.data || []);
      setBlogAnalytics(blogAnalyticsResponse.data || []);
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

          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Lead Generation
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Gestione Contenuti
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics & Tracking
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Gestione Clienti
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Support & Tickets
              </TabsTrigger>
            </TabsList>

            {/* LEAD GENERATION AREA */}
            <TabsContent value="leads">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Richieste di Contatto
                    </CardTitle>
                    <CardDescription>
                      Lead generati tramite il modulo di contatto del sito
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

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Richieste di Consulenza
                    </CardTitle>
                    <CardDescription>
                      Appuntamenti richiesti tramite il sistema di booking
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
              </div>
            </TabsContent>

            {/* CONTENT MANAGEMENT AREA */}
            <TabsContent value="content">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Gestione Blog
                      </CardTitle>
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
                          <TableHead>Visualizzazioni</TableHead>
                          <TableHead>Data Creazione</TableHead>
                          <TableHead>Azioni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts.map((post) => {
                          const postViews = blogAnalytics.filter(a => a.blog_post_id === post.id).length;
                          return (
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
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{postViews}</span>
                                </div>
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
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ANALYTICS & TRACKING AREA */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Visitatori Totali</CardTitle>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{websiteAnalytics.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Visite registrate
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pagine Più Visitate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {websiteAnalytics.length > 0 ? 
                          websiteAnalytics.reduce((acc, curr) => {
                            acc[curr.page_path] = (acc[curr.page_path] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>) &&
                          Object.entries(websiteAnalytics.reduce((acc, curr) => {
                            acc[curr.page_path] = (acc[curr.page_path] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                          : 'N/A'
                        }
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pagina con più visite
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Letture Blog</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{blogAnalytics.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Visualizzazioni articoli
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Traffico Sito Web
                    </CardTitle>
                    <CardDescription>
                      Analisi dettagliata dei visitatori del sito
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pagina</TableHead>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Durata Visita</TableHead>
                          <TableHead>Data Visita</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {websiteAnalytics.slice(0, 20).map((visit) => (
                          <TableRow key={visit.id}>
                            <TableCell className="font-medium">{visit.page_path}</TableCell>
                            <TableCell>{visit.referrer || 'Diretto'}</TableCell>
                            <TableCell>{visit.visit_duration}s</TableCell>
                            <TableCell>{formatDate(visit.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Performance Articoli
                    </CardTitle>
                    <CardDescription>
                      Statistiche di lettura degli articoli del blog
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Articolo</TableHead>
                          <TableHead>Tempo di Lettura</TableHead>
                          <TableHead>Scroll %</TableHead>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogAnalytics.slice(0, 20).map((analytics) => {
                          const post = blogPosts.find(p => p.id === analytics.blog_post_id);
                          return (
                            <TableRow key={analytics.id}>
                              <TableCell className="font-medium">
                                {post ? post.title : 'Articolo eliminato'}
                              </TableCell>
                              <TableCell>{analytics.time_spent}s</TableCell>
                              <TableCell>{analytics.scroll_percentage}%</TableCell>
                              <TableCell>{analytics.referrer || 'Diretto'}</TableCell>
                              <TableCell>{formatDate(analytics.created_at)}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* CUSTOMER MANAGEMENT AREA */}
            <TabsContent value="customers">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Gestione Clienti
                      </CardTitle>
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

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Abbonamenti Attivi
                    </CardTitle>
                    <CardDescription>
                      Gestione degli abbonamenti e pagamenti
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
              </div>
            </TabsContent>

            {/* SUPPORT & TICKETS AREA */}
            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Gestione Ticket di Supporto
                  </CardTitle>
                  <CardDescription>
                    Visualizza e gestisci tutti i ticket di supporto clienti
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