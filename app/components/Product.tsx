import { ProductType } from '@/types/ProductType';
import PriceFormat from '@/utils/PriceFormat';
import Image from 'next/image';
import Link from 'next/link';

export default function Product({ id, name, description, metadata, unit_amount, image }: ProductType) {
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { id, name, description, metadata, unit_amount, image },
      }}
    >
      <div>
        <Image src={image} alt={name} height={300} width={300} className='w-full h-72 object-contain' />
        <div className='font-medium text-gray-700 py-2'>
          <h1 className='text-lg font-semibold'>{name}</h1>
          <span className='text-base text-primary'>
            Price: {unit_amount !== null ? PriceFormat(unit_amount) : 'N/A'}
          </span>
        </div>
      </div>
    </Link>
  );
}
