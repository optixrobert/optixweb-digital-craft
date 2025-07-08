
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const adminSignInSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve essere di almeno 6 caratteri'),
});

type AdminSignInFormData = z.infer<typeof adminSignInSchema>;

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AdminSignInFormData>({
    resolver: zodResolver(adminSignInSchema),
  });

  useEffect(() => {
    const checkAdminUserAndRedirect = async () => {
      if (user) {
        console.log('Admin login - User logged in:', user.id, user.email);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('user_id', user.id)
            .single();

          console.log('Admin login - Profile query result:', data, error);

          if (error) throw error;
          
          if (data?.is_admin) {
            console.log('User is admin, redirecting to /admin');
            navigate('/admin');
          } else {
            console.log('User is not admin, redirecting back to admin login with error');
            toast({
              title: "Accesso negato",
              description: "Non hai i permessi per accedere all'area amministratori",
              variant: "destructive",
            });
            // Effettua il logout se non è admin
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          toast({
            title: "Errore",
            description: "Errore durante la verifica dei permessi amministratore",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        }
      }
    };

    checkAdminUserAndRedirect();
  }, [user, navigate, toast]);

  const handleAdminSignIn = async (data: AdminSignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive",
        });
      }
      // Il redirect verrà gestito dall'useEffect quando user cambia
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'accesso amministratore",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              🔒 Accesso Amministratori
            </CardTitle>
            <CardDescription>
              Area riservata esclusivamente agli amministratori di sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleAdminSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Amministratore</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@optixweb.space"
                  {...form.register('email')}
                  disabled={isLoading}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  {...form.register('password')}
                  disabled={isLoading}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? 'Verifica credenziali...' : 'Accedi come Admin'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Accesso riservato solo al personale autorizzato
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
