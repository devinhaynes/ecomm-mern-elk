import { FC, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Products.scss";

import { SearchBar } from "../SearchBar/SearchBar";
import { Product } from "../Product/Product";
import { Add } from "@material-ui/icons";
import { ProductContext } from "../../state/context/Products";

export const Products: FC = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="Products">
      <div className="Products__wrapper">
        <SearchBar
          searchableContent={products}
          criteria={["header", "description"]}
        />
        <div className="Products__products">
          {products.map((product) => {
            return (
              <Product
                name={product.name}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </div>
        <Link className="Products__add-product" to="/products/add">
          <Add />
          Add New Product
        </Link>
        <Outlet />
      </div>
    </div>
  );
};
