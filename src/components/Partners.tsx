import { useTranslation } from "@/i18n/LanguageContext";

const Partners = () => {
  const { t } = useTranslation();

  const partners = [
    {
      name: "Urząd Marszałkowski Województwa Dolnośląskiego",
      logoUrl: "/logos/wojewodztwo-dolnoslaskie.jpg"
    },
    {
      name: "Koleje Dolnośląskie",
      logoUrl: "/logos/koleje-dolnoslaskie-logo.jpg"
    },
    {
      name: "Port Lotniczy Wrocław",
      logoUrl: "/logos/wroclaw-airport-logo.png"
    },
    {
      name: "Dolnośląska Organizacja Turystyczna",
      logoUrl: "/logos/dolnoslaska-org-turyst.webp"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-10">
          {t.partners.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              title={partner.name}
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
