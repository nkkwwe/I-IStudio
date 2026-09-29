import type { SiteLanguage } from '../../content/siteLanguage';

const labels = {
  search: ['Search ticket, client, email or brief', 'Пошук номера, клієнта, email або брифа', 'Caută număr, client, email sau brief'],
  all: ['All', 'Усі', 'Toate'],
  service: ['Service', 'Послуга', 'Serviciu'],
  status: ['Status', 'Статус', 'Stare'],
  account: ['Account', 'Акаунт', 'Cont'],
  registered: ['Registered', 'Зареєстрований', 'Înregistrat'],
  guest: ['Guest', 'Гість', 'Vizitator'],
  review: ['Review', 'Відгук', 'Recenzie'],
  yes: ['Present', 'Є', 'Prezent'],
  no: ['Missing', 'Немає', 'Lipsește'],
  rating: ['Minimum rating', 'Мінімальна оцінка', 'Evaluare minimă'],
  from: ['Created from', 'Створено від', 'Creat de la'],
  to: ['Created through', 'Створено до', 'Creat până la'],
  sort: ['Sort', 'Сортування', 'Sortare'],
  newest: ['Newest first', 'Спочатку нові', 'Cele mai noi'],
  oldest: ['Oldest first', 'Спочатку старі', 'Cele mai vechi'],
  highest: ['Highest rating', 'Найвища оцінка', 'Evaluare descrescătoare'],
  reset: ['Reset filters', 'Скинути фільтри', 'Resetează filtrele'],
  results: ['Matching briefs', 'Знайдені брифи', 'Briefuri găsite'],
  empty: ['No matching briefs. Try changing the filters.', 'Брифів не знайдено. Змініть фільтри.', 'Nu există rezultate. Modifică filtrele.'],
  loading: ['Loading user details…', 'Завантаження даних користувача…', 'Se încarcă detaliile…'],
  error: ['Unable to load details.', 'Не вдалося завантажити дані.', 'Detaliile nu au putut fi încărcate.'],
  retry: ['Try again', 'Спробувати ще', 'Încearcă din nou'],
  close: ['Close', 'Закрити', 'Închide'],
  profile: ['User details', 'Дані користувача', 'Detalii utilizator'],
  updated: ['Profile updated', 'Профіль оновлено', 'Profil actualizat'],
  verified: ['Email verified', 'Email підтверджено', 'Email verificat'],
  login: ['Sign-in method', 'Спосіб входу', 'Metodă de autentificare'],
  role: ['Role', 'Роль', 'Rol'],
  admin: ['Administrator', 'Адміністратор', 'Administrator'],
  user: ['User', 'Користувач', 'Utilizator'],
  noReview: ['No review yet', 'Відгуку ще немає', 'Fără recenzie'],
} as const;

export function getAdminCopy(language: SiteLanguage) {
  const index = language === 'uk' ? 1 : language === 'ro' ? 2 : 0;
  return Object.fromEntries(Object.entries(labels).map(([key, values]) => [key, values[index]])) as Record<keyof typeof labels, string>;
}
