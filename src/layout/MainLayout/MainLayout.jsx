import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#fefbf3] min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
