import { Link } from "react-router";
const NavBar = () => {
  return (
    <nav className=" flex justify-between items-center p-5 bg-white">
      <div>
        <Link to="/">
          <h1 className=" font-bold text-2xl text-orange-400">Recipicity</h1>
        </Link>
      </div>
      <ul className=" flex space-x-10">
        <li>
          <Link to="/" className=" hover:text-orange-400">
            Home{" "}
          </Link>
        </li>
        <li>
          <Link to="/about" className=" hover:text-orange-400">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className=" hover:text-orange-400">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/recipes/create" className=" hover:text-orange-400">
            Create Recipe
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
