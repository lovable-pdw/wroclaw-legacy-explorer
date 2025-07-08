# 🏛️ Wrocław Historical Tour - Booking System

> **Rezerwacja wycieczki historycznej po Wrocławiu z tabletem**
> Pełny system rezerwacji z integracją PayU i responsywnym UI.

## 🚀 Quick Start - Development

```powershell
# Klonuj repozytorium
git clone [URL_REPO]
cd PDW

# Zainstaluj dependencies
npm install

# Uruchom środowisko deweloperskie
npm run dev:full
```

**Aplikacja będzie dostępna na:**
- Frontend: http://localhost:8081 
- Backend API: http://localhost:3001

## 📋 Funkcjonalności

- ✅ **Responsywny formularz rezerwacji** (React + shadcn/ui)
- ✅ **Integracja PayU** (sandbox + production ready) 
- ✅ **System wyboru pakietów** (1-6+ osób)
- ✅ **Kalendarz rezerwacji** z walidacją dat
- ✅ **Płatności online** przez PayU
- ✅ **Potwierdzenia statusu** płatności
- ✅ **Backend API** (Node.js + Express)
- ✅ **Deployment ready** dla lh.pl hosting

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- shadcn/ui (komponenty)
- Tailwind CSS
- React Hook Form + Zod validation
- React Router

**Backend:**
- Node.js + Express
- PayU REST API integration 
- dotenv configuration
- CORS enabled

**Hosting:**
- Optimized for lh.pl Node.js hosting
- Static files served from backend
- Environment variables configuration

## 📚 Dokumentacja

- **[DEV-GUIDE.md](./DEV-GUIDE.md)** - Kompletna instrukcja development
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Instrukcja hostowania na lh.pl

## 🧪 PayU Integration

Aplikacja jest skonfigurowana z PayU sandbox dla testów:

```env
PAYU_SANDBOX=true
PAYU_CLIENT_ID=492343
PAYU_CLIENT_SECRET=a15295ec105fdcf80f72cf19a2306a74
PAYU_MERCHANT_POS_ID=492343
```

## 🔧 Development Commands

```powershell
# Development (hot reload)
npm run dev:full          # Frontend + Backend
npm run dev               # Tylko Frontend
npm run dev:backend       # Tylko Backend

# Production Build  
npm run build             # Build frontend
npm run deploy:prepare    # Przygotuj do hostowania

# Testing
npm run preview           # Test production build
npm run lint              # Code linting
```

## 📁 Struktura Projektu

```
src/
├── pages/              # Main pages (Index, Booking, PaymentSuccess)
├── components/         # UI components (shadcn/ui)
├── lib/               # Utilities (API config, utils)
└── assets/            # Images, styles

server/
├── index.js           # Express server + PayU API
├── package.json       # Backend dependencies  
└── .env              # PayU configuration

deploy/                # Production ready files
```

## 🌐 Deployment na lh.pl

1. **Przygotuj pliki:**
   ```powershell
   npm run deploy:prepare
   ```

2. **Upload na lh.pl:**
   - Upload zawartości folderu `deploy/` 
   - Konfiguruj Node.js app: `server/index.js`
   - Ustaw zmienne środowiskowe
   - Włącz SSL (wymagane dla PayU)

3. **Szczegóły w:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📞 Kontakt & Wsparcie

- **PayU Docs**: https://developers.payu.com/
- **Phone**: +48 787 975 999
- **Issues**: GitHub Issues w tym repo

---

## Project info (Lovable)

**URL**: https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e

## How can I edit this code?

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e) and start prompting.

**Use your preferred IDE**

Clone this repo and push changes. The only requirement is having Node.js & npm installed.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: In a separate terminal, start the backend server.
npm run server
```

### Backend Server

This project includes a Node.js/Express backend server in the `/server` directory to handle PayU API interactions.

To run the backend server:
```sh
npm run server
```
Or for development with auto-reloading (if you have `nodemon` installed globally or add it to project devDependencies):
```sh
npm run dev:server
```

**Important: PayU Configuration**

The backend server requires PayU API credentials to be configured via environment variables:
- `PAYU_APP_ID`: Your PayU Application ID.
- `PAYU_PRIVATE_KEY`: Your PayU Private Key.
- `PAYU_ENV`: Set to `test` for testing environment or `live` for production. (Defaults to `test` if `NODE_ENV` is not `production`).

Create a `.env` file in the `/server` directory (this file is gitignored):
```
PAYU_APP_ID=your_app_id_here
PAYU_PRIVATE_KEY=your_private_key_here
PAYU_ENV=test
```
Remember to replace placeholders with your actual PayU credentials. The frontend also requires a `PAYU_PUBLIC_KEY` to be set in `src/pages/Booking.tsx` and the correct PayU Secure Fields SDK URL in `index.html`.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
