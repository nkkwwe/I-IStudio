import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import './content/translations';

const savedTheme = window.localStorage.getItem('ii_studio_theme');
if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

const pages = import.meta.glob<{ default: ComponentType }>('./Pages/**/*.tsx');

createInertiaApp({
  title: (title) => (title && title !== 'I&I Studio' ? `${title} · I&I Studio` : 'I&I Studio'),
  resolve: async (name) => {
    const loadPage = pages[`./Pages/${name}.tsx`];

    if (!loadPage) {
      throw new Error(`Unknown Inertia page: ${name}`);
    }

    return (await loadPage()).default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: '#09090b',
  },
});
