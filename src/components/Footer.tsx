import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-optix-navy text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent mb-4">
              Optixweb.it
            </div>
            <p className="text-gray-300 mb-4">
              La tua web agency di fiducia per soluzioni digitali professionali e innovative.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} />
                <span>Italia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>info@optixweb.it</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>+39 123 456 7890</span>
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
          <p className="text-gray-300 text-sm">
            © 2024 Optixweb.it. Tutti i diritti riservati.
          </p>
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