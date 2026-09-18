# Flow / I&I Studio

The public I&I Studio website, rebuilt on a future-ready Laravel and React foundation without adding admin or customer-account interfaces yet.

## Stack

- Laravel 13 and Inertia.js
- React 19 with TypeScript
- Vite 8 with hashed production assets
- Existing responsive design and EN / UK / RO translations
- Apache/PHP Docker image for Render-compatible deployment

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
