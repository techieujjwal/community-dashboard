export interface Community {
  id: string;
  name: string;
  college?: string;
  work?: string;
  purpose?: string;
  isPrivate?: boolean;
  createdBy?: string;
  createdAt?: any;
  description?: string; // optional fallback for older data
}
