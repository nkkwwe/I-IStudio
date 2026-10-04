import type { ChatMessage } from './types';
import { getSiteLanguage, getUiCopy } from '../../content/uiTranslations';

export function formatMessageTime(value?: string | null): string {
  if (!value) return '';

  const locale = {
    en: 'en-GB',
    uk: 'uk-UA',
    ro: 'ro-RO',
  }[getSiteLanguage()];

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

export function dayKey(value?: string | null): string {
  const date = value ? new Date(value) : new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function formatDay(value: string | null | undefined, copy: ReturnType<typeof getUiCopy>['chat']): string {
  const date = value ? new Date(value) : new Date();
  const today = new Date();
  const calendarDay = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((calendarDay(today) - calendarDay(date)) / 86400000);
  if (days === 0) return copy.today;
  if (days === 1) return copy.yesterday;
  if (days === 2) return copy.dayBeforeYesterday;
  return new Intl.DateTimeFormat({ en: 'en-GB', uk: 'uk-UA', ro: 'ro-RO' }[getSiteLanguage()], {
    day: 'numeric', month: 'long', ...(date.getFullYear() !== today.getFullYear() ? { year: 'numeric' as const } : {}),
  }).format(date);
}

export function groupMessages(messages: ChatMessage[]) {
  const groups: { key: string; date?: string | null; messages: ChatMessage[] }[] = [];
  messages.forEach((message) => {
    const key = dayKey(message.created_at);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.messages.push(message);
    else groups.push({ key, date: message.created_at, messages: [message] });
  });
  return groups;
}
