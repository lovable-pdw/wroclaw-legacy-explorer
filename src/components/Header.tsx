import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Projekt Dawny Wrocław", href: "#o-nas" },
    { name: "Cennik", href: "#cennik" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <MapPin className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                Projekt Dawny
              </span>
              <span className="text-sm text-primary font-semibold">
                WROCŁAW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Phone number */}
          <div className="hidden md:flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <a 
              href="tel:+48787975999"
              className="text-primary font-bold hover:text-accent transition-colors duration-300"
            >
              787 975 999
            </a>
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-primary/20">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg text-foreground hover:text-primary transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                <div className="pt-6 border-t border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Zadzwoń:</span>
                  </div>
                  <a 
                    href="tel:+48787975999"
                    className="text-xl font-bold text-primary hover:text-accent transition-colors duration-300"
                  >
                    +48 787 975 999
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