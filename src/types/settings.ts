export interface UserDetails {
  _id?: string;
  name?: string;
  email?: string;
  admin?: boolean;
  flagged?: boolean;
  /** Set when the account is provisioned/managed by auth.arkynox.com. */
  externalId?: string | null;
  tickets?: number;
  closedTickets?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SettingsProps {
  details: UserDetails | null;
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile?: boolean;
}

export interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Message {
  type: 'success' | 'error' | '';
  text: string;
}
