import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const Cities = () => {
  const { t } = useTranslation();

  return (
    <section id="miasta" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.cities.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.cities.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.cities.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.cities.items.map((city) => (
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
            {t.cities.cta}{" "}
            <a href="#kontakt" className="text-primary font-semibold hover:underline">
              {t.cities.ctaLink} &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cities;
