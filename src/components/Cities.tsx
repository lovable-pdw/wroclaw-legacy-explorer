import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Cities = () => {
  const cities = [
    {
      name: "Wrocław",
      description: "Stolica Dolnego Śląska — Rynek, Ostrów Tumski, Hala Stulecia i nadodrzańskie bulwary."
    },
    {
      name: "Legnica",
      description: "Miasto o bogatej historii piastowskiej — Zamek Piastowski, Katedra, średniowieczne centrum."
    },
    {
      name: "Świdnica",
      description: "Kościół Pokoju UNESCO, zabytkowy rynek i tradycja browarnicza."
    },
    {
      name: "Trzebnica",
      description: "Miasto Św. Jadwigi Śląskiej — Bazylika, Klasztor Cysterek, Wzgórza Trzebnickie."
    },
    {
      name: "Wałbrzych",
      description: "Zamek Książ, Stara Kopalnia i bogate dziedzictwo górnicze regionu."
    },
    {
      name: "Jelenia Góra",
      description: "Brama Karkonoszy — Cieplice, Pałac Schaffgotschów, Park Norweskiego."
    },
    {
      name: "Kłodzko",
      description: "Twierdza Kłodzko, gotycki most i urokliwe Ziemia Kłodzka."
    },
    {
      name: "Bolków",
      description: "Zamek Bolków i malownicze pejzaże Pogórza Kaczawskiego."
    }
  ];

  return (
    <section id="miasta" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Przykładowe miasta
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dolny Śląsk pełen możliwości
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Każde miasto Dolnego Śląska ma unikalne dziedzictwo, które zasługuje na nowoczesną
            promocję. Oto przykłady miast, dla których możemy przygotować dedykowane trasy
            i&nbsp;materiały.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Card
              key={city.name}
              className="group border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-card"
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {city.name}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {city.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            I wiele innych miast i miejscowości Dolnego Śląska.{" "}
            <a href="#kontakt" className="text-primary font-semibold hover:underline">
              Porozmawiajmy o Twoim mieście &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cities;
