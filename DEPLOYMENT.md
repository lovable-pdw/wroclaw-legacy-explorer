# Hosting na lh.pl - Instrukcja Wdrożenia

## 📋 Wymagania

### 1. Konto lh.pl z obsługą Node.js
- Hosting z obsługą Node.js (sprawdź w panelu lh.pl)
- Dostęp do SSH lub File Manager
- Możliwość konfiguracji zmiennych środowiskowych
- Certyfikat SSL (HTTPS) - wymagane dla PayU

### 2. Dane PayU
- Konto PayU (sandbox lub produkcja)
- Klucze API (client_id, client_secret, merchant_pos_id)

## 🚀 Przygotowanie do wdrożenia

### Krok 1: Przygotuj pliki
```bash
# Uruchom script do przygotowania deploymentu
.\build-for-deployment.bat
```

To stworzy folder `deploy` z gotowymi plikami do uploadu.

### Krok 2: Konfiguracja środowiska produkcyjnego

#### Zmienne środowiskowe na lh.pl:
```env
NODE_ENV=production
PORT=8080

# PayU Production
PAYU_SANDBOX=false
PAYU_CLIENT_ID=twoj_production_client_id
PAYU_CLIENT_SECRET=twoj_production_client_secret
PAYU_MERCHANT_POS_ID=twoj_production_merchant_pos_id

# URL Twojej domeny
FRONTEND_URL=https://twoja-domena.lh.pl
```

#### Dla testów (sandbox):
```env
NODE_ENV=production
PAYU_SANDBOX=true
PAYU_CLIENT_ID=492343
PAYU_CLIENT_SECRET=a15295ec105fdcf80f72cf19a2306a74
PAYU_MERCHANT_POS_ID=492343
FRONTEND_URL=https://twoja-domena.lh.pl
```

## 📁 Wdrożenie na lh.pl

### Krok 1: Upload plików
1. Zaloguj się do panelu lh.pl
2. Przejdź do File Manager
3. Upload całą zawartość folderu `deploy/` do katalogu głównego domeny
4. Struktura powinna wyglądać tak:
   ```
   public_html/
   ├── dist/           (pliki frontend)
   ├── server/         (backend Node.js)
   ├── package.json
   └── ...
   ```

### Krok 2: Konfiguracja Node.js w panelu lh.pl
1. Przejdź do sekcji "Node.js" w panelu
2. Utwórz nową aplikację Node.js
3. Ustaw:
   - **Startup File**: `server/index.js`
   - **Application Root**: katalog z uploadowanymi plikami
   - **Application URL**: twoja domena
   - **Node.js Version**: najnowsza dostępna (min. 16.x)

### Krok 3: Zmienne środowiskowe
1. W panelu Node.js znajdź sekcję "Environment Variables"
2. Dodaj wszystkie zmienne z sekcji konfiguracji powyżej
3. **WAŻNE**: Ustaw `PORT` na port przydzielony przez lh.pl (często 8080)

### Krok 4: SSL/HTTPS
1. W panelu lh.pl włącz certyfikat SSL dla domeny
2. Sprawdź czy przekierowanie HTTP→HTTPS jest aktywne
3. PayU wymaga HTTPS dla płatności produkcyjnych!

### Krok 5: Start aplikacji
1. Kliknij "Restart" w panelu Node.js
2. Sprawdź logi czy aplikacja uruchomiła się bez błędów
3. Otwórz swoją domenę w przeglądarce

## 🧪 Testowanie

### 1. Test podstawowy
- Otwórz stronę główną
- Sprawdź czy wszystkie sekcje się ładują
- Przejdź do formularza rezerwacji

### 2. Test płatności (sandbox)
- Wypełnij formularz rezerwacji
- Kliknij "Zapłać przez PayU"
- Powinieneś zostać przekierowany na stronę PayU sandbox
- Użyj danych testowych do płatności

### 3. Test płatności produkcyjnej
- Zmień `PAYU_SANDBOX=false`
- Ustaw prawdziwe klucze PayU
- Przetestuj z małą kwotą

## 🔧 Rozwiązywanie problemów

### Błąd 500 / Aplikacja nie startuje
```bash
# Sprawdź logi w panelu lh.pl
# Najczęstsze przyczyny:
# 1. Brak zmiennych środowiskowych
# 2. Błędny port
# 3. Brak dependencies w package.json
```

### PayU zwraca błędy
```bash
# Sprawdź:
# 1. Czy HTTPS jest włączone
# 2. Czy klucze API są poprawne
# 3. Czy FRONTEND_URL jest ustawiony na właściwą domenę
# 4. Czy domena jest zweryfikowana w PayU
```

### Frontend nie ładuje się
```bash
# Sprawdź:
# 1. Czy pliki z dist/ zostały skopiowane
# 2. Czy backend serwuje pliki statyczne
# 3. Czy ścieżki w index.js są poprawne
```

## 📞 Wsparcie
- **PayU**: https://developers.payu.com/
- **lh.pl**: panel klienta → support
- **Telefon rezerwacji**: +48 787 975 999

## 🔄 Aktualizacje

### Deployment nowej wersji:
1. Wprowadź zmiany lokalnie
2. Uruchom `.\build-for-deployment.bat`
3. Upload nowych plików na lh.pl
4. Restart aplikacji Node.js

### Backup:
- Regularnie rób backup konfiguracji
- Zachowaj kopie kluczy PayU
- Dokumentuj zmiany w środowisku produkcyjnym
