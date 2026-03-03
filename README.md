# Remote Padi

AI-powered freelance toolkit mobile app: generate professional invoices, CVs, and cover letters with AI, then export as PDFs.

## Stack

- **Expo SDK 55** (bare workflow), TypeScript
- **Expo Router v5** for file-based navigation
- **Supabase Auth** for Google, Apple, and GitHub OAuth (expo-auth-session + expo-web-browser)
- **Zustand** for global state
- **React Hook Form + Zod** for forms and validation
- **MMKV** for local draft persistence
- **Axios** for API calls (JWT attached via base service)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo` is enough)
- iOS: Xcode (Mac). Android: Android Studio / SDK

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example env and fill in your keys:

```bash
cp .env.example .env
```

Edit `.env`:

- `EXPO_PUBLIC_SUPABASE_URL` – Supabase project URL (Dashboard → Settings → API)
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon/public key
- `EXPO_PUBLIC_API_URL` – Base URL of your backend API (for AI generation)

### 3. Supabase Auth (OAuth)

In [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → URL Configuration:

- Add your redirect URL (e.g. `remotepadi:///(auth)/callback` or the Expo dev URL).

Enable and configure providers:

- **Google / Apple / GitHub** under Authentication → Providers.

### 4. Assets (optional)

Add `icon.png`, `splash.png`, and `adaptive-icon.png` under `assets/` so the app icon and splash screen load, or edit `app.json` to remove/change those paths.

### 5. Run the app

```bash
npx expo start
```

- Press `i` for iOS simulator or `a` for Android emulator.
- For a physical device, scan the QR code with the Expo Go app (or use a dev build).

### Bare workflow (optional)

For native OAuth and full bare workflow:

```bash
npx expo prebuild
npx expo run:ios
# or
npx expo run:android
```

## Project structure

```
app/                    # Expo Router screens
  (auth)/               # Auth group: login, OAuth callback
  (tabs)/               # Tab group: dashboard, invoices, cvs, settings
  _layout.tsx           # Root layout (Stack)
src/
  components/
    ui/                 # Button, Input, Card
    invoice/            # Invoice editor
    cv/                 # CV editor
  stores/               # Zustand: authStore, invoiceStore, cvStore
  services/             # api, supabase, storage, auth-storage
  hooks/                # useAuth, useGenerate
  types/                # Invoice and CV types
  utils/
assets/
```

## License

Private.
