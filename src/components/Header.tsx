import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, prefix } = useTranslation();

  const navigation = [
    { name: t.nav.product, href: "#produkt" },
    { name: t.nav.features, href: "#funkcje" },
    { name: t.nav.cities, href: "#miasta" },
    { name: t.nav.materials, href: "#materialy" },
    { name: t.nav.contact, href: "#kontakt" },
  ];

  const switchTo = locale === "pl" ? "/en" : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Mountain className="w-7 h-7 text-primary" />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-foreground tracking-tight">
                {t.hero.title}
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                {t.hero.titleHighlight}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-7">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Link
              to={switchTo}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium uppercase"
            >
              {locale === "pl" ? "EN" : "PL"}
            </Link>
          </nav>

          <div className="hidden lg:block">
            <a href="#kontakt">
              <Button size="sm" className="font-semibold">
                {t.nav.becomePartner}
              </Button>
            </a>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <div className="flex flex-col space-y-5 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base text-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  to={switchTo}
                  className="text-base text-foreground hover:text-primary transition-colors duration-200 uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {locale === "pl" ? "EN 🇬🇧" : "PL 🇵🇱"}
                </Link>
                <div className="pt-4 border-t border-border">
                  <a href="#kontakt" onClick={() => setIsOpen(false)}>
                    <Button className="w-full font-semibold">
                      {t.nav.becomePartner}
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
