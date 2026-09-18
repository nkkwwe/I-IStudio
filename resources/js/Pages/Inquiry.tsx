import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InquiryMarkup from '../legacy/InquiryMarkup';
import { initLegacyApp } from '../legacy/legacyApp';

const serviceKeys = ['landing', 'corporate', 'redesign', 'ads', 'consultation', 'other'] as const;

type ServiceKey = (typeof serviceKeys)[number];

function getInitialService(): ServiceKey {
  const requestedService = new URLSearchParams(window.location.search).get('service');

  return serviceKeys.includes(requestedService as ServiceKey)
    ? (requestedService as ServiceKey)
    : 'landing';
}

export default function Inquiry() {
  const [activeService, setActiveService] = useState<ServiceKey>(getInitialService);

  useEffect(() => {
    document.body.className = 'inquiry-page-body inquiry-form-only-body';
    initLegacyApp();

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Head title="Project Brief">
        <meta name="description" content="Tell I&I Studio about your project." />
      </Head>
      <InquiryMarkup activeService={activeService} onServiceChange={setActiveService} />
    </>
  );
}
