export type ChatMessage = {
  id: number;
  sender_role: string;
  sender_name: string;
  body: string;
  created_at?: string | null;
  read_at?: string | null;
  edited_at?: string | null;
  can_manage?: boolean;
  attachments?: ImagePreview[];
  attachment_url?: string | null;
  attachment_name?: string | null;
};

export type InquiryChatModalProps = {
  inquiryId: number;
  ticket: string;
  title: string;
  endpoint: string;
  currentRole: 'admin' | 'user';
  clientName?: string;
  onClose: () => void;
  onRead?: () => void;
};

export type ImagePreview = {
  url: string;
  name: string;
};
