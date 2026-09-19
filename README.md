# Flow / I&I Studio

The public I&I Studio website, rebuilt on a future-ready Laravel and React foundation with a lightweight customer account.

## Stack

- Laravel 13 and Inertia.js
- React 19 with TypeScript
- Vite 8 with hashed production assets
- Existing responsive design and EN / UK / RO translations
- Apache/PHP Docker image for Render-compatible deployment

## Authentication

- Email registration and sign-in use Laravel sessions and a password.
- Google sign-in uses Laravel Socialite and does not require a password.
- User records are stored in the Laravel `users` table, so with the Render PostgreSQL connection they are stored in the connected Supabase database.
- For Render, set `DB_CONNECTION=pgsql`, the Supabase `DB_URL` (or the matching `DB_HOST`/`DB_PORT`/`DB_DATABASE`/`DB_USERNAME`/`DB_PASSWORD` values), and `DB_SSLMODE=require`; run `php artisan migrate --force` once after deploying.
- Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI` in Render. The production callback URL is `https://your-domain.example/auth/google/callback`.

## Local development

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan serve
npm run dev
```

## Production build

```bash
npm run typecheck
npm run build
php artisan test
```

The Dockerfile builds both PHP dependencies and versioned Vite assets. Future authentication, user cabinets, and admin areas can be added as separate Inertia pages without replacing the public-site foundation.
