import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Eye, Headphones, History } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "Uruchom aplikację i ruszaj na spacer",
      description: "Dzięki technologii GPS aplikacja prowadzi użytkownika po przygotowanej trasie turystycznej w przestrzeni miasta."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Odkrywaj w wybranych punktach",
      description: "W każdym punkcie trasy pojawiają się rekonstrukcje historyczne, panoramy 360°, materiały archiwalne i opisy historyczne."
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Słuchaj narracji lektorskiej",
      description: "Profesjonalny dubbing lektorski w języku polskim, angielskim i niemieckim — dostępny dla turystów zagranicznych."
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Podróżuj w czasie",
      description: "Zobacz jak wyglądało dane miejsce 100 lub 200 lat temu. To doświadczenie przypomina podróż w czasie w przestrzeni miasta."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Jak to działa
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Doświadczenie użytkownika
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Użytkownik uruchamia aplikację na smartfonie i rozpoczyna spacer po mieście.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border border-border bg-card relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
