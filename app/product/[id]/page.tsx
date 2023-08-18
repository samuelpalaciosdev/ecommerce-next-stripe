import { SearchParamsType } from '@/types/SearchParamsType';
import PriceFormat from '@/utils/PriceFormat';
import Image from 'next/image';
import AddToCart from './AddToCart';

export default async function Product({ searchParams }: SearchParamsType) {
  const { id, name, description, features, unit_amount, image } = searchParams;
  return (
    <div className='flex flex-col lg:flex-row items-center gap-10 lg:gap-24 p-4 '>
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className='w-80 h-72 object-contain'
        priority={true}
      />
      <div className='product-info text-gray-600 max-w-xl'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm mt-2'>{description}</p>

        <p className='font-semibold text-primary mt-4'>
          {unit_amount !== null ? PriceFormat(unit_amount) : 'N/A'}
        </p>
        <AddToCart {...searchParams} />
      </div>
    </div>
  );
}
