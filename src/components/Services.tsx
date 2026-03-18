import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, TrendingUp, GraduationCap, CalendarDays, Sun, Smartphone } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const icons = [
  <Megaphone className="w-7 h-7" />,
  <TrendingUp className="w-7 h-7" />,
  <GraduationCap className="w-7 h-7" />,
  <CalendarDays className="w-7 h-7" />,
  <Sun className="w-7 h-7" />,
  <Smartphone className="w-7 h-7" />,
];

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="produkt" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.services.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            {t.services.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((benefit, index) => (
            <Card
              key={index}
              className="group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {icons[index]}
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
