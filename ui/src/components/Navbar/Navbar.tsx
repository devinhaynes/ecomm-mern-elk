import { FC } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar: FC = () => {
  return (
    <div className="Navbar">
      <div className="Navbar__wrapper">
        <div className="Navbar__logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="Navbar__links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
