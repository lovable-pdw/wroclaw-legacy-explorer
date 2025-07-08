import { Card, CardContent } from "@/components/ui/card";
import { Tablet, Users, MapPin, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Tablet className="w-12 h-12 text-primary" />,
      title: "Nowoczesna technologia",
      description: "Wycieczka z tabletem pokazującym rekonstrukcje historyczne i archiwalne zdjęcia"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Doświadczony przewodnik",
      description: "Profesjonalni przewodnicy z pasją do historii Wrocławia"
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      title: "Historyczne miejsca",
      description: "Odwiedzisz najważniejsze punkty historycznego Wrocławia"
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "1,5 godziny",
      description: "Optymalny czas na poznanie historii miasta bez pośpiechu"
    }
  ];

  return (
    <section id="o-nas" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Poczuj Dawny Wrocław
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Zanurz się w fascynującej historii Wrocławia dzięki unikalnej kombinacji 
            nowoczesnej technologii i tradycyjnego przewodnictwa. Nasze tablety 
            pokazują, jak wyglądały miejsca w przeszłości.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-historical hover:shadow-glow transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-hero border-primary/20 shadow-historical">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Jak przebiega wycieczka?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-semibold text-foreground">Rezerwacja</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Zadzwoń pod +48 787 975 999 lub wyślij SMS, aby zarezerwować wycieczkę
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-semibold text-foreground">Spotkanie</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Spotykamy się w centrum Wrocławia i otrzymujesz tablet z materiałami
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-semibold text-foreground">Wycieczka</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    1,5 godziny fascynującej podróży przez historię miasta
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;