import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For now, just show a confirmation - will wire up email later
    setTimeout(() => {
      toast({
        title: t.contact.successTitle,
        description: t.contact.successDescription,
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
            {t.contact.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.contact.description}
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
                    <p className="font-semibold text-foreground">{t.contact.phone}</p>
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
                    <p className="font-semibold text-foreground">{t.contact.email}</p>
                    <a
                      href="mailto:pdw@pdw.wroc.pl"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      pdw@pdw.wroc.pl
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
                    <Label htmlFor="name">{t.contact.nameLabel}</Label>
                    <Input
                      id="name"
                      placeholder={t.contact.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">{t.contact.orgLabel}</Label>
                    <Input
                      id="organization"
                      placeholder={t.contact.orgPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contact.phoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.contact.messageLabel}</Label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
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
