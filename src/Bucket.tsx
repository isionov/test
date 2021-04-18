import { keys } from "ramda";
import React, { FC, useContext } from "react";

import { BucketContext } from "./bucketContext";
import { BucketItem } from "./BucketItem";
import { BucketItemWrapper } from "./BucketItemWrapper";
import { Names, Product } from "./interfaces";
import { getProductId, getTotalPrice, joinBucket } from "./utils";

type BucketProps = {
  products: Product[];
  names: Names;
  dollarRate: number;
};

export const Bucket: FC<BucketProps> = ({ products, names, dollarRate }) => {
  const { bucket } = useContext(BucketContext);

  const joinedBucket = joinBucket(bucket);

  return (
    <div>
      <h3>Корзина</h3>
      {keys(joinedBucket).map((productId) => {
        const product = products.find((product) => {
          return getProductId(product).toString() === productId;
        });
        return (
          product && (
            <div>
              <BucketItemWrapper
                key={productId}
                product={product}
                dollarRate={dollarRate}
                names={names}
                selectedCount={joinedBucket[productId]}
                Component={BucketItem}
              />
            </div>
          )
        );
      })}
      <h4>Всего: {`${getTotalPrice(bucket, products, dollarRate)}`}</h4>
    </div>
  );
};
