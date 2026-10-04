# Frontend structure

`resources/css/app.css` is the stylesheet entry point. Keep its import order: later theme and page rules override earlier component rules.

The original stylesheet entry files remain as ordered import lists so existing imports and the cascade stay compatible:

- `header.css`: `components/site-header.css`, authentication and workspace styles in `pages/`, shared modal styles in `components/account-modal.css`, and language controls in `components/header-language.css`.
- `pages/brief-page.css`: form, calculator, advertising brief and responsive fields in `pages/brief/`.
- `pages/brief-detail-modal.css`: detail and review cards in `pages/modals/`, chat thread and composer in `pages/chat/`, followed by `pages/workspace-responsive.css`, `components/footer-layout.css` and mobile modal overrides.
- `responsive.css`: general breakpoints in `responsive/layout.css`, followed by extra small phone rules in `responsive/small-phone.css`.

Edit the leaf stylesheet for the relevant component. Preserve the import order when moving rules. Shared modal animation keyframes are in `components/account-modal.css`, imported through `header.css`.

UI translations live in `resources/js/content/ui/en.ts`, `uk.ts` and `ro.ts`. Their common types are in `ui/types.ts`; `uiTranslations.ts` retains the existing language and copy API. Legacy landing translations remain separate in `content/translations/`.

The shared user/admin chat is composed of:

- `Components/InquiryChatModal.tsx`: dialog, composer and message actions.
- `Components/InquiryChat/ChatMessageBubble.tsx`: message rendering, attachments and touch/keyboard interaction.
- `Components/InquiryChat/types.ts` and `format.ts`: payload types, date formatting and message grouping.
- `lib/useInquiryChatMessages.ts`: cancellable loading, polling and the initial unread boundary.
- `lib/useInquiryChatScroll.ts`: initial positioning, bottom following, composer sizing and floating dates.
- `lib/useInquiryChatActivity.ts`: presence and typing updates.

The messages response includes `first_unread_message_id`, captured before marking incoming messages read. The frontend retains this boundary for the current opening. It opens there when unread messages exist and at the bottom otherwise. The typing indicator belongs to the composer, so it remains visible while reading history; composer resizing scrolls only when already following the bottom.

Checks: `npm run typecheck`, `npm run test:frontend`, `npm run build`, and `php -d 'extension=pdo_sqlite' -d 'extension=sqlite3' -d 'extension=fileinfo' vendor/bin/phpunit` on the current Windows PHP setup.
