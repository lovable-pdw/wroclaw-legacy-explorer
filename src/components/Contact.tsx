import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For now, just show a confirmation - will wire up email later
    setTimeout(() => {
      toast({
        title: "Wiadomość wysłana",
        description: "Dziękujemy za zainteresowanie. Odezwiemy się wkrótce!",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  return (
    <section id="kontakt" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Kontakt
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Zostań partnerem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Współpracujemy z samorządami i firmami prywatnymi.
            Chcesz promować swoje miasto lub biznes w aplikacji Zwiedzaj Dolny Śląsk?
            Porozmawiajmy o możliwościach.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">PDW Sp. z o.o.</p>
                    <p className="text-sm text-muted-foreground">Wrocław, Polska</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Telefon</p>
                    <a
                      href="tel:+48787975999"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +48 787 975 999
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href="mailto:kontakt@projektdawnywroclaw.pl"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      kontakt@projektdawnywroclaw.pl
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="lg:col-span-3 border border-border bg-card">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i nazwisko</Label>
                    <Input
                      id="name"
                      placeholder="Jan Kowalski"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organizacja / Miasto / Firma</Label>
                    <Input
                      id="organization"
                      placeholder="Urząd Miasta, firma..."
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jan@miasto.pl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+48..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Wiadomość</Label>
                  <Textarea
                    id="message"
                    placeholder="Opowiedz nam o swoim mieście i oczekiwaniach..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
