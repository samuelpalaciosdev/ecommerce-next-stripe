type Params = {
  id: string;
};

type SearchParams = {
  id: string;
  name: string;
  description: string | null;
  features: string;
  unit_amount: number | null;
  image: string;
};

export type SearchParamsType = {
  params: Params;
  searchParams: SearchParams;
};
