import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";
const NavBar = () => {
  const { name } = React.useContext(AuthContext);
  console.log(name);
  return (
    <nav className="flex items-center justify-between bg-white p-5">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-400">Recipicity</h1>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-10">
          <li>
            <Link to="/" className="hover:text-orange-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-400">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-400">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/recipes/create" className="hover:text-orange-400">
              Create Recipe
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to={"/sign-up"}
          className="rounded bg-orange-400 px-4 py-2 text-sm text-white"
        >
          Sign Up
        </Link>
        <Link
          to={"/sign-in"}
          className="rounded border bg-white px-4 py-2 text-sm text-black transition hover:border-white hover:bg-orange-400 hover:text-white"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
