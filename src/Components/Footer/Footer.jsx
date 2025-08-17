import React, { useContext } from "react";
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaGithub } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);

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
    <footer className="bg-[#e6eef3]">
      {/* Top Banner */}
      <div className="bg-[#f9196f] text-white text-center py-3 px-4">
        <p className="text-sm md:text-base">
          Free support: <span className="font-semibold">01743191397</span>{" "}
          &nbsp;|&nbsp; Email:{" "}
          <span className="uppercase font-semibold">alisojib295@gmail.com</span>
        </p>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700 border-b border-gray-300">
        {/* Get In Touch */}
        <div>
          <h3 className="font-semibold mb-4">GET IN TOUCH</h3>
          <p>
            <span className="font-medium">Address:</span> Bheramara, Kushtia,
            Bangladesh
          </p>
          <p className="mt-2">
            {" "}
            <span className="font-medium">Phone:</span> 01743191397{" "}
          </p>
          <p className="mt-2">
            {" "}
            <span className="font-medium">Email:</span> alisojib295@gmail.com
          </p>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="font-semibold mb-4">HELP & SUPPORT</h3>
          <div className="flex flex-col space-y-2">{navLinks}</div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">SOCIAL MEDIA</h3>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/md-sojib-ali/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#0077b5] p-2 rounded-full hover:opacity-90 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/sojib-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gray-800 p-2 rounded-full hover:opacity-90 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/sojib.ahmed.71271466"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#3b5998] p-2 rounded-full hover:opacity-90 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#ff0000] p-2 rounded-full hover:opacity-90 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-6 px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>
          <span className="font-semibold">Company name Site</span> - Trusted by
          over thousands of Boys & Girls for successful marriage.
        </p>
        <Link to="/signup">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 mt-3 md:mt-0 rounded transition">
            Join us today!
          </button>
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-xs text-gray-500 border-t border-gray-300">
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://portfolio-sojib.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Company.com
        </a>{" "}
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
