import { FC } from "react";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import "./AddProductForm.scss";

export const AddProductForm: FC = () => {
  return (
    <div className="AddProductForm">
      <div className="AddProductForm__header">
        <p>New Product</p>
        <Link to="/products">
          <Close />
        </Link>
      </div>
      <form className="AddProductForm__form">
        <div className="AddProductForm__form__group">
          <label htmlFor="add_product_name">Product Name</label>
          <input id="add_product_name" name="add_product_name" type="text" />
        </div>
        <div className="AddProductForm__form__group">
          <label htmlFor="add_product_description">Description</label>
          <textarea
            id="add_product_description"
            name="add_product_description"
          />
        </div>
        <div className="AddProductForm__form__group">
          <label htmlFor="add_product_price">Price</label>
          <input
            id="add_product_price"
            name="add_product_price"
            type="currency"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
