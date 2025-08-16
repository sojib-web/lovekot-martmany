// @ts-nocheck
import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.avif";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-2 py-1 font-semibold transition-all duration-300 hover:text-rose-500 ${
            isActive ? "text-rose-600 after:scale-x-100" : "text-gray-700"
          } after:content-[''] after:block after:h-[2px] after:bg-rose-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/biodatas"
        className={({ isActive }) =>
          `relative px-2 py-1 font-semibold transition-all duration-300 hover:text-rose-500 ${
            isActive ? "text-rose-600 after:scale-x-100" : "text-gray-700"
          } after:content-[''] after:block after:h-[2px] after:bg-rose-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`
        }
      >
        Biodatas
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `relative px-2 py-1 font-semibold transition-all duration-300 hover:text-rose-500 ${
            isActive ? "text-rose-600 after:scale-x-100" : "text-gray-700"
          } after:content-[''] after:block after:h-[2px] after:bg-rose-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `relative px-2 py-1 font-semibold transition-all duration-300 hover:text-rose-500 ${
            isActive ? "text-rose-600 after:scale-x-100" : "text-gray-700"
          } after:content-[''] after:block after:h-[2px] after:bg-rose-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`
        }
      >
        Contact Us
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `relative px-2 py-1 font-semibold transition-all duration-300 hover:text-rose-500 ${
              isActive ? "text-rose-600 after:scale-x-100" : "text-gray-700"
            } after:content-[''] after:block after:h-[2px] after:bg-rose-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/60 shadow-md transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full border-2 border-rose-500"
          />
          <Link
            to="/"
            className="text-2xl font-bold text-rose-600 tracking-wide"
          >
            LoveKnot
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex flex-1 justify-center gap-6 text-base items-center">
          {navLinks}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex gap-4 font-semibold items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="flex items-center gap-1 px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                <FaUserPlus className="text-sm" /> Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className="flex items-center gap-1 px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                <FaSignInAlt className="text-sm" /> Log In
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-rose-600 focus:outline-none transition-transform duration-300 hover:rotate-90"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-6">{navLinks}</div>
        <div className="flex flex-col gap-3 px-6 mt-2 font-semibold">
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-left px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1 px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                <FaUserPlus className="text-sm" /> Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1 px-4 py-1 rounded-full border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                <FaSignInAlt className="text-sm" /> Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
