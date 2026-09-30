import landing from './startupLanding.json';
import schema from './serviceBriefs.json';

export { landing, schema };
export const translate = (value, language = 'en') => Array.isArray(value) ? value[Math.max(0, landing.languages.indexOf(language))] : value;
export const serviceLabel = (id, language) => translate(landing.services.find((service) => service.id === id)?.name || landing.advice, language);
export function visibleField(field, service, answers) {
  if (field.services && !field.services.includes(service)) return false;
  if (field.exclude?.includes(service)) return false;
  if (!field.when) return true;
  return field.when.filled ? Boolean(answers[field.when.field]) : field.when.values.includes(answers[field.when.field]);
}
export function getStartupBriefRows(data, language) {
  return Object.entries(schema.fields)
    .filter(([key]) => data[key] !== undefined && data[key] !== null && data[key] !== '')
    .map(([key, field]) => ({ label: translate(field.label, language), value: translate(schema.options[data[key]] || data[key], language) }));
}
