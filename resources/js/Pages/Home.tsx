import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import HomeMarkup from '../legacy/HomeMarkup';
import { initLegacyApp } from '../legacy/legacyApp';

export default function Home() {
  useEffect(() => {
    document.body.className = '';
    initLegacyApp();
  }, []);

  return (
    <>
      <Head title="">
        <meta
          name="description"
          content="We build high-converting landing pages, functional business websites, modern website redesigns, and high-ROI ad campaigns."
        />
      </Head>
      <HomeMarkup />
    </>
  );
}
