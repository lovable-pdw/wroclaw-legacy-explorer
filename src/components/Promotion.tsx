import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Promotion = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            WEEKEND PROMOCJI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            -50% DLA GRUP
          </h2>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-historical">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Trasa "Historyczny Wrocław"
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <span className="text-lg text-muted-foreground">
                      1,5 godzinna wycieczka po zarejestrowaniu telefonicznym
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span className="text-lg text-muted-foreground">
                      Zaczynamy w weekendy od 12.00
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-lg text-muted-foreground">
                      Zapraszamy do rezerwacji. Wyślij SMS lub zadzwoń
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-accent text-background p-6 rounded-lg shadow-glow mb-6">
                  <div className="text-lg font-semibold mb-2">PAKIET GRUPA</div>
                  <div className="text-sm opacity-90 mb-4">powyżej 6 osób</div>
                  <div className="text-4xl font-bold mb-2">40 PLN</div>
                  <div className="text-lg">za osobę</div>
                  <Badge variant="destructive" className="mt-2">
                    PROMOCJA 50%
                  </Badge>
                </div>
                
                <Link to="/booking">
                  <Button 
                    variant="hero" 
                    size="lg"
                    className="w-full"
                  >
                    ZAREZERWUJ TERAZ
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Promotion;