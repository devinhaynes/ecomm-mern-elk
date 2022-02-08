import { Product } from "../../components/Product/Product";
import { IProduct, IProductAction } from "../../types/Product";

export const ProductsReducer = (
  state: IProduct[],
  action: IProductAction
): IProduct[] => {
  const {
    type,
    payload: { singleProduct, multipleProducts },
  } = action;
  switch (type) {
    case "ADD_PRODUCT":
      return [...state, singleProduct!];
    case "ADD_PRODUCTS":
      return state.concat(multipleProducts!);
    case "REMOVE_PRODUCT":
      return state.filter((product) => product._id !== singleProduct!._id);
    case "REMOVE_PRODUCTS":
      return state.filter((product) =>
        multipleProducts!.map(
          (unwanted_product) => unwanted_product._id !== product._id
        )
      );
    case "REMOVE_ALL_PRODUCTS":
      return [];
    case "APPLY_FILTER":
      return state.map((product) =>
        multipleProducts
          ?.map((filtered_product) => filtered_product._id)
          .includes(product._id)
          ? { ...product, inFilter: true }
          : { ...product, inFilter: false }
      );
    default:
      return state;
  }
};
