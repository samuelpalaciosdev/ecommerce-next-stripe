'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import PriceFormat from '@/utils/PriceFormat';
import { useCartStore } from '@/store/store';
import totalPrice from '@/utils/TotalPrice';

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();
  const formatedPrice = PriceFormat(totalPrice(cartStore.cart));

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout('success');
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='text-gray-600' id='payment-form'>
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
      <p className='mt-4 text-base font-bold'>Total: {formatedPrice}</p>
      <button
        className={`inline-block rounded-md text-white py-2 mt-4 w-full bg-primary disabled:opacity-25`}
        id='submit'
        disabled={isLoading || !stripe || !elements}
      >
        <span id='button-text'>
          {isLoading ? <span>Processing...</span> : <span>Pay now ❤</span>}
        </span>
      </button>
    </form>
  );
}
