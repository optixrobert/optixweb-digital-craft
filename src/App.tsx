
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { GA4Provider } from "@/components/GA4Provider";
import Index from "./pages/Index";
import ChiSiamo from "./pages/ChiSiamo";
import Servizi from "./pages/Servizi";
import Portfolio from "./pages/Portfolio";
import Contatti from "./pages/Contatti";
import Prenota from "./pages/Prenota";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import AreaClienti from "./pages/AreaClienti";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BandiDigitali from "./pages/BandiDigitali";
import SimestTransizioneDigitale from "./pages/SimestTransizioneDigitale";
import VoucherDigitalizzazione from "./pages/VoucherDigitalizzazione";
import CreditoImposta from "./pages/CreditoImposta";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GA4Provider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/servizi" element={<Servizi />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/prenota" element={<Prenota />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/area-clienti" element={<AreaClienti />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/bandi-digitali" element={<BandiDigitali />} />
          <Route path="/bandi-digitali/simest-transizione-digitale" element={<SimestTransizioneDigitale />} />
          <Route path="/bandi-digitali/voucher-digitalizzazione" element={<VoucherDigitalizzazione />} />
          <Route path="/bandi-digitali/credito-imposta-formazione" element={<CreditoImposta />} />
              <Route path="/landing/:slug" element={<LandingPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GA4Provider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
