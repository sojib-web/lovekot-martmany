import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#fefbf3]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
