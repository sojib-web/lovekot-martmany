// @ts-nocheck
// src/components/Navbar.jsx
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
          `hover:text-rose-500 font-semibold ${
            isActive ? "text-rose-600 underline" : "text-gray-700"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/biodatas"
        className={({ isActive }) =>
          `hover:text-rose-500 font-semibold ${
            isActive ? "text-rose-600 underline" : "text-gray-700"
          }`
        }
      >
        Biodatas
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `hover:text-rose-500 font-semibold ${
            isActive ? "text-rose-600 underline" : "text-gray-700"
          }`
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `hover:text-rose-500 font-semibold ${
            isActive ? "text-rose-600 underline" : "text-gray-700"
          }`
        }
      >
        Contact Us
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `hover:text-rose-500 font-semibold ${
              isActive ? "text-rose-600 underline" : "text-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="bg-[#fefbf3]  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <Link to="/" className="text-2xl font-bold text-rose-600">
            LoveKnot
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 items-center text-base">{navLinks}</ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4 font-semibold items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-rose-500 text-gray-700"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-rose-500 ${
                    isActive ? "text-rose-600 underline" : "text-gray-700"
                  }`
                }
              >
                <FaUserPlus className="text-sm" />
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-rose-500 ${
                    isActive ? "text-rose-600 underline" : "text-gray-700"
                  }`
                }
              >
                <FaSignInAlt className="text-sm" />
                Log In
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-rose-600 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 pt-2 space-y-3">
          <div className="flex flex-col gap-3">{navLinks}</div>
          <div className="flex flex-col gap-3 font-semibold">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-left hover:text-rose-500"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="flex items-center gap-1 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserPlus className="text-sm" />
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="flex items-center gap-1 hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaSignInAlt className="text-sm" />
                  Log In
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
