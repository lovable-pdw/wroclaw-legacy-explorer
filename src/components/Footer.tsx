import { Mountain, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Mountain className="w-7 h-7 text-amber-400" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">
                  Zwiedzaj
                </span>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Dolny Śląsk
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Aplikacja turystyczna wspierająca samorządy i&nbsp;firmy
              w&nbsp;promocji miast i&nbsp;regionu Dolnego Śląska.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <div className="space-y-3">
              <p className="text-white/60 text-sm">PDW Sp. z o.o.</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/40" />
                <a
                  href="tel:+48787975999"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  +48 787 975 999
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/40" />
                <a
                  href="mailto:pdw@pdw.wroc.pl"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  pdw@pdw.wroc.pl
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Nawigacja
            </h3>
            <div className="space-y-2 text-sm text-white/60">
              <a href="#produkt" className="block hover:text-white transition-colors">Produkt</a>
              <a href="#funkcje" className="block hover:text-white transition-colors">Funkcje</a>
              <a href="#materialy" className="block hover:text-white transition-colors">Materiały</a>
              <a href="#miasta" className="block hover:text-white transition-colors">Miasta</a>
              <a href="#kontakt" className="block hover:text-white transition-colors">Kontakt</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} PDW Sp. z o.o. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                to="/polityka-prywatnosci"
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                Polityka Prywatności
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
