# 🔧 Instrukcja Development - Lokalne Środowisko

## 🚀 Szybki Start

### Opcja 1: Uruchom wszystko jednocześnie ⭐
```powershell
# Uruchomi frontend i backend
npm run dev:full

# Z nodemon (auto-restart backend)
npm run dev:full:watch
```

### Opcja 2: Uruchom osobno
```powershell
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

## 📋 Porty i URL-e

- **Frontend**: http://localhost:8080 (lub 8081 jeśli 8080 zajęty)
- **Backend API**: http://localhost:3001
- **PayU**: Sandbox mode (testowe płatności)

## ✅ Aktualny Stan Projektu

### ✅ Co działa:
- ✅ Frontend React + Vite + TypeScript
- ✅ Backend Node.js + Express
- ✅ PayU Sandbox integration
- ✅ Hot reload dla frontend
- ✅ Auto-restart dla backend (z nodemon)
- ✅ API proxy configuration
- ✅ Build scripts dla produkcji
- ✅ Deployment package generation

### 🧪 PayU Sandbox - gotowe do testów:
```env
PAYU_CLIENT_ID=492343
PAYU_CLIENT_SECRET=a15295ec105fdcf80f72cf19a2306a74
PAYU_MERCHANT_POS_ID=492343
PAYU_BASE_URL=https://secure.snd.payu.com
```

## 🔄 Development Workflow

### 1. Codzienne uruchamianie
```powershell
git pull                    # Pobierz najnowsze zmiany
npm run dev:full           # Uruchom środowisko deweloperskie
```

### 2. Praca nad frontendem
- Pliki w `src/` - automatyczny hot reload
- Zmiany CSS/komponenty widoczne natychmiast  
- Console deweloperskie w przeglądarce (F12)
- API calls logowane w konsoli

### 3. Praca nad backendem
- Pliki w `server/` - automatyczny restart
- Logi PayU w terminalu backend
- Endpoint testing przez frontend lub Postman

### 4. Testowanie PayU (Sandbox)
1. Otwórz frontend: http://localhost:8081
2. Przejdź do "Rezerwacja" 
3. Wypełnij formularz
4. Kliknij "Zapłać przez PayU"
5. → Automatyczne przekierowanie do PayU sandbox
6. Użyj testowych danych kart

## 🛠 Przydatne Komendy

### Development
```powershell
npm run dev:full          # Frontend + Backend
npm run dev:full:watch    # Z auto-restart backend
npm run dev               # Tylko Frontend  
npm run dev:backend       # Tylko Backend
npm run lint              # Sprawdź kod
```

### Build & Deploy
```powershell
npm run build             # Build frontend
npm run preview           # Test production build
npm run deploy:prepare    # Przygotuj do hostowania na lh.pl
```

### API Testing
```powershell
# Test backend endpoint
curl http://localhost:3001/api/create-order -X POST -H "Content-Type: application/json" -d "{\"test\":\"data\"}"
```

## 🔧 Rozwiązywanie Problemów

### Frontend nie łączy się z backend
1. ✅ Sprawdź czy backend działa na porcie 3001
2. ✅ Sprawdź logi w konsoli: F12 → Console
3. ✅ Sprawdź Network tab dla błędów API

### PayU nie działa
1. ✅ Sprawdź logi backend w terminalu
2. ✅ Sprawdź czy używasz sandbox credentials
3. ✅ Sprawdź Network tab w dev tools
4. ✅ Verify w konsoli: API_BASE_URL

### Port zajęty
```powershell
# Znajdź proces na porcie
netstat -ano | findstr :3001

# Zabij proces (zastąp PID)
taskkill /PID [numer_pid] /F
```

### Cache issues
```powershell
# Wyczyść cache Vite
npm run dev -- --force

# Restart całego środowiska
Ctrl+C # Zatrzymaj serwery
npm run dev:full # Uruchom ponownie
```

## 🎯 Workflow dla zmian

### Nowa funkcjonalność
1. Stwórz branch: `git checkout -b feature/nazwa`
2. Wprowadź zmiany (auto-reload)
3. Testuj: frontend + PayU sandbox
4. Commit: `git commit -m "opis"`
5. Test build: `npm run build`
6. Push: `git push origin feature/nazwa`

### Deployment na lh.pl
1. ✅ Test lokalnie: `npm run dev:full`
2. ✅ Build: `npm run deploy:prepare`  
3. ✅ Upload folderu `deploy/` na lh.pl
4. ✅ Konfiguruj zmienne środowiskowe
5. ✅ Restart aplikacji Node.js na lh.pl

## 📁 Struktura Projektu

```
c:\moje\PDW\
├── src/                    # 🎨 Frontend React/TypeScript
│   ├── pages/             #    Strony (Booking, Index, etc.)
│   ├── components/        #    Komponenty UI (shadcn/ui)
│   ├── lib/              #    API config, utilities
│   └── assets/           #    Obrazy, style
├── server/               # 🔧 Backend Node.js/Express  
│   ├── index.js          #    Główny serwer + PayU API
│   ├── package.json      #    Backend dependencies
│   └── .env             #    PayU sandbox credentials
├── deploy/              # 📦 Gotowe pliki do hostowania
└── *.bat               # 🚀 Development scripts
```

## 📞 Wsparcie Development

- **Frontend logs**: Browser Console (F12)
- **Backend logs**: Terminal backend
- **PayU logs**: Terminal backend + Network tab
- **Hot Reload**: Zapisz plik = auto reload
- **API Debug**: Konsola → API Configuration

## 🔄 Przełączanie między trybami

### Development (obecny)
- ✅ Sandbox PayU
- ✅ Hot reload
- ✅ Source maps  
- ✅ Detailowe logi
- ✅ CORS enabled

### Production Preview
```powershell
npm run build
npm run preview  # Test jak w produkcji
```

## 💡 Pro Tips

1. **Szybki restart**: `Ctrl+C` → `npm run dev:full`
2. **Debug PayU**: Sprawdź terminal backend dla szczegółowych logów
3. **Frontend debug**: F12 → Console → API Configuration logs
4. **Backend test**: http://localhost:3001 → should show "PayU Backend Server is running!"
5. **Auto port**: Vite automatycznie znajdzie wolny port (8080, 8081, etc.)

---

## 🎯 Następne kroki rozwoju

1. **Testy**: Dodaj unit tests (Jest/Vitest)
2. **Database**: Dodaj bazę danych dla rezerwacji
3. **Email**: Dodaj powiadomienia email  
4. **Admin Panel**: Panel zarządzania rezerwacjami
5. **Analytics**: Tracking rezerwacji i płatności
