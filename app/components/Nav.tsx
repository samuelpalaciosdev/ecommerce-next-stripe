'use client';
import { sign } from 'crypto';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import { useCartStore } from '@/store/store';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <nav className='flex py-8 justify-between items-center'>
      <Link href={'/'}>
        <span className='text-2xl font-semibold text-blue-500'>Logo</span>
      </Link>
      <ul className='flex items-center gap-12'>
        {/*Toggle cart */}
        <li onClick={() => cartStore.toggleCart()} className='flex items-center text-2xl relative cursor-pointer'>
          <AiFillShopping />
          {/* Show cart items count */}
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                className='flex items-center justify-center bg-primary text-white text-sm font-semibold w-5 h-5 rounded-full absolute left-4 bottom-4'
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {!user && (
          <li className='list-none bg-primary text-white py-2 px-4 rounded-md'>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <Link href={'/dashboard'}>
            <li className='list-none'>
              <Image
                className='rounded-full'
                src={user?.image as string}
                alt={user?.name as string}
                width={36}
                height={36}
              />
            </li>
          </Link>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
