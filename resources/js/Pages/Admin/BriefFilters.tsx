import { useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import type { Inquiry } from '../../lib/inquiries';
import { getAdminCopy } from './adminCopy';

const defaults = { search: '', status: '', service: '', account: '', review: '', rating: '', from: '', to: '', budget: '', contact: '', sort: 'newest' };
export function useBriefFilters(inquiries: Inquiry[]) {
  const [filters, setFilters] = useState(defaults);
  const filtered = inquiries.filter((inquiry) => {
    const search = [inquiry.ticket, inquiry.name, inquiry.email, inquiry.contact, inquiry.comment, inquiry.user?.name, inquiry.user?.email, JSON.stringify(inquiry.brief_data)].join(' ').toLocaleLowerCase();
    const date = inquiry.created_at?.slice(0, 10) ?? '';
    const presence = (filter: string, present: boolean) => !filter || (filter === 'yes' ? present : !present);
    return (!filters.search || search.includes(filters.search.trim().toLocaleLowerCase()))
      && (!filters.status || filters.status === inquiry.status)
      && (!filters.service || filters.service === inquiry.service_type)
      && (!filters.account || (filters.account === 'registered' ? Boolean(inquiry.user) : !inquiry.user))
      && presence(filters.review, Boolean(inquiry.review))
      && presence(filters.budget, Boolean(inquiry.budget?.trim()))
      && presence(filters.contact, Boolean(inquiry.contact?.trim()))
      && (!filters.rating || Boolean(inquiry.review && inquiry.review.rating >= Number(filters.rating)))
      && (!filters.from || date >= filters.from)
      && (!filters.to || Boolean(date && date <= filters.to));
  }).sort((a, b) => {
    if (filters.sort === 'highest') return (b.review?.rating ?? -1) - (a.review?.rating ?? -1) || b.id - a.id;
    const order = (a.created_at ?? '').localeCompare(b.created_at ?? '') || a.id - b.id;
    return filters.sort === 'oldest' ? order : -order;
  });
  return { filters, setFilters, filtered };
}

export default function BriefFilters({ inquiries, state }: { inquiries: Inquiry[]; state: ReturnType<typeof useBriefFilters> }) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const text = getAdminCopy(language);
  const { filters, setFilters, filtered } = state;
  const update = (key: keyof typeof defaults, value: string) => setFilters((previous) => ({ ...previous, [key]: value }));
  const select = (key: keyof typeof defaults, label: string, options: [string, string][]) => (
    <label>{label}<select value={filters[key]} onChange={(event) => update(key, event.target.value)}>
      {key !== 'sort' && <option value="">{text.all}</option>}
      {options.map(([value, title]) => <option value={value} key={value}>{title}</option>)}
    </select></label>
  );
  const presence: [string, string][] = [['yes', text.yes], ['no', text.no]];
  return <div className="account-panel admin-filters">
    <label className="admin-filter-search">{text.search}<input type="search" value={filters.search} onChange={(event) => update('search', event.target.value)} /></label>
    <div className="admin-filter-grid">
      {select('status', text.status, Object.entries(copy.admin.statuses))}
      {select('service', text.service, [...new Set(inquiries.map((inquiry) => inquiry.service_type))].sort().map((value) => [value, copy.services[value] ?? value]))}
      {select('account', text.account, [['registered', text.registered], ['guest', text.guest]])}
      {select('review', text.review, presence)}
      {select('rating', text.rating, ['1', '2', '3', '4', '4.5', '5'].map((value) => [value, `${value} / 5`]))}
      {select('budget', copy.admin.budget, presence)}
      {select('contact', copy.admin.contact, presence)}
      <label>{text.from}<input type="date" value={filters.from} max={filters.to || undefined} onChange={(event) => update('from', event.target.value)} /></label>
      <label>{text.to}<input type="date" value={filters.to} min={filters.from || undefined} onChange={(event) => update('to', event.target.value)} /></label>
      {select('sort', text.sort, [['newest', text.newest], ['oldest', text.oldest], ['highest', text.highest]])}
    </div>
    <div className="admin-filter-footer"><span role="status">{text.results}: {filtered.length} / {inquiries.length}</span><button type="button" className="btn btn-secondary btn-sm" onClick={() => setFilters(defaults)}>{text.reset}</button></div>
  </div>;
}
