import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InquiryMarkup from '../legacy/InquiryMarkup';
import { initLegacyApp } from '../legacy/legacyApp';

const serviceKeys = ['landing', 'corporate', 'redesign', 'ads', 'consultation', 'other'] as const;

type ServiceKey = (typeof serviceKeys)[number];

type PageProps = {
  auth?: { user?: { id: number } | null } | null;
  flash?: {
    inquiry_submitted?: boolean;
    inquiry_ticket?: string;
    inquiry_service?: ServiceKey;
    inquiry_budget?: string | null;
  };
};

const serviceLabels: Record<ServiceKey, string> = {
  landing: 'Landing Page',
  corporate: 'Business Website',
  redesign: 'Website Redesign',
  ads: 'Advertising',
  consultation: 'Consultation',
  other: 'Other',
};

function getInitialService(): ServiceKey {
  const requestedService = new URLSearchParams(window.location.search).get('service');

  return serviceKeys.includes(requestedService as ServiceKey)
    ? (requestedService as ServiceKey)
    : 'landing';
}

export default function Inquiry() {
  const { auth, flash = {} } = usePage<PageProps>().props;
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
      <InquiryMarkup
        activeService={activeService}
        onServiceChange={setActiveService}
        isAuthenticated={Boolean(auth?.user)}
        inquirySubmitted={Boolean(flash.inquiry_submitted)}
        inquiryTicket={flash.inquiry_ticket ?? ''}
        inquiryServiceLabel={flash.inquiry_service ? serviceLabels[flash.inquiry_service] : ''}
        inquiryBudget={flash.inquiry_budget ?? ''}
      />
    </>
  );
}
