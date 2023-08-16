import Stripe from 'stripe';

export default async function getProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  const products = await stripe.products.list();

  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        metadata: product.metadata.features || '',
      };
    })
  );
  return productsWithPrices;
}
