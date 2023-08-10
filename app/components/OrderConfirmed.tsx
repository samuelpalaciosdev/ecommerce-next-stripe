'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dance from '@/public/dance.gif';
import Link from 'next/link';
import { useCartStore } from '@/store/store';
import { useEffect } from 'react';

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  const handleCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout('cart');
    }, 1000);
    cartStore.toggleCart();
  };

  useEffect(() => {
    cartStore.setPaymentIntent('');
    cartStore.clearCart();
  }, []);
  return (
    <motion.div
      className='flex items-center justify-center my-12 text-gray-600'
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className='p-12 rounded-md text-center'>
        <h1 className='text-xl font-medium'>Your order has been placed ✅</h1>
        <h2 className='text-base my-4'>Check your email for the receipt</h2>
        <Image src={dance} alt='dancing fantastic mr fox' className='py-8' />

        <div className='flex items-center justify-center gap-6'>
          <Link href={'/dashboard'}>
            <button onClick={handleCheckoutOrder} className='font-medium text-white px-4 py-2 rounded-md bg-teal-600'>
              Check your order
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
