import {
  Names,
  GroupProducts,
  Group,
  Product,
  ProductId,
  GroupId,
} from "./interfaces";
import { compose, groupBy, toPairs, pipe } from "ramda";

export const getGroup = (id: GroupId) => (names: Names) => {
  return names[id];
};

export const getGroupName = (group: Group) => {
  return group.G ?? "";
};

export const getGroupProducts = (group: Group) => {
  return group.B ?? "";
};

export const getProductNameById = (id: ProductId) => (
  products: GroupProducts
) => {
  return products[id]?.N ?? "";
};

export const getGroupNameById = (names: Names, idG: GroupId) =>
  compose(getGroupName, getGroup(idG))(names);

export const getProductName = (names: Names, idP: ProductId, idG: GroupId) =>
  compose(getProductNameById(idP), getGroupProducts, getGroup(idG))(names);

export const getProductId = (product: Product) => product.T;
export const getGroupId = (product: Product) => product.G;
export const getCount = (product: Product) => product.P;
export const getPrice = (product: Product, dollarRate: number | null) =>
  dollarRate ? Math.round(product.C * dollarRate) : NaN;

export const splitByGroups = (products: Product[]): [string, Product[]][] => {
  return pipe(
    groupBy((product: Product) => getGroupId(product).toString()),
    (groups) => toPairs(groups)
  )(products);
};

export const joinBucket = (ids: (number | string)[]) => {
  return ids.reduce((acc: Record<string, number>, id: string | number) => {
    if (!acc[id]) {
      acc[id] = 1;
    } else {
      acc[id] += 1;
    }

    return acc;
  }, {});
};

export const getTotalPrice = (
  bucket: (string | number)[],
  products: Product[],
  dollarRate: number
) => {
  return bucket.reduce((acc: number, productId) => {
    const product = products.find(
      (product) => productId === getProductId(product)
    );
    const price = product && getPrice(product, dollarRate);
    return acc + (price ?? 0);
  }, 0);
};
