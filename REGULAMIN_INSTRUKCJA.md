# 📄 Regulamin i Polityka Prywatności - Instrukcja

## 📁 **Gdzie umieścić plik Regulamin.pdf**

### Lokalizacja:
```
public/
├── favicon.ico
├── placeholder.svg
├── robots.txt
└── regulamin.pdf  ← TUTAJ umieść swój plik PDF
```

### Instrukcja:
1. **Skopiuj** swój plik `regulamin.pdf` do folderu `c:\moje\PDW\public\`
2. **Upewnij się**, że nazwa pliku to dokładnie: `regulamin.pdf` (małe litery)
3. **Wdróż zmiany** używając: `vercel --prod`

### Dostępność:
Po umieszczeniu pliku będzie dostępny pod adresem:
```
https://www.projektdawnywroclaw.pl/regulamin.pdf
```

## ✅ **Co zostało już skonfigurowane**

### 1. **Polityka Prywatności**
- ✅ **Strona utworzona**: `/src/pages/PolitykaPrywatnosci.tsx`
- ✅ **Routing dodany**: `/polityka-prywatnosci`
- ✅ **Dostępna pod**: `https://www.projektdawnywroclaw.pl/polityka-prywatnosci`

### 2. **Linki w stopce (Footer)**
- ✅ **Regulamin PDF**: Link otwiera w nowej karcie
- ✅ **Polityka Prywatności**: Link prowadzi do dedykowanej strony
- ✅ **Sekcja dokumentów**: Dodana w głównej części stopki
- ✅ **Linki w dole**: Dodane w dolnej części stopki

### 3. **Ikony i stylistyka**
- ✅ **Ikony**: FileText dla regulaminu, Shield dla polityki
- ✅ **Responsywność**: Linki dostosowane do urządzeń mobilnych
- ✅ **Hover efekty**: Smooth transitions na hover

## 🔗 **Struktura linków**

### W stopce (sekcja "Dokumenty"):
```tsx
- 📄 Regulamin (PDF) → /regulamin.pdf (nowa karta)
- 🛡️ Polityka Prywatności → /polityka-prywatnosci
```

### W dolnej części stopki:
```tsx
© 2025 | Polityka Prywatności | Regulamin
```

## 📋 **Następne kroki**

### 1. **Dodaj plik PDF**:
```bash
# Skopiuj swój regulamin.pdf do:
c:\moje\PDW\public\regulamin.pdf
```

### 2. **Wdróż zmiany**:
```bash
vercel --prod
```

### 3. **Sprawdź linki**:
- https://www.projektdawnywroclaw.pl/polityka-prywatnosci
- https://www.projektdawnywroclaw.pl/regulamin.pdf

## 🎨 **Zawartość Polityki Prywatności**

Polityka zawiera wszystkie wymagane sekcje:
- ✅ Administrator danych
- ✅ Zakres przetwarzanych danych  
- ✅ Cele i podstawy prawne
- ✅ Udostępnianie danych (PayU, hosting)
- ✅ Okres przechowywania
- ✅ Prawa użytkowników (RODO)
- ✅ Cookies
- ✅ Bezpieczeństwo
- ✅ Kontakt

## 📱 **Responsywność**

Wszystkie linki i strony są w pełni responsywne:
- 📱 **Mobile**: Linki stackują się pionowo
- 💻 **Desktop**: Linki w poziomie
- 🎨 **Styling**: Konsystentny z resztą strony

## ✨ **Gotowe do użycia!**

Po dodaniu pliku `regulamin.pdf` do folderu `public/`, cała struktura będzie gotowa i funkcjonalna. Użytkownicy będą mogli:

1. **Pobrać regulamin** - kliknięcie otwiera PDF w nowej karcie
2. **Przeczytać politykę** - kliknięcie prowadzi do dedykowanej strony
3. **Łatwo znaleźć linki** - w stopce na każdej stronie

Wszystko zgodne z wymaganiami prawnymi i best practices UX! 🎉
