'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/store';
import { AddToCartType } from '@/types/AddToCart';

export default function AddToCart({ id, name, image, unit_amount, quantity }: AddToCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button onClick={handleAddToCart} disabled={added} className='my-4 btn btn-primary w-full lg:w-auto'>
        {added ? 'Adding to cart😎' : 'Add to cart'}
      </button>
    </>
  );
}
