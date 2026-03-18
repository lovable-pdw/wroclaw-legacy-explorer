import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t, prefix } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-2">{t.notFound.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{t.notFound.message}</p>
        <Link to={prefix || "/"}>
          <Button>{t.notFound.backHome}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
