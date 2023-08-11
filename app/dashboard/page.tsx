import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import PriceFormat from '@/utils/PriceFormat';
import Image from 'next/image';

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  // Get the current user
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }

  // Get the user's orders
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });

  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  console.log(orders);
  const num = 5;

  return (
    <>
      {orders === null && (
        <h1 className='text-xl font-bold text-gray-600'>You must be logged in to view your orders</h1>
      )}
      {orders && orders.length === 0 && <h1 className='text-xl font-bold text-gray-600'>You have no orders</h1>}

      {orders && orders.length > 0 && (
        <div className='text-gray-600'>
          {orders.map((order) => (
            <div className='order' key={order.id}>
              <div className='grid grid-cols-12'>
                <div className='col-span-4'>
                  <h2 className='text-sm'>Order number:</h2>
                </div>
                <div className='col-span-6'>
                  {/* Only show the first 12 characters of the order id for aesthetic purposes */}
                  <span className='text-sm font-semibold'>{order.id.toUpperCase().slice(0, 12)}</span>
                </div>
                <div className='col-span-2'>
                  <p className='text-sm text-gray-700 lg:hidden'>
                    <span className='font-semibold'>{PriceFormat(order.amount)}</span>
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-12 py-2'>
                <div className='col-span-4'>
                  <h2 className='text-sm'>Order status:</h2>
                </div>
                <div className='col-span-8'>
                  <span className='text-sm'>{order.status}</span>
                </div>
              </div>
              <div className='grid grid-cols-12 py-2'>
                <div className='col-span-4'>
                  <p className='text-sm'>Date ordered: </p>
                </div>
                <div className='col-span-8'>
                  <p className='text-sm'>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {orders.length > 1 ? (
                <p className='text-sm py-2'>Items ordered:</p>
              ) : (
                <p className='text-sm py-2'>Item ordered:</p>
              )}

              {order.products.map((product) => (
                <div className='product py-4' key={product.id}>
                  <div className='grid grid-cols-12 py-2'>
                    <div className='col-span-4'>
                      <Image src={product.image!} alt={product.name} width={48} height={48} />
                    </div>
                    <div className='col-span-8'>
                      <h2 className='text-sm md:text-base font-semibold py-2'>{product.name}</h2>
                      <p className='text-sm'>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
