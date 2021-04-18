import React, { FC, memo } from "react";
import { ItemPtops, Names, Product } from "./interfaces";
import {
  getCount,
  getGroupId,
  getPrice,
  getProductId,
  getProductName,
} from "./utils";

type ProductItemWrapperProps = {
  product: Product;
  dollarRate: number | null;
  names: Names;
  Component: FC<ItemPtops>;
};

export const ProductItemWrapper: FC<ProductItemWrapperProps> = memo(
  ({ product, dollarRate, names, Component }) => {
    const groupId = getGroupId(product);
    const productId = getProductId(product);
    const count = getCount(product);
    const price = getPrice(product, dollarRate);

    const productName =
      (names && getProductName(names, productId, groupId)) ?? "";

    return (
      <Component
        productId={productId}
        key={productId}
        product={productName}
        count={count}
        price={price}
      />
    );
  }
);
