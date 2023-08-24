import { stripe } from '@/lib/stripe';
import { prisma } from '@/utils/prisma';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Missing the stripe signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return res.status(400).send('Webhook error: ' + err);
  }

  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log('Payment intent was created');
      break;
    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === 'string') {
        const order = await prisma.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: 'Complete' },
        });
      }
      console.log('Charge was successful');
      break;
    default:
      console.log('Unhandled event type: ' + event.type);
  }

  res.json({ received: true });
}
