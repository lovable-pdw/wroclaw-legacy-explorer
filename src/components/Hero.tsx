import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/wroclaw-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">HISTORYCZNE</span>
            <span className="block text-primary text-5xl md:text-7xl lg:text-8xl">
              WYCIECZKI
            </span>
            <span className="block text-foreground">PO WROCŁAWIU</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            Z TABLETEM I PRZEWODNIKIEM
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/booking">
              <Button 
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-4 animate-glow-pulse"
              >
                ZAREZERWUJ WYCIECZKĘ
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <span className="text-lg">PRZEZ TELEFON</span>
            </div>
          </div>

          <div className="mt-6">
            <a 
              href="tel:+48787975999" 
              className="text-2xl md:text-3xl font-bold text-primary hover:text-accent transition-colors duration-300"
            >
              +48 787 975 999
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;