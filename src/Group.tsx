import React, { FC, memo } from "react";
import { Names, Product } from "./interfaces";
import { ProductItemWrapper } from "./ProductItemWrapper";

import { ProductsItem } from "./ProductsItem";
import { getGroupNameById, getProductId } from "./utils";

type GroupProps = {
  groupId: string;
  products: Product[];
  names: Names;
  dollarRate: number | null;
};

export const Group: FC<GroupProps> = memo(
  ({ groupId, products, names, dollarRate }) => {
    const groupName = (names && getGroupNameById(names, groupId)) ?? "";

    return (
      <div>
        <h3>{groupName}</h3>
        {products.map((product) => {
          const productId = getProductId(product);

          return (
            <ProductItemWrapper
              key={productId}
              product={product}
              dollarRate={dollarRate}
              names={names}
              Component={ProductsItem}
            />
          );
        })}
      </div>
    );
  }
);
