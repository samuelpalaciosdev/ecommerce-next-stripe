'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/store';
import PriceFormat from '@/utils/PriceFormat';

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore.isOpen);

  return (
    <div onClick={() => cartStore.toggleCart()} className='fixed w-full h-screen left-0 top-0 bg-black/25'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'
      >
        <h1>Here's your shopping list </h1>
        {cartStore.cart.map((item) => (
          <div className='flex py-4 gap-4' key={item.id}>
            <Image src={item.image} alt={item.name} width={96} height={96} className='aspect-square h-24' />
            <div className=''>
              <p className='text-base font-semi-bold text-gray-700'>{item.name}</p>
              <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
              <p className='text-sm text-gray-500'>{item.unit_amount && PriceFormat(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className='py-2 mt-4 bg-teal-600 w-full rounded-md text-white'>Checkout</button>
      </div>
    </div>
  );
}
