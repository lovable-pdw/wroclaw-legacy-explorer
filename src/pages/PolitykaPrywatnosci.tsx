import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PolitykaPrywatnosci = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-amber-800">
              Polityka Prywatności
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Projekt Dawny Wrocław
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  1. Informacje ogólne
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                  użytkowników serwisu Projekt Dawny Wrocław, dostępnego pod adresem www.projektdawnywroclaw.pl.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  2. Administrator danych
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Administratorem danych osobowych jest Projekt Dawny Wrocław.<br/>
                  Kontakt: <a href="mailto:kontakt@projektdawnywroclaw.pl" className="text-amber-600 hover:text-amber-800">kontakt@projektdawnywroclaw.pl</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  3. Zakres przetwarzanych danych
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  W ramach świadczonych usług przetwarzamy następujące kategorie danych osobowych:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dane identyfikacyjne (imię, nazwisko)</li>
                  <li>Dane kontaktowe (adres e-mail, numer telefonu)</li>
                  <li>Dane dotyczące płatności (w zakresie niezbędnym do realizacji transakcji)</li>
                  <li>Dane techniczne (adres IP, informacje o przeglądarce, pliki cookies)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  4. Cele i podstawy prawne przetwarzania danych
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p><strong>Realizacja usług:</strong> Art. 6 ust. 1 lit. b) RODO - wykonanie umowy</p>
                  <p><strong>Obsługa płatności:</strong> Art. 6 ust. 1 lit. b) RODO - wykonanie umowy</p>
                  <p><strong>Komunikacja z użytkownikami:</strong> Art. 6 ust. 1 lit. f) RODO - prawnie uzasadniony interes</p>
                  <p><strong>Marketing:</strong> Art. 6 ust. 1 lit. a) RODO - zgoda (opcjonalnie)</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  5. Udostępnianie danych osobowych
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Dane osobowe mogą być udostępniane następującym kategoriom odbiorców:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Dostawcy usług płatniczych (PayU)</li>
                  <li>Dostawcy usług IT i hostingu</li>
                  <li>Podmioty uprawnione na podstawie przepisów prawa</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  6. Okres przechowywania danych
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, 
                  dla których zostały zebrane, nie dłużej niż przez okres wymagany przepisami prawa.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  7. Prawa użytkowników
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Użytkownikom przysługują następujące prawa:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Prawo dostępu do danych osobowych</li>
                  <li>Prawo do sprostowania danych</li>
                  <li>Prawo do usunięcia danych</li>
                  <li>Prawo do ograniczenia przetwarzania</li>
                  <li>Prawo do przenoszenia danych</li>
                  <li>Prawo do wniesienia sprzeciwu</li>
                  <li>Prawo do cofnięcia zgody</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  8. Pliki cookies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Serwis wykorzystuje pliki cookies w celu zapewnienia prawidłowego funkcjonowania strony, 
                  analizy ruchu oraz personalizacji treści. Użytkownik może zarządzać ustawieniami cookies 
                  w swojej przeglądarce internetowej.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  9. Bezpieczeństwo danych
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych 
                  przed nieuprawnionym dostępem, utratą, zniszczeniem lub nieuprawnionym przetwarzaniem.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  10. Zmiany w Polityce Prywatności
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                  O wszelkich zmianach użytkownicy będą informowani poprzez publikację zaktualizowanej wersji na stronie internetowej.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  11. Kontakt
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem: 
                  <a href="mailto:kontakt@projektdawnywroclaw.pl" className="text-amber-600 hover:text-amber-800 ml-1">
                    kontakt@projektdawnywroclaw.pl
                  </a>
                </p>
              </section>

              <div className="mt-8 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Polityka Prywatności obowiązuje od dnia 22 lipca 2025 roku.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolitykaPrywatnosci;
