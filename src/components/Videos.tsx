import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";

const appYoutubeIds = ["nuvXzs5f4_M", "hDZ9uFpmgCE"];
const cityYoutubeIds = ["fNxIyoXs1Yg", "Oln5aHooR3g", "lRtNNLSZBUA", "wfQbPtqcfzY"];

const Videos = () => {
  const { t } = useTranslation();

  return (
    <section id="materialy" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {t.videos.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.videos.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.videos.description}
          </p>
        </div>

        {/* App demo videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {t.videos.appVideos.map((video, index) => (
            <Card key={appYoutubeIds[index]} className="border border-border overflow-hidden bg-card">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${appYoutubeIds[index]}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* City promo videos */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t.videos.cityVideosTitle}
          </h3>
          <p className="text-muted-foreground">
            {t.videos.cityVideosDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.videos.cityVideos.map((video, index) => (
            <Card
              key={cityYoutubeIds[index]}
              className="border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${cityYoutubeIds[index]}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
