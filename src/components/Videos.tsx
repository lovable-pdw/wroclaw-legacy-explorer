import { Card, CardContent } from "@/components/ui/card";

const Videos = () => {
  const appVideos = [
    {
      title: "Zwiedzaj Dolny Śląsk — Aplikacja",
      description: "Poznaj naszą aplikację turystyczną promującą region Dolnego Śląska.",
      youtubeId: "nuvXzs5f4_M"
    },
    {
      title: "Aplikacja w działaniu — Panoramy 360°",
      description: "Zobacz jak działają interaktywne panoramy i rekonstrukcje historyczne w aplikacji.",
      youtubeId: "hDZ9uFpmgCE"
    }
  ];

  const cityVideos = [
    {
      title: "Legnica",
      description: "Odkryj historię i zabytki Legnicy.",
      youtubeId: "fNxIyoXs1Yg"
    },
    {
      title: "Świdnica",
      description: "Perła Dolnego Śląska z Kościołem Pokoju UNESCO.",
      youtubeId: "Oln5aHooR3g"
    },
    {
      title: "Wałbrzych",
      description: "Zamek Książ i górnicze dziedzictwo miasta.",
      youtubeId: "lRtNNLSZBUA"
    },
    {
      title: "Trzebnica",
      description: "Miasto Św. Jadwigi Śląskiej.",
      youtubeId: "wfQbPtqcfzY"
    }
  ];

  return (
    <section id="materialy" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Materiały
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aplikacja i panoramy 360°
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nasza aplikacja umożliwia oglądanie interaktywnych panoram sferycznych 360°
            i&nbsp;rekonstrukcji historycznych bezpośrednio w terenie.
          </p>
        </div>

        {/* App demo videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {appVideos.map((video) => (
            <Card key={video.youtubeId} className="border border-border overflow-hidden bg-card">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
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
            Filmy promocyjne miast
          </h3>
          <p className="text-muted-foreground">
            Przykłady materiałów, które tworzymy dla miast Dolnego Śląska.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cityVideos.map((video) => (
            <Card
              key={video.youtubeId}
              className="border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
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
