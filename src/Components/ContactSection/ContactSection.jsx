import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="bg-[#fffdf6] py-16">
      <div className="text-center mb-12">
        <p className="text-yellow-500 font-semibold uppercase tracking-wider">
          We're Here to Help
        </p>
        <h2 className="text-5xl font-bold text-teal-600 my-2">Contact Us</h2>
        <p className="text-gray-600 text-sm">
          Reach out to LoveKnot — Your trusted partner in finding your perfect
          match.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* Our Office */}
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-4">
          <h3 className="text-xl font-bold text-blue-600">OUR OFFICE</h3>
          <p className="text-gray-600">
            Visit or contact our main office for in-person consultation or
            partnership inquiries.
          </p>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhoneAlt className="text-rose-500" />
            <span>+92 (8800) 68 - 8960</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-rose-500" />
            <span>support@loveknot.com</span>
          </div>
          <div className="flex items-start gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-rose-500 mt-1" />
            <span>
              28800 Orchard Lake Road, Suite 180
              <br />
              Farmington Hills, MI, USA
            </span>
          </div>
        </div>

        {/* Customer Relations */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5953/5953370.png"
            alt="Customer Relations"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="font-bold text-lg">CUSTOMER RELATIONS</h3>
          <p className="text-gray-600 mb-4">
            Have questions about your profile or subscription? Our support team
            is just one click away.
          </p>
          <button className="border border-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Get Support
          </button>
        </div>

        {/* WhatsApp Support */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5977/5977588.png"
            alt="WhatsApp Support"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="font-bold text-lg">WHATSAPP SUPPORT</h3>
          <p className="text-gray-600 mb-4">
            Prefer chatting? Our support team is available 24/7 on WhatsApp for
            quick assistance.
          </p>
          <button className="border border-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
