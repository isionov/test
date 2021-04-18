import React, { FC, memo } from "react";
import { BucketItemPtops, Names, Product } from "./interfaces";
import {
  getCount,
  getGroupId,
  getPrice,
  getProductId,
  getProductName,
} from "./utils";

type BucketItemWrapperProps = {
  product: Product;
  dollarRate: number | null;
  names: Names;
  Component: FC<BucketItemPtops>;
  selectedCount: number;
};

export const BucketItemWrapper: FC<BucketItemWrapperProps> = memo(
  ({ product, dollarRate, names, Component, selectedCount }) => {
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
        selectedCount={selectedCount}
      />
    );
  }
);
