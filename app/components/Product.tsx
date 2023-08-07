import { ProductType } from '@/types/ProductType';
import PriceFormat from '@/utils/PriceFormat';
import Image from 'next/image';

export default function Product({ name, description, prices, image, currency, metadata }: ProductType) {
  return (
    <div>
      <Image src={image} alt={name} height={300} width={300} className='w-full h-72 object-contain' />
      <div className='font-medium'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <span className='text-primary text-lg'>Price: {prices !== null ? PriceFormat(prices) : 'N/A'}</span>
      </div>
    </div>
  );
}
