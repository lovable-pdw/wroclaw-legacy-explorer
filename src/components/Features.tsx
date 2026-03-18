import { Card, CardContent } from "@/components/ui/card";
import { Box, ScanEye, MapPinned, Languages, Newspaper } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const icons = [
  <Box className="w-8 h-8" />,
  <ScanEye className="w-8 h-8" />,
  <MapPinned className="w-8 h-8" />,
  <Languages className="w-8 h-8" />,
  <Newspaper className="w-8 h-8" />,
];

const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="funkcje" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.features.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.features.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => (
            <Card
              key={index}
              className={`group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card ${
                index >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {icons[index]}
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
