import React from "react";

export default function CallToAction() {
  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto bg-[#fde9b4] rounded-2xl shadow-md text-center overflow-hidden">
        {/* Content */}
        <div className="p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Start Your LoveKnot Journey Today
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            Join thousands of happy couples who found their soulmate on
            LoveKnot. Create your profile, browse premium members, and connect
            with your perfect match today.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button className="bg-black text-white px-6 py-3 rounded-md font-semibold uppercase hover:bg-gray-800 transition">
              Register Now
            </button>
            <button className="border border-black text-black px-6 py-3 rounded-md font-semibold uppercase hover:bg-gray-100 transition">
              Help & Support
            </button>
          </div>
        </div>

        {/* Continuous Background Animation */}
        <div className="w-full h-[62px] relative overflow-hidden">
          <div className="fot-ban-inn lhs"></div>
        </div>
      </div>

      {/* CSS for horizontal background animation */}
      <style jsx>{`
        .fot-ban-inn.lhs {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 62px;
          background: url("https://i.ibb.co/DPMqx041/login-bg.png") repeat-x;
          background-size: 325px;
          animation: movehor 150s linear infinite; /* slower and smooth */
        }

        @keyframes movehor {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: -1187.46%;
          }
        }
      `}</style>
    </section>
  );
}
