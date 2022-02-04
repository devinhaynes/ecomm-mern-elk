export type IProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export type IProductAction = {
  type:
    | "ADD_PRODUCT"
    | "ADD_PRODUCTS"
    | "REMOVE_PRODUCT"
    | "REMOVE_PRODUCTS"
    | "REMOVE_ALL_PRODUCTS"
    | "APPLY_FILTER";
  payload: {
    singleProduct?: IProduct;
    multipleProducts?: IProduct[];
  };
};
