export {};

declare global {
  interface Window {
    translations: Record<string, Record<string, string>>;
    solutionsData: Record<string, Record<string, unknown>>;
    serviceManagerMap: Record<string, Record<string, { serviceName: string }>>;
    setLanguage?: (language: string) => void;
    renderActiveSolution?: () => void;
    preselectService?: (serviceKey: string, openPage?: boolean) => void;
    openInquiryPage?: (serviceKey?: string) => void;
  }
}
