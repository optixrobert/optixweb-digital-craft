import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-optix-navy text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/a78b71f8-8d01-4175-9857-25b38699a943.png" 
                alt="Optix Web" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              La tua web agency di fiducia per soluzioni digitali professionali e innovative.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} />
                <span>Via Tenente Losco 18, 80040 Poggiomarino (NA)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>info@optixweb.space</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>+39 353 200 4367</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MessageCircle size={16} />
                <a href="https://wa.me/393532004367?text=Ciao!%20Vi%20contatto%20tramite%20il%20vostro%20sito%20web" target="_blank" className="hover:text-optix-blue transition-colors">
                  WhatsApp: +39 353 200 4367
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-optix-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-gray-300 hover:text-optix-blue transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-300 hover:text-optix-blue transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-optix-blue transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-gray-300 hover:text-optix-blue transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Servizi</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Realizzazione Siti Web</li>
              <li>Sviluppo Applicazioni Web</li>
              <li>UX/UI Design</li>
              <li>SEO e Ottimizzazione</li>
              <li>Consulenza Digitale</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Resta Aggiornato</h3>
            <p className="text-gray-300 text-sm mb-4">
              Ricevi le ultime novità su tecnologie web e strategie digitali.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-optix-blue"
              />
              <button className="px-4 py-2 bg-optix-blue hover:bg-optix-blue/80 rounded text-sm transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm text-center md:text-left">
            <p>© 2024 AR Group di Peluso Roberto</p>
            <p>P.IVA: 08779461212</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-optix-blue text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/termini" className="text-gray-300 hover:text-optix-blue text-sm transition-colors">
              Termini di Servizio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;