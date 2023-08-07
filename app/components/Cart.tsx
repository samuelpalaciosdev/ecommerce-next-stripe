'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/store';
import PriceFormat from '@/utils/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

export default function Cart() {
  const cartStore = useCartStore();
  /* Price string */
  const totalPrice = PriceFormat(cartStore.cart.reduce((acc, item) => acc + item.unit_amount! * item.quantity!, 0));
  /* Price number */
  const checkoutPrice = parseFloat(totalPrice.substring(1));

  return (
    <div onClick={() => cartStore.toggleCart()} className='fixed w-full h-screen left-0 top-0 bg-black/25'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'
      >
        <h1>{cartStore.cart.length > 0 ? `Here's your shopping list ` : ''}</h1>
        {cartStore.cart.map((item) => (
          <div className='flex py-4 gap-4' key={item.id}>
            <Image src={item.image} alt={item.name} width={96} height={96} className='aspect-square h-24' />
            <div className=''>
              <p className='text-base font-semi-bold text-gray-700'>{item.name}</p>
              {/* Update quantity of product */}
              <div className='flex gap-2 text-lg'>
                <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                  className='inline-block'
                >
                  <IoAddCircle className='text-teal-600' />
                </button>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      image: item.image,
                      name: item.name,
                      unit_amount: item.unit_amount,
                      quantity: item.quantity,
                    })
                  }
                  className='inline-block'
                >
                  <IoRemoveCircle className='text-teal-600 ' />
                </button>
              </div>
              <p className='text-sm text-gray-500'>{item.unit_amount && PriceFormat(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className='py-2 mt-4 bg-teal-600 w-full font-medium rounded-md text-white'>
          {checkoutPrice > 0 ? `Checkout - ${totalPrice}` : 'Your cart is empty'}
        </button>
      </div>
    </div>
  );
}
