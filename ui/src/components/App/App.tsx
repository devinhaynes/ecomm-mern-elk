import { FC, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

// Components
import { Navbar } from "../Navbar/Navbar";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Products } from "../Products/Products";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import { ProductsReducer } from "../../state/reducers/Products";
import { ProductContext } from "../../state/context/Products";
import axios from "axios";
import { IProduct } from "../../types/Product";

// const tempProducts = [
//   {
//     _id: "sdf92d9dl1",
//     name: "Product1",
//     description: "This product is the first in the list",
//     price: 32.99,
//   },
//   {
//     _id: "asdfkd92991",
//     name: "Product2",
//     description: "This product is the second in the list",
//     price: 1008,
//   },
//   {
//     _id: "asdk200lllkj",
//     name: "Product3",
//     description: "This product is the third in the list",
//     price: 55.79,
//   },
//   {
//     _id: "83ls81dja913",
//     name: "Product4",
//     description: "This product is the fourth in the list",
//     price: 2.05,
//   },
// ];

export const App: FC = () => {
  const [products, dispatchProducts] = useReducer(ProductsReducer, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response: { data: IProduct[] }) => {
        dispatchProducts({
          type: "ADD_PRODUCTS",
          payload: { multipleProducts: response.data },
        });
      })
      .catch((e) => {
        console.log(`Unable to get products from db\nError: ${e}`);
      });
  }, []);
  return (
    <div className="App">
      <ProductContext.Provider value={{ products, dispatchProducts }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />}>
              <Route path="add" element={<AddProductForm />} />
            </Route>
          </Routes>
        </Router>
      </ProductContext.Provider>
    </div>
  );
};
