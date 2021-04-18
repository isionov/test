import React, { useState, useEffect } from "react";

import { subscribeOnProducts, getNames, subscribeOnDollarRate } from "./api";
import { splitByGroups } from "./utils";
import { Product, Names } from "./interfaces";
import { Group } from "./Group";
import { BucketContext } from "./bucketContext";
import { Bucket } from "./Bucket";

export const Products = () => {
  const [bucket, setBucket] = useState<(string | number)[]>(
    JSON.parse(localStorage.getItem("bucket") ?? "[]")
  );
  const [productsList, setProductsList] = useState<Product[] | undefined>([]);
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  const [names, setNames] = useState<Names>();

  useEffect(() => {
    (async () => {
      const names = await getNames();
      setNames(names);
    })();
    const clearProducts = subscribeOnProducts(setProductsList);
    const clearDollarRate = subscribeOnDollarRate(setDollarRate);

    return () => [clearProducts, clearDollarRate].forEach((cb) => cb());
  }, []);

  if (!names || !productsList) return null;

  const productsGroups = splitByGroups(productsList);

  return (
    <BucketContext.Provider
      value={{
        bucket,
        addItemToBucket: (id) => {
          const products = [...bucket, id];
          setBucket(products);
          localStorage.setItem("bucket", JSON.stringify(products));
        },
        removeItemFromBucket: (id) => {
          const remainProducts = bucket.filter((seletedId) => seletedId !== id);

          setBucket(remainProducts);
          localStorage.setItem("bucket", JSON.stringify(remainProducts));
        },
      }}
    >
      <div>
        {productsGroups.map((group) => {
          return (
            names && (
              <Group
                groupId={group[0]}
                products={group[1]}
                names={names}
                key={group[0]}
                dollarRate={dollarRate}
              />
            )
          );
        })}
        <Bucket
          products={productsList}
          names={names}
          dollarRate={dollarRate ?? 0}
        />
      </div>
    </BucketContext.Provider>
  );
};
