'use client';

import { useCartStore } from '@/store/store';
import { AddToCartType } from '@/types/AddToCart';

export default function AddToCart({ id, name, image, unit_amount, quantity }: AddToCartType) {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() => cartStore.addProduct({ id, name, image, unit_amount, quantity })}
        className='my-8  bg-teal-600 text-white py-2 px-4 rounded-md'
      >
        Add to cart
      </button>
    </>
  );
}
