import Image from 'next/image';
import Product from './components/Product';
import getProducts from '@/utils/getProducts';

export default async function Home() {
  const products = await getProducts();
  // console.log(products);
  return (
    <main className='grid grid-cols-fluid gap-12'>
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}
