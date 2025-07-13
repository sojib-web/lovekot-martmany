import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-3xl font-semibold mb-2">Access Forbidden</h2>
      <p className="text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
