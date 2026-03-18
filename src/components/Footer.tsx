import { Mountain, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  const navItems = [
    { name: t.nav.product, href: "#produkt" },
    { name: t.nav.features, href: "#funkcje" },
    { name: t.nav.materials, href: "#materialy" },
    { name: t.nav.cities, href: "#miasta" },
    { name: t.nav.contact, href: "#kontakt" },
  ];

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
                  {t.hero.title}
                </span>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  {t.hero.titleHighlight}
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t.footer.contactTitle}
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
              {t.footer.navTitle}
            </h3>
            <div className="space-y-2 text-sm text-white/60">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="block hover:text-white transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} PDW Sp. z o.o. {t.footer.copyright}
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                to={t.footer.privacyPolicyPath}
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
