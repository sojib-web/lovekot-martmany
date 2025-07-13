// @ts-nocheck
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.avif";
import {
  FaUserEdit,
  FaRegEye,
  FaEnvelopeOpenText,
  FaHeart,
  FaSignOutAlt,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);

  // ✅ Console logs for debugging
  console.log("✅ Logged in user:", user);
  console.log("✅ User email:", user?.email);
  console.log("✅ Role loading status:", isLoading);
  console.log("✅ User role from DB:", role);

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  const getActiveClass = ({ isActive }) =>
    isActive
      ? "bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold shadow-md"
      : "hover:bg-rose-50 text-gray-700";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
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

        <div className="p-6 bg-gradient-to-b from-rose-50 to-amber-50 border-r border-gray-200 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="flex flex-col w-80 h-full bg-gradient-to-b from-rose-50 to-amber-50 border-r border-gray-200">
          <div className="p-4 border-b border-rose-200 font-bold text-lg">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-12 h-12 rounded-lg" />
              <NavLink to="/" className="text-2xl font-bold text-rose-600">
                LoveKnot
              </NavLink>
            </div>
          </div>

          <ul className="menu flex-1 overflow-y-auto p-4 space-y-2">
            {/* ----------- Normal User Menu ----------- */}
            {role === "normal" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/edit-biodata"
                    className={getActiveClass}
                  >
                    <FaUserEdit /> Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/view-biodata"
                    className={getActiveClass}
                  >
                    <FaRegEye /> View Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-contact-requests"
                    className={getActiveClass}
                  >
                    <FaEnvelopeOpenText /> My Contact Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/favourites-biodata"
                    className={getActiveClass}
                  >
                    <FaHeart /> Favourites Biodata
                  </NavLink>
                </li>
              </>
            )}

            {/* ----------- Admin Menu ----------- */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-dashboard"
                    className={getActiveClass}
                  >
                    <FaTachometerAlt /> Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/admin-users"
                    className={getActiveClass}
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/approved-premium"
                    className={getActiveClass}
                  >
                    <FaStar /> Approved Premium
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/approved-contact-request"
                    className={getActiveClass}
                  >
                    <FaCheckCircle /> Approved Contact Request
                  </NavLink>
                </li>
              </>
            )}

            {/* Logout */}
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
