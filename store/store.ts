import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CarItem = {
  id: string;
  name: string;
  unit_amount: number;
  images?: string[];
  description?: string;
  quantity: number;
};

type CarState = {
  cart: CarItem[];
  isOpen: boolean;
};

export const useCartStore = create<CarState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    {
      name: 'cart-store',
    }
  )
);
