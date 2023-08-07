'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/store';

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore.isOpen);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}
