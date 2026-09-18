<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <script>
        try {
            document.documentElement.dataset.theme = localStorage.getItem('ii_studio_theme') === 'dark' ? 'dark' : 'light';
        } catch (error) {
            document.documentElement.dataset.theme = 'light';
        }
    </script>
    @inertiaHead
    @viteReactRefresh
    @vite('resources/js/app.tsx')
</head>
<body>
    @inertia
</body>
</html>
