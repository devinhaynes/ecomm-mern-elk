import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

// Components
import { Navbar } from "../Navbar/Navbar";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Products } from "../Products/Products";

export const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
};
