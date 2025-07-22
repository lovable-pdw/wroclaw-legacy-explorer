import { MapPin, Phone, Mail, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">
                  Projekt Dawny
                </span>
                <span className="text-lg text-primary font-semibold">
                  WROCŁAW
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Historyczne wycieczki po Wrocławiu z tabletem i przewodnikiem. 
              Odkryj przeszłość miasta w nowoczesny sposób.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Kontakt
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  PDW Sp. z o.o.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:+48787975999"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  +48 787 975 999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  kontakt@projektdawnywroclaw.pl
                </span>
              </div>
            </div>
          </div>          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              PATRONAT
            </h3>
              <div className="flex gap-2 text-muted-foreground">
                <span>Airport</span>
                <span>•</span>
                <span>LEC</span>
                <span>•</span>
                <span>Fly</span>
              </div>
          </div>
        </div>        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-center sm:text-left">
              © 2025 Projekt Dawny Wrocław. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4 text-sm">
              <Link 
                to="/polityka-prywatnosci" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Polityka Prywatności
              </Link>
              <a 
                href="/regulamin.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Regulamin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;