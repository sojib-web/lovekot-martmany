import React from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#e6eef3]">
      {/* Top Banner */}
      <div className="bg-[#f9196f] text-white text-center py-4 px-6">
        <p className="text-sm md:text-base">
          Free support:{" "}
          <span className="font-semibold">+92 (8800) 68 - 8960</span> &nbsp; |
          &nbsp; Email:{" "}
          <span className="uppercase font-semibold">info@example.com</span>
        </p>
      </div>
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700 border-b border-gray-300">
        {/* Get In Touch */}
        <div>
          <h3 className="font-semibold mb-4">GET IN TOUCH</h3>
          <p>Address: 3812 Lena Lane City Jackson Mississippi</p>
          <p className="mt-2">Phone: +92 (8800) 68 - 8960</p>
          <p className="mt-2">Email: info@example.com</p>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="font-semibold mb-4">HELP & SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-blue-500">
                About company
              </a>
            </li>
            <li>
              <a href="/feedback" className="hover:text-blue-500">
                Feedback
              </a>
            </li>
            <li>
              <a href="/testimonials" className="hover:text-blue-500">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500">
                Contact us
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:text-blue-500">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">SOCIAL MEDIA</h3>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white bg-[#0077b5] p-2 rounded-full">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-white bg-[#1DA1F2] p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="text-white bg-[#3b5998] p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white bg-[#ff0000] p-2 rounded-full">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-6 px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>
          Company name Site - Trusted by over thousands of Boys & Girls for
          successfull marriage.
        </p>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 mt-3 md:mt-0 rounded">
          Join us today !
        </button>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-xs text-gray-500 border-t border-gray-300">
        Copyright © 2023{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Company.com
        </a>{" "}
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
