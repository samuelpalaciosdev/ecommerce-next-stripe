import type { Product } from '@prisma/client';

export type Order = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  paymentIntentId: string | null;
  products: Product[];
};
