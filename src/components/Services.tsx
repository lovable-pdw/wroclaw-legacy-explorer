import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, TrendingUp, GraduationCap, CalendarDays, Sun, Smartphone } from "lucide-react";

const Services = () => {
  const benefits = [
    {
      icon: <Megaphone className="w-7 h-7" />,
      title: "Nowoczesna promocja miasta",
      description: "Miasto prezentuje swoją historię i atrakcje w atrakcyjnej formie multimedialnej."
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Zwiększenie ruchu turystycznego",
      description: "Interaktywne trasy i wizualizacje zachęcają turystów do dłuższego pobytu."
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: "Edukacja historyczna",
      description: "Aplikacja popularyzuje lokalną historię wśród mieszkańców i turystów."
    },
    {
      icon: <CalendarDays className="w-7 h-7" />,
      title: "Narzędzie promocji wydarzeń",
      description: "Zintegrowany kalendarz wydarzeń i informator turystyczny."
    },
    {
      icon: <Sun className="w-7 h-7" />,
      title: "Produkt dostępny przez cały rok",
      description: "Aplikacja działa niezależnie od sezonu turystycznego."
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Cyfrowy przewodnik",
      description: "Nowoczesny turysta podróżuje z telefonem w ręku. Aplikacja staje się przewodnikiem, który prowadzi go przez historię miasta."
    }
  ];

  return (
    <section id="produkt" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Dlaczego aplikacja turystyczna?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Korzyści dla samorządu i&nbsp;partnera
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            Dolny Śląsk to jeden z najbogatszych historycznie i turystycznie regionów Europy.
            Setki miast i miejscowości kryją niezwykłe historie — od przemysłowych fortun,
            przez architekturę rezydencjonalną, po dziedzictwo kulturowe i krajobrazowe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
