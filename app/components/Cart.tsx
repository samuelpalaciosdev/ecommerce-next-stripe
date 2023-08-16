'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/store';
import PriceFormat from '@/utils/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import Checkout from './Checkout';
import totalPrice from '@/utils/TotalPrice';
import OrderConfirmed from './OrderConfirmed';

export default function Cart() {
  const cartStore = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className='fixed w-full h-screen left-0 top-0 bg-black/25'
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-full lg:w-2/5 h-screen p-12 overflow-y-scroll text-gray-700'
      >
        {cartStore.onCheckout === 'cart' && (
          <div className='text-sm font-semibold text-gray-600 pb-4'>
            <button onClick={() => cartStore.toggleCart()}>Back to store</button>
          </div>
        )}
        {cartStore.onCheckout === 'checkout' && (
          <div className='text-sm font-semibold text-gray-600 pb-4'>
            <button onClick={() => cartStore.setCheckout('cart')}>Check your cart</button>
          </div>
        )}

        {/* Cart items */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout className='flex py-4 gap-4' key={item.id}>
                <Image src={item.image} alt={item.name} width={96} height={96} className='aspect-square h-24' />
                <motion.div layout>
                  <p className='text-base font-semi-bold text-gray-700'>{item.name}</p>
                  {/* Update quantity of product */}
                  <motion.div className='flex gap-2 text-lg'>
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
                      <IoAddCircle className='text-primary' />
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
                      <IoRemoveCircle className='text-primary ' />
                    </button>
                  </motion.div>
                  <p className='text-sm text-gray-500'>{item.unit_amount && PriceFormat(item.unit_amount)}</p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}

        {/* Checkout button */}
        <motion.div layout>
          {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
            <motion.div layout>
              {/* Total price */}
              <p className='text-base font-semibold text-gray-700'>Total: {PriceFormat(totalPrice(cartStore.cart))}</p>
              <button
                onClick={() => cartStore.setCheckout('checkout')}
                className='py-2 mt-4 bg-primary w-full font-medium rounded-md text-white'
              >
                Checkout
              </button>
            </motion.div>
          ) : null}
        </motion.div>
        {/* Checkout form*/}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className='flex flex-col items-center pt-56 opacity-75'
            >
              <p className='text-2xl font-medium'>Your cart is empty :(</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
