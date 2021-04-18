import { FC, memo, useContext } from "react";

import { BucketContext } from "./bucketContext";
import { BucketItemPtops } from "./interfaces";

export const BucketItem: FC<BucketItemPtops> = memo(
  ({ price, product, productId, selectedCount }) => {
    const { removeItemFromBucket } = useContext(BucketContext);

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
        >{`Название товара: ${product}; В корзине: ${selectedCount}`}</div>
        <div>{`Цена: ${price * selectedCount}`}</div>
        <button
          style={{ flexShrink: 0, alignSelf: "center" }}
          onClick={() => {
            removeItemFromBucket(productId);
          }}
        >
          удалить из корзины
        </button>
      </div>
    );
  }
);
