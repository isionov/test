import { FC, memo, useContext, useRef } from "react";

import { BucketContext } from "./bucketContext";
import { ItemPtops } from "./interfaces";

export const ProductsItem: FC<ItemPtops> = memo(
  ({ price, product, count, productId }) => {
    const oldPrice = useRef(price);
    const { addItemToBucket } = useContext(BucketContext);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div
          style={{ flexBasis: "60%" }}
        >{`Название товара: ${product}; Осталось: ${count}`}</div>
        <div
          style={{ color: price > oldPrice.current ? "red" : "green" }}
        >{`Цена: ${price}`}</div>
        <button
          style={{ flexShrink: 0, alignSelf: "center" }}
          onClick={() => {
            addItemToBucket(productId);
          }}
        >
          добавить в корзину
        </button>
      </div>
    );
  }
);
