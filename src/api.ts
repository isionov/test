import { Names, Products } from "./interfaces";

export const getProducts = async (): Promise<Products | undefined> => {
  return (await fetch("/products.json")).json();
};

export const getNames = async (): Promise<Names> => {
  return (await fetch("/names.json")).json();
};

export const subscribeOnProducts = (
  cb: (products: Products["Value"]["Goods"] | undefined) => void
) => {
  (async () => {
    const products = await getProducts();

    cb(products?.Value?.Goods);
  })();

  const interval = setInterval(async () => {
    const products = await getProducts();

    cb(products?.Value?.Goods);
  }, 15000);

  return () => clearInterval(interval);
};

export const subscribeOnDollarRate = (cb: (rate: number | null) => void) => {
  const rate = 30 + 90 * Math.random();
  cb(rate);

  const interval = setInterval(() => {
    const rate = 30 + 90 * Math.random();

    cb(rate);
  }, (1000 * 50) / 20);

  return () => clearInterval(interval);
};
