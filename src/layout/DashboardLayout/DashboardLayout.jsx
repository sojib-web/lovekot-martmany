// @ts-nocheck
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.avif";
const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
        </div>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="flex flex-col w-80 h-full bg-base-200">
          <div className="p-4 border-b border-base-300 font-bold text-lg">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-12 h-12" />
              <Link to="/" className="text-2xl font-bold text-rose-600">
                LoveKnot
              </Link>
            </div>
          </div>

          <ul className="menu flex-1 overflow-y-auto p-4 text-base-content space-y-1">
            <li>
              <Link
                to="/dashboard/edit-biodata"
                className="btn btn-ghost justify-start text-left"
              >
                Edit Biodata
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/view-biodata"
                className="btn btn-ghost justify-start text-left"
              >
                View Biodata
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-contact-requests"
                className="btn btn-ghost justify-start text-left"
              >
                My Contact Request
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/favourites-biodata"
                className="btn btn-ghost justify-start text-left"
              >
                Favourites Biodata
              </Link>
            </li>

            <li className="mt-auto">
              <button onClick={handleLogout} className="btn btn-error w-full">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
