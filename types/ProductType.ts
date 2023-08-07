export type ProductType = {
  id: string;
  name: string;
  description: string | null;
  unit_amount: number | null;
  quantity?: number | 1;
  image: string;
  metadata: string;
};
