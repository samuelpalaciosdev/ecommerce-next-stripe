'use client';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import { useCartStore } from '@/store/store';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

export default function Nav() {
  const { data: session, status } = useSession();
  const cartStore = useCartStore();
  return (
    <nav className='flex py-8 justify-between items-center'>
      <Link href={'/'}>
        <span className='text-2xl tracking-wider font-semibold text-neutral'>
          teckay
        </span>
      </Link>
      <ul className='flex items-center gap-12'>
        {/*Toggle cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className='flex items-center text-2xl relative cursor-pointer'
        >
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
        {!session?.user && (
          <li className='list-none bg-primary text-white py-2 px-4 rounded-md'>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {session?.user && (
          <li className='list-none'>
            <div className='dropdown dropdown-end cursor-pointer'>
              <Image
                className='rounded-full'
                src={session.user?.image as string}
                alt={session.user?.name as string}
                width={36}
                height={36}
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 space-y-4 shadow bg-base-100 rounded-box w-72'
              >
                <Link
                  href={'/dashboard'}
                  className='hover:bg-base-300 p-4 rounded-md'
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>

                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className='hover:bg-base-300 p-4 rounded-md'
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
