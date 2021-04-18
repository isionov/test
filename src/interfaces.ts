export type Names = {
  [key in string | number]: Group;
};

export type Group = {
  G: string;
  B: GroupProducts;
};

export type GroupProducts = {
  [key in string | number]: GroupProduct;
};

export type GroupProduct = {
  N: string;
  T: number;
};

export type ProductId = string | number;
export type GroupId = string | number;

export type Product = {
  C: number;
  G: GroupId;
  P: number;
  T: ProductId;
};

export type Products = {
  Error: string;
  Id: number;
  Success: boolean;
  Value: {
    Goods: Product[];
  };
};

export type ItemPtops = {
  price: number | string;
  productId: number | string;
  product: string;
  count: number;
};

export type BucketItemPtops = {
  price: number;
  productId: number | string;
  product: string;
  count: number;
  selectedCount: number;
};
