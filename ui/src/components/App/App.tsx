import { FC, useReducer } from "react";
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

const tempProducts = [
  {
    _id: "sdf92d9dl1",
    header: "Product1",
    description: "This product is the first in the list",
    price: 32.99,
    isInFilter: true,
  },
  {
    _id: "asdfkd92991",
    header: "Product2",
    description: "This product is the second in the list",
    price: 1008,
    isInFilter: true,
  },
  {
    _id: "asdk200lllkj",
    header: "Product3",
    description: "This product is the third in the list",
    price: 55.79,
    isInFilter: true,
  },
  {
    _id: "83ls81dja913",
    header: "Product4",
    description: "This product is the fourth in the list",
    price: 2.05,
    isInFilter: false,
  },
];

export const App: FC = () => {
  const [products, dispatchProducts] = useReducer(
    ProductsReducer,
    tempProducts
  );
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
