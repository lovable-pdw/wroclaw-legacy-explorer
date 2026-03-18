import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Eye, Headphones, History } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const icons = [
  <Navigation className="w-6 h-6" />,
  <Eye className="w-6 h-6" />,
  <Headphones className="w-6 h-6" />,
  <History className="w-6 h-6" />,
];

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.howItWorks.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.howItWorks.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((step, index) => (
            <Card key={index} className="border border-border bg-card relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {icons[index]}
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
