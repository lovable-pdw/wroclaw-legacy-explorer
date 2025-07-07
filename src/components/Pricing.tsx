import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Tablet } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "1 osoba",
      subtitle: "1 tablet",
      price: "79",
      currency: "PLN",
      icon: <Users className="w-8 h-8" />,
      popular: false
    },
    {
      title: "2 osoby",
      subtitle: "1 tablet",
      price: "139",
      currency: "PLN",
      icon: <Users className="w-8 h-8" />,
      popular: false
    },
    {
      title: "Pakiet Rodzina",
      subtitle: "2+2 osoby, 2 tablety",
      price: "189",
      currency: "PLN",
      icon: <Tablet className="w-8 h-8" />,
      popular: true
    },
    {
      title: "Pakiet Rodzina +",
      subtitle: "2+3 lub więcej (2 dorosłych), 2 tablety",
      price: "199",
      currency: "PLN",
      icon: <Tablet className="w-8 h-8" />,
      popular: false
    }
  ];

  return (
    <section id="cennik" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            CENNIK
          </h2>
          <p className="text-xl text-muted-foreground">
            Wybierz pakiet dostosowany do Twoich potrzeb
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.title}
              className={`relative bg-card/80 backdrop-blur-sm border-primary/20 shadow-historical hover:shadow-glow transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <Badge 
                  variant="default" 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-accent text-background"
                >
                  NAJPOPULARNIEJSZY
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 text-primary">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {plan.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {plan.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground ml-2">
                    {plan.currency}
                  </span>
                </div>
                
                <Button 
                  variant={plan.popular ? "hero" : "historical"}
                  className="w-full"
                >
                  WYBIERZ PAKIET
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Group Package Highlight */}
        <Card className="bg-gradient-accent text-background shadow-glow">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Pakiet Grupa</h3>
            <p className="text-lg mb-4">powyżej 6 osób • 1 tablet na 2 osoby</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-3xl font-bold">40 PLN za osobę</div>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                PROMOCJA 50%
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className="border-background text-background hover:bg-background hover:text-foreground"
            >
              ZAREZERWUJ GRUPĘ
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Pricing;