import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import HomeMarkup from '../legacy/HomeMarkup';
import { initLegacyApp } from '../legacy/legacyApp';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';

export default function Home() {
  const copy = getUiCopy(useSiteLanguage());

  useEffect(() => {
    document.body.className = '';
    initLegacyApp();
  }, []);

  return (
    <>
      <Head title="">
        <meta
          name="description"
          content={copy.common.homeMetaDescription}
        />
      </Head>
      <HomeMarkup />
    </>
  );
}
