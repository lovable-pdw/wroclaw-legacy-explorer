import { Card, CardContent } from "@/components/ui/card";
import { Box, ScanEye, MapPinned, Languages, Newspaper } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Box className="w-8 h-8" />,
      title: "Rekonstrukcje historyczne 3D",
      description: "Cyfrowe odtworzenie nieistniejących już budynków, fabryk, pałaców czy układów urbanistycznych.",
      details: ["Archiwalne fotografie", "Mapy historyczne", "Dokumentacja ikonograficzna"]
    },
    {
      icon: <ScanEye className="w-8 h-8" />,
      title: "Panoramy sferyczne 360°",
      description: "Wysokiej jakości panoramy pozwalają zobaczyć historyczne miejsca z każdej strony.",
      details: ["Widok na 360 stopni", "Elementy historyczne na współczesnym krajobrazie", "Immersyjne doświadczenie"]
    },
    {
      icon: <MapPinned className="w-8 h-8" />,
      title: "Inteligentny przewodnik GPS",
      description: "Aplikacja prowadzi użytkownika po trasie turystycznej w przestrzeni miasta.",
      details: ["Opis historyczny każdego punktu", "Materiały multimedialne", "Narracja lektorska"]
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Narracja w wielu językach",
      description: "Profesjonalny dubbing lektorski dostępny dla turystów zagranicznych.",
      details: ["Język polski", "Język angielski", "Język niemiecki"]
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: "Tablica Partnera",
      description: "Specjalny moduł dla miasta — cyfrowa tablica informacyjna w aplikacji.",
      details: ["Wydarzenia kulturalne", "Promocja festiwali", "Atrakcje turystyczne i lokalne instytucje"]
    }
  ];

  return (
    <section id="funkcje" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Funkcjonalności
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Główne funkcje aplikacji
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nowoczesna platforma cyfrowa, która pozwala zaprezentować historię, kulturę
            i atrakcje turystyczne w sposób immersyjny i atrakcyjny.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card ${
                index >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-1.5">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
