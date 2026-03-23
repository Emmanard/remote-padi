# Remote Padi

A lightweight freelance toolkit mobile app for creating CVs/resumes and invoices with fast, template-driven editors. AI is optional and will be introduced later (Phase 2).

## Project Overview

Remote Padi is a lightweight freelance toolkit for creating:
- CVs / resumes
- invoices
- contracts (planned for later phases)

The MVP works without AI using structured, template-driven editors and local persistence (MMKV).

## Tech Stack

- **Expo SDK 55** (bare workflow), TypeScript
- **Expo Router v5** for file-based navigation
- **Supabase Auth** for Google, Apple, and GitHub OAuth (expo-auth-session + expo-web-browser)
- **Zustand** for global state
- **React Hook Form + Zod** for forms and validation
- **MMKV** for local draft persistence
- **Axios** for API calls (JWT attached via base service)

## Features

- Template-based document editors (CVs / resumes, invoices)
- Local draft persistence using MMKV
- PDF export capability: planned
- OAuth authentication via Supabase

## AI Positioning (Phase 2)

- AI is optional and not required for the MVP
- When enabled later, AI will be used to improve text and rewrite content

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
- `EXPO_PUBLIC_API_URL` – Base URL of your backend API (optional document generation endpoints)

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
  hooks/                # useAuth, useGenerate (optional generation endpoints)
  types/                # Invoice and CV types
  utils/
assets/
```

## Backend API

Remote Padi connects to a separate backend service for document processing via `EXPO_PUBLIC_API_URL`.

### Backend Role

- Document processing service
- Handles:
  - authentication token validation
  - document generation / transformation
  - PDF generation (planned)
- Optional AI endpoints may be exposed, but they are not required for the core MVP editing flow

### Optional `/generate` Endpoint

The client integrates with optional generation endpoints under `/generate/*`:
- `/generate/invoice`
- `/generate/cv`
- `/generate/cover-letter`

These endpoints are:
- Optional for core functionality
- Expected to be rate-limited
- Intended for enhanced generation workflows (Phase 2)

### Planned Improvements

- Template-based PDF generation without relying on AI
- Document storage APIs (server-side persistence)
- Reduced reliance on AI by expanding template-driven output paths

## License

MIT. See `LICENSE`.
