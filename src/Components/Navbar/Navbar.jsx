// src/components/Navbar.jsx
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.avif";
const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/" className="hover:text-rose-500">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/biodatas" className="hover:text-rose-500">
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="hover:text-rose-500">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="hover:text-rose-500">
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="hover:text-rose-500">
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <Link to="/" className="text-2xl font-bold text-rose-600">
            LoveKnot
          </Link>
        </div>
        <ul className="flex gap-4 text-base font-medium">{navItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
