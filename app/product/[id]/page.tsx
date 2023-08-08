import { searchParamsType } from '@/types/SearchParamsType';
import PriceFormat from '@/utils/PriceFormat';
import Image from 'next/image';
import AddToCart from './AddToCart';

export default function Product({ searchParams }: searchParamsType) {
  const { id, name, description, features, unit_amount, image } = searchParams;
  return (
    <div className='flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-24 p-4 lg:p-8 text-gray-700'>
      <Image src={image} alt={name} width={320} height={320} />
      <div className=''>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm mt-2'>{description}</p>

        <div className='flex gap-2 mt-4'>
          <p className='font-semibold text-teal-700'>{unit_amount !== null ? PriceFormat(unit_amount) : 'N/A'}</p>
        </div>
        <AddToCart {...searchParams} />
      </div>
    </div>
  );
}
