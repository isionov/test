import { createContext } from "react";

export const BucketContext = createContext<{
  bucket: (string | number)[];
  addItemToBucket: (id: string | number) => void;
  removeItemFromBucket: (id: string | number) => void;
}>({
  bucket: [],
  addItemToBucket: () => {},
  removeItemFromBucket: () => {},
});
