import { createContext, Dispatch } from "react";
import { IProduct, IProductAction } from "../../types/Product";

export const ProductContext = createContext<{
  products: IProduct[];
  dispatchProducts: Dispatch<IProductAction>;
}>({ products: [], dispatchProducts: () => {} });
