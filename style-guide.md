# I&I Studio — Style Guide

Единый источник правды для визуального языка Flow / I&I Studio. Все новые страницы, компоненты и состояния должны использовать эти правила и существующие CSS-переменные. Если задача явно не требует другого, сохраняй светлую и тёмную темы, текущую сетку и визуальную систему.

## 0. Контекст проекта

- **Продукт:** сайт цифровой студии I&I Studio: услуги, кейсы, заявки, личный кабинет и административные экраны.
- **Характер:** минималистичный, технологичный, аккуратный, премиальный без декоративной перегрузки.
- **Визуальная метафора:** Swiss / International typography + Corporate Tech.
- **Основной принцип:** много воздуха, сильная типографика, монохромная база, точечные акценты, чёткие границы и умеренная глубина.
- **Базовая единица:** `1rem = 16px`.
- **Темы:** светлая по умолчанию; тёмная включается через `html[data-theme="dark"]`.

### Обязательные правила для AI-ассистентов

1. Сначала переиспользуй существующие токены и компоненты, затем добавляй новые.
2. Не вставляй произвольные HEX-коды, радиусы и тени, если подходящий токен уже существует.
3. Не меняй стили соседних экранов без прямой необходимости.
4. Любой интерактивный элемент должен иметь состояния `hover`, `focus-visible`, `active` и `disabled`, если они применимы.
5. Не убирай видимый фокус без равноценной замены.
6. Логотипы и иконки должны быть настоящими ассетами или библиотечными иконками, а не текстовыми символами, emoji или CSS-рисунками.
7. Все новые решения проверяй в обеих темах и на мобильной ширине.

## 1. Цветовая палитра

Названия токенов используют kebab-case. В интерфейсе применяй семантические роли, а не названия вроде «серый-2».

### Базовые цвета

| Токен | Светлая тема | Тёмная тема | Использование |
|---|---:|---:|---|
| `--bg-body` | `#ffffff` | `#101113` | Основной фон страницы. |
| `--bg-surface` | `#ffffff` | `#17181b` | Карточки, панели, поля и поверхности поверх фона. |
| `--bg-subtle` | `#fafafa` | `#1b1d21` | Мягкий фон секций и hover-состояний. |
| `--bg-panel` | `#f4f4f5` | `#23262b` | Вторичная панель, muted-кнопка, выделенная область. |
| `--bg-dark` | `#09090b` | `#070708` | Контрастный тёмный блок или overlay-основа. |
| `--border-light` | `#f4f4f5` | `#292c32` | Очень мягкие разделители. |
| `--border` | `#e4e4e7` | `#363a42` | Обычная граница карточек, полей и кнопок. |
| `--border-strong` | `#d4d4d8` | `#4b515b` | Активная или более заметная граница. |
| `--text-primary` | `#09090b` | `#f4f4f5` | Заголовки, основной текст, важные значения. |
| `--text-secondary` | `#52525b` | `#b6bac2` | Описания, вторичные подписи и пояснения. |
| `--text-muted` | `#71717a` | `#9298a2` | Метки, metadata, неакцентные подписи. |
| `--text-dim` | `#a1a1aa` | `#70757f` | Неактивный и вспомогательный текст. |
| `--text-inverse` | `#ffffff` | `#09090b` | Текст на контрастной кнопке или тёмном фоне. |

### Акценты и состояния

| Токен | HEX | Использование |
|---|---:|---|
| `--accent-black` | `#09090b` / `#f4f4f5` в dark | Основной контрастный CTA и сильный акцент. |
| `--accent-blue` | `#2563eb` / `#c4c7cd` в dark | Ссылки, focus-ring и информационный акцент. |
| `--accent-emerald` | `#10b981` | Успешное состояние, positive-метрики и подтверждение. |
| `--status-danger` | `#dc3f4f` | Ошибка, критическое уведомление, unread-бейдж. |
| `--status-danger-text` | `#ef4444` / `#ef6b6b` в dark | Текст ошибки и destructive-действия. |
| `--status-warning` | `#facc15` | Предупреждение и внимание. Используй экономно. |

### Правила контраста и состояний

- Основной текст размещай только на `--bg-body`, `--bg-surface` или `--bg-panel` с достаточным контрастом.
- Hover не должен менять смысл цвета: используй соседний фон/границу из той же тональной группы.
- Active/selected состояние обозначай изменением фона и/или границы, а не только цветом текста.
- Focus-visible: используй заметный контур толщиной минимум `3px` с отступом `3px`.
- Ошибки не передавай только цветом: добавляй текст или иконку с понятным сообщением.

## 2. Типографика

### Семейства и веса

| Токен | Значение | Назначение |
|---|---|---|
| `--font-sans` | `Inter`, системные sans-serif fallback | Основной текст, формы, кнопки и интерфейс. |
| `--font-display` | `Space Grotesk`, затем `Inter` | H1–H3, крупные числа и брендовые заголовки. |
| `--font-mono` | `Space Grotesk`, затем ui-monospace | Технические метки, eyebrow, короткие статусы. |

Используй веса `400`, `500`, `600`, `700`, `800`, `900` только там, где это оправдано и поддерживается выбранным шрифтом.

### Размеры и межстрочные интервалы

| Роль | `font-size` | В px | `line-height` | Рекомендация |
|---|---:|---:|---:|---|
| `h1` | `clamp(2.5rem, 6vw, 4.5rem)` | 40–72 | `0.98` | Главный заголовок страницы или hero. |
| `h2` | `clamp(2rem, 4vw, 2.75rem)` | 32–44 | `1.05` | Заголовок секции. |
| `h3` | `1.5rem` | 24 | `1.2` | Заголовок карточки или подраздела. |
| `body-large` | `1.0625rem` | 17 | `1.6` | Вводный текст и hero-description. |
| `body-medium` | `1rem` | 16 | `1.6` | Основной текст интерфейса. |
| `body-small` | `0.875rem` | 14 | `1.5` | Подписи, metadata, вторичный текст. |
| `label` | `0.75rem` | 12 | `1.3` | Короткие UI-метки, uppercase допускается. |

### Типографические правила

- Заголовки используют `--font-display`, вес `700`, отрицательный tracking в диапазоне `-0.045em`…`-0.02em`.
- Основной текст использует `--font-sans`, цвет `--text-secondary` или `--text-primary`.
- Не используй длинные строки: максимальная ширина текстового блока — около `65ch`.
- Uppercase применяй только к коротким eyebrow/label; используй `letter-spacing: 0.08em`–`0.13em`.
- Для адаптивных заголовков предпочитай `clamp()`, а не резкие breakpoint-переключения.

## 3. Сетка и отступы

### Контейнеры

- Максимальная ширина основного контента: `1200px`.
- Базовые горизонтальные поля desktop: `24px`.
- Базовые горизонтальные поля mobile: `16px`.
- Центрируй основной контейнер через `width: 100%`, `max-width` и `margin-inline: auto`.
- Для крупных секций используй grid/flex; не позиционируй контент абсолютными координатами.

### Spacing scale на базе 4px

| Токен | Значение | В px | Типичное применение |
|---|---:|---:|---|
| `--space-0` | `0rem` | 0 | Сброс. |
| `--space-1` | `0.25rem` | 4 | Микроотступ, icon-gap. |
| `--space-2` | `0.5rem` | 8 | Тесная группа, label-gap. |
| `--space-3` | `0.75rem` | 12 | Внутренний gap компактных контролов. |
| `--space-4` | `1rem` | 16 | Базовый gap и padding. |
| `--space-5` | `1.25rem` | 20 | Отступ между элементами группы. |
| `--space-6` | `1.5rem` | 24 | Padding карточки малого размера. |
| `--space-8` | `2rem` | 32 | Отступ между блоками. |
| `--space-10` | `2.5rem` | 40 | Крупный внутренний отступ. |
| `--space-12` | `3rem` | 48 | Отступ секции или auth-карточки. |
| `--space-16` | `4rem` | 64 | Вертикальный ритм секций. |
| `--space-20` | `5rem` | 80 | Пространство между крупными секциями. |
| `--space-24` | `6rem` | 96 | Большой hero/section spacing. |

Используй ближайшее значение шкалы. Произвольные значения вроде `13px` допустимы только для оптической коррекции, которую нельзя выразить токеном.

## 4. Компоненты и скругления

### Radius tokens

| Токен | Значение | Использование |
|---|---:|---|
| `--radius-sm` | `10px` | Небольшие контролы, компактные карточки и status-плашки. |
| `--radius-inner` | `16px` | Поля, secondary-кнопки и внутренние элементы карточек. |
| `--radius-card` | `24px` | Основные карточки и крупные панели. |
| `--radius-auth` | `26px` | Карточка входа/регистрации. |
| `--radius-modal` | `22px` | Модальные окна и dialog-поверхности. |
| `--radius-pill` | `9999px` | CTA, теги, переключатели и language controls. |
| `--radius-circle` | `50%` | Круглые иконки, аватары и badge. |

### Кнопки

- Primary: контрастный фон `--btn-primary-bg`, текст `--btn-primary-text`, `font-weight: 700`.
- Secondary: фон `--btn-secondary-bg`, граница `--btn-secondary-border`, текст `--btn-secondary-text`.
- Минимальная высота основной кнопки: `48px`; touch-target не меньше `44px`.
- Горизонтальный padding: минимум `16px`, для крупных CTA — `20px`–`24px`.
- Основные CTA используют `--radius-pill`; кнопки внутри плотных карточек могут использовать `--radius-inner`.
- Hover: меняй только фон, границу, цвет или тень. Подъём кнопки, `transform: translateY(...)` и любое геометрическое движение кнопок запрещены.
- Для secondary-кнопок и навигационных вкладок hover должен оставаться в той же тональной группе; не превращай их в инверсную белую/чёрную кнопку.

### Карточки и панели

- Фон: `--bg-surface`.
- Граница: `1px solid var(--border)`.
- Радиус: `--radius-card`; для auth-карточки — `--radius-auth`.
- Тень: `--shadow-card`.
- Внутренний padding: обычно `--space-6` или `--space-8`.

### Поля и формы

- Фон: `--bg-surface` или `--bg-panel`.
- Граница по умолчанию: `--border`.
- Hover/focus: `--border-strong` и видимый focus-ring.
- Радиус: `--radius-inner`.
- Label располагай выше поля с gap `--space-2`.
- Ошибку показывай рядом с полем, а не только в виде красной границы.

### Модальные окна

- Backdrop: `rgba(7, 7, 8, 0.64)`.
- Поверхность: `--bg-surface`.
- Радиус: `--radius-modal`.
- Тень: `--shadow-modal`.
- Закрытие по `Escape` и клику по backdrop должно сохраняться, если это не конфликтует с действием пользователя.

## 5. Тени и elevation

Используй тени сдержанно: интерфейс строится на границах и контрасте поверхностей, а не на сильном blur.

| Токен | Светлая тема | Тёмная тема | Использование |
|---|---|---|---|
| `--shadow-none` | `none` | `none` | Плоские элементы. |
| `--shadow-subtle` | `0 1px 3px -1px rgba(0,0,0,.02), 0 6px 16px -2px rgba(0,0,0,.03)` | `0 1px 3px rgba(0,0,0,.28), 0 8px 24px -8px rgba(0,0,0,.45)` | Лёгкий hover и небольшие поверхности. |
| `--shadow-card` | `0 2px 10px -2px rgba(0,0,0,.03), 0 10px 24px -4px rgba(0,0,0,.04)` | `0 2px 10px -2px rgba(0,0,0,.35), 0 12px 28px -8px rgba(0,0,0,.4)` | Карточки и панели. |
| `--shadow-hover` | `0 12px 32px -4px rgba(0,0,0,.08)` | `0 16px 36px -10px rgba(0,0,0,.55)` | Поднятое интерактивное состояние. |
| `--shadow-modal` | `0 24px 80px rgba(0,0,0,.26)` | `0 24px 80px rgba(0,0,0,.55)` | Modal/dialog поверх контента. |

## 6. Motion и доступность

- Базовая длительность: `200ms`.
- Используй `ease` или `cubic-bezier(0.22, 1, 0.36, 1)` только для opacity, цвета, границы и тени. Lift-анимации и `translateY` для кнопок запрещены.
- Анимируй только `transform`, `opacity`, `background-color`, `border-color` и `box-shadow`.
- Уважай `prefers-reduced-motion: reduce` и отключай необязательные переходы.
- Не используй hover как единственный способ раскрыть важную информацию.

## 7. Готовый CSS-токен слой

Скопируй этот блок в глобальный stylesheet. В проекте тёмная тема активируется атрибутом `data-theme` на элементе `html`.

```css
:root {
  /* Colors — light theme */
  --bg-body: #ffffff;
  --bg-surface: #ffffff;
  --bg-subtle: #fafafa;
  --bg-panel: #f4f4f5;
  --bg-dark: #09090b;

  --border-light: #f4f4f5;
  --border: #e4e4e7;
  --border-strong: #d4d4d8;
  --border-dark: #09090b;

  --text-primary: #09090b;
  --text-secondary: #52525b;
  --text-muted: #71717a;
  --text-dim: #a1a1aa;
  --text-inverse: #ffffff;

  --accent-black: #09090b;
  --accent-blue: #2563eb;
  --accent-emerald: #10b981;
  --status-danger: #dc3f4f;
  --status-danger-text: #ef4444;
  --status-warning: #facc15;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-display: 'Space Grotesk', 'Inter', -apple-system, sans-serif;
  --font-mono: 'Space Grotesk', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-size-base: 1rem;
  --line-height-body: 1.6;

  /* Spacing — 4px base */
  --space-0: 0rem;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Radius */
  --radius-sm: 10px;
  --radius-inner: 16px;
  --radius-card: 24px;
  --radius-auth: 26px;
  --radius-modal: 22px;
  --radius-pill: 9999px;
  --radius-circle: 50%;

  /* Elevation */
  --shadow-none: none;
  --shadow-subtle: 0 1px 3px -1px rgba(0, 0, 0, 0.02), 0 6px 16px -2px rgba(0, 0, 0, 0.03);
  --shadow-card: 0 2px 10px -2px rgba(0, 0, 0, 0.03), 0 10px 24px -4px rgba(0, 0, 0, 0.04);
  --shadow-hover: 0 12px 32px -4px rgba(0, 0, 0, 0.08);
  --shadow-modal: 0 24px 80px rgba(0, 0, 0, 0.26);

  /* Components */
  --btn-primary-bg: var(--accent-black);
  --btn-primary-border: var(--accent-black);
  --btn-primary-text: var(--text-inverse);
  --btn-primary-hover-bg: #27272a;
  --btn-primary-hover-border: #27272a;
  --btn-primary-hover-text: var(--text-inverse);
  --btn-secondary-bg: var(--bg-surface);
  --btn-secondary-border: var(--border);
  --btn-secondary-text: var(--text-primary);
  --btn-secondary-hover-bg: var(--bg-panel);
  --btn-secondary-hover-border: var(--border-strong);
  --btn-secondary-hover-text: var(--text-primary);

  --motion-fast: 120ms;
  --motion-base: 200ms;
  --motion-slow: 320ms;
  --ease-standard: ease;
  --ease-emphasis: cubic-bezier(0.22, 1, 0.36, 1);
}

html[data-theme="dark"] {
  color-scheme: dark;

  --bg-body: #101113;
  --bg-surface: #17181b;
  --bg-subtle: #1b1d21;
  --bg-panel: #23262b;
  --bg-dark: #070708;

  --border-light: #292c32;
  --border: #363a42;
  --border-strong: #4b515b;
  --border-dark: #e4e4e7;

  --text-primary: #f4f4f5;
  --text-secondary: #b6bac2;
  --text-muted: #9298a2;
  --text-dim: #70757f;
  --text-inverse: #09090b;

  --accent-black: #f4f4f5;
  --accent-blue: #c4c7cd;

  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.28), 0 8px 24px -8px rgba(0, 0, 0, 0.45);
  --shadow-card: 0 2px 10px -2px rgba(0, 0, 0, 0.35), 0 12px 28px -8px rgba(0, 0, 0, 0.4);
  --shadow-hover: 0 16px 36px -10px rgba(0, 0, 0, 0.55);
  --shadow-modal: 0 24px 80px rgba(0, 0, 0, 0.55);

  --btn-primary-bg: var(--accent-black);
  --btn-primary-border: var(--accent-black);
  --btn-primary-text: var(--text-inverse);
  --btn-primary-hover-bg: #c4c7cd;
  --btn-primary-hover-border: #c4c7cd;
  --btn-primary-hover-text: var(--text-inverse);
  --btn-secondary-bg: var(--bg-panel);
  --btn-secondary-border: var(--border-strong);
  --btn-secondary-text: var(--text-primary);
  --btn-secondary-hover-bg: var(--bg-subtle);
  --btn-secondary-hover-border: var(--border-strong);
  --btn-secondary-hover-text: var(--text-primary);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```
