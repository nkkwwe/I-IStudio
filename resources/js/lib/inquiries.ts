import type { SiteLanguage } from '../content/siteLanguage';

export type Inquiry = {
  id: number;
  ticket: string;
  name: string;
  email: string;
  contact?: string | null;
  budget?: string | null;
  service_type: string;
  comment: string;
  brief_data?: Record<string, unknown> | null;
  lead_context?: Record<string, unknown> | null;
  site_audit?: Record<string, unknown> | null;
  status: string;
  created_at?: string | null;
  unread_count?: number;
};

const dateFormatters = new Map<SiteLanguage, Intl.DateTimeFormat>();

export function formatDate(value?: string | null, language: SiteLanguage = 'en'): string {
  if (!value) return '—';

  let formatter = dateFormatters.get(language);
  if (!formatter) {
    const locale = language === 'uk' ? 'uk-UA' : language === 'ro' ? 'ro-RO' : 'en-GB';
    formatter = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    dateFormatters.set(language, formatter);
  }

  return formatter.format(new Date(value));
}

export function formatBudget(value?: string | null): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  const clean = trimmed.replace(/\s+/g, '');
  const match = clean.match(/^(\$?)([0-9]+(?:\.[0-9]+)?)(\$?)$/);
  if (match) {
    const rawNum = match[2];
    const parts = rawNum.split('.');
    const intFormatted = Number(parts[0]).toLocaleString('en-US');
    return parts.length > 1 ? `$${intFormatted}.${parts[1]}` : `$${intFormatted}`;
  }

  // Already formatted like $10,000 or $10,000.00
  if (/^\$[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)?$/.test(trimmed)) {
    return trimmed;
  }

  // If ends with $, e.g. "10000$" or "10 000$"
  if (trimmed.endsWith('$')) {
    const without = trimmed.slice(0, -1).trim().replace(/\s+/g, '');
    const num = Number(without);
    if (!isNaN(num)) {
      return `$${num.toLocaleString('en-US')}`;
    }
  }

  // If starts with $, e.g. "$10000"
  if (trimmed.startsWith('$')) {
    const without = trimmed.slice(1).trim().replace(/\s+/g, '');
    const num = Number(without);
    if (!isNaN(num)) {
      return `$${num.toLocaleString('en-US')}`;
    }
  }

  // Range like 5000-10000 or 5000-10000$
  const rangeMatch = clean.replace(/\$/g, '').match(/^([0-9]+)[-–—]([0-9]+)$/);
  if (rangeMatch) {
    const n1 = Number(rangeMatch[1]);
    const n2 = Number(rangeMatch[2]);
    if (!isNaN(n1) && !isNaN(n2)) {
      return `$${n1.toLocaleString('en-US')} – $${n2.toLocaleString('en-US')}`;
    }
  }

  return trimmed;
}
