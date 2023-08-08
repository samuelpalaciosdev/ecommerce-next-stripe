import { AddToCartType } from '@/types/AddToCart';
import { ProductType } from '@/types/ProductType';

const totalPrice = (items: AddToCartType[]): number => {
  return items.reduce((acc, item) => acc + item.unit_amount! * item.quantity!, 0);
};

export default totalPrice;
