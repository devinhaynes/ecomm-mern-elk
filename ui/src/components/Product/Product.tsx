import { FC } from "react";
import { ShoppingCart } from "@material-ui/icons";
import "./Product.scss";

interface IProductProps {
  header: string;
  description: string;
  price: number;
}

export const Product: FC<IProductProps> = ({ header, description, price }) => {
  return (
    <div className="Product">
      <div className="Product__header">
        <span>{header}</span>
      </div>
      <div className="Product__body">
        <p>{description}</p>
        <p>{`$${price}`}</p>
        <button>
          <ShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
