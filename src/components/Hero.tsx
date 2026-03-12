import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 text-sm font-medium mb-8 animate-fade-in">
            <MapPin className="w-4 h-4" />
            Dla miast, powiatów, gmin i firm prywatnych
          </div>

          <p className="text-emerald-300 font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-in">
            Aplikacja Turystyczna
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
            Zwiedzaj{" "}
            <span className="text-amber-400">Dolny Śląsk</span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-100/90 mb-4 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Nowoczesne narzędzie promocji turystyki dla miast, powiatów, gmin i firm prywatnych.
          </p>

          <p className="text-base text-emerald-100/60 mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Dzięki technologii rekonstrukcji 3D, panoramom 360° oraz inteligentnej nawigacji GPS
            użytkownicy odkrywają historię miejsc bezpośrednio w przestrzeni miasta — patrząc na nią
            przez ekran smartfona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a href="#kontakt">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-base px-8 h-12"
              >
                Zostań partnerem
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#produkt">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-12 bg-transparent"
              >
                Poznaj produkt
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
