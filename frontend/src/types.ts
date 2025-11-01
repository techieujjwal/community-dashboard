// src/types.ts
export interface Community {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: string; // or Firebase Timestamp type if you use one
}
