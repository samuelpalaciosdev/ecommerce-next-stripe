import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddToCartType } from '@/types/AddToCart';

type CarState = {
  cart: AddToCartType[];
  isOpen: boolean;
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddToCartType) => void;
  removeProduct: (item: AddToCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
};

export const useCartStore = create<CarState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: '',
      onCheckout: 'cart',
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set((state) => ({ cart: [] })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          // If item already exists in cart, update quantity
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
            // If item does not exist in cart, add it
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          // If item quantity is greater than 1, reduce quantity by 1
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            // Remove item from cart
            const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id);
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (paymentIntent) => set((state) => ({ paymentIntent })),
      setCheckout: (checkout) => set((state) => ({ onCheckout: checkout })),
    }),
    {
      name: 'cart-store',
    }
  )
);
