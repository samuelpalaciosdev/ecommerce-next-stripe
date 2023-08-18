import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddToCartType } from '@/types/AddToCart';

type CartState = {
  cart: AddToCartType[];
  isOpen: boolean;
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddToCartType) => void;
  removeProduct: (item: AddToCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (value: string) => void;
  onCheckout: string;
  setCheckout: (value: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: '',
      onCheckout: 'cart',
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
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
          // Check if item exists and reduce its quantity by 1
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
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
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (value) => set((state) => ({ paymentIntent: value })),
      setCheckout: (value) => set((state) => ({ onCheckout: value })),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    { name: 'cart-store' }
  )
);
