import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { ProductType } from '@/types/ProductType';
import { prisma } from '@/utils/prisma';
import totalPrice from '@/utils/TotalPrice';
import { stripe } from '@/lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get user
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: 'Not logged in' });
    return;
  }
  //Extract the data from the body
  const { items, payment_intent_id } = req.body;
  const total = totalPrice(items);
  //Create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total,
    currency: 'usd',
    status: 'Pending',
    paymentIntentId: payment_intent_id,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  //Check if the payment intent exists just update the order
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      //Fetch order with product ids
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: updated_intent.id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { paymentIntentId: updated_intent.id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                image: item.image,
                quantity: item.quantity,
              })),
            },
          },
        }),
      ]);

      if (!existing_order) {
        res.status(400).json({ message: 'Invalid Payment Intent' });
      }
      res.status(200).json({ paymentIntent: updated_intent });
      return;
    }
  } else {
    //Create a new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice(items),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }
}
