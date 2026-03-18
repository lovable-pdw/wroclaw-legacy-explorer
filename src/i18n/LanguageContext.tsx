import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import pl from "./pl.json";
import en from "./en.json";

type Locale = "pl" | "en";

const translations = { pl, en } as const;

interface LanguageContextValue {
  locale: Locale;
  t: typeof pl;
  prefix: string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "pl",
  t: pl,
  prefix: "",
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const value = useMemo<LanguageContextValue>(() => {
    const isEn = location.pathname.startsWith("/en");
    const locale: Locale = isEn ? "en" : "pl";
    return {
      locale,
      t: translations[locale],
      prefix: isEn ? "/en" : "",
    };
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
