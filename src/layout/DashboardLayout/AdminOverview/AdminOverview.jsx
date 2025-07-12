// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import {
  FaUsers,
  FaMale,
  FaFemale,
  FaStar,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminOverview = () => {
  const axiosSecure = useAxios();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-10 text-xl text-rose-600 animate-pulse">
        Loading admin stats...
      </p>
    );
  }

  const { totalBiodata, maleCount, femaleCount, premiumCount, totalRevenue } =
    stats;

  const cardClass =
    "bg-white rounded-xl shadow-md p-6 text-center border border-rose-200";

  // Chart data
  const data = [
    { name: "Total Biodata", count: totalBiodata, revenue: totalRevenue },
    { name: "Male", count: maleCount, revenue: totalRevenue * 0.3 },
    { name: "Female", count: femaleCount, revenue: totalRevenue * 0.3 },
    { name: "Premium", count: premiumCount, revenue: totalRevenue * 0.4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        Admin Dashboard Overview
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className={cardClass}>
          <FaUsers className="text-3xl text-rose-600 mx-auto mb-2" />
          <p className="text-lg font-semibold">Total Biodata</p>
          <p className="text-2xl font-bold text-rose-700">{totalBiodata}</p>
        </div>
        <div className={cardClass}>
          <FaMale className="text-3xl text-blue-600 mx-auto mb-2" />
          <p className="text-lg font-semibold">Male Biodata</p>
          <p className="text-2xl font-bold text-blue-700">{maleCount}</p>
        </div>
        <div className={cardClass}>
          <FaFemale className="text-3xl text-pink-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">Female Biodata</p>
          <p className="text-2xl font-bold text-pink-600">{femaleCount}</p>
        </div>
        <div className={cardClass}>
          <FaStar className="text-3xl text-yellow-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">Premium Biodata</p>
          <p className="text-2xl font-bold text-yellow-600">{premiumCount}</p>
        </div>
        <div className={cardClass}>
          <FaMoneyBillWave className="text-3xl text-green-500 mx-auto mb-2" />
          <p className="text-lg font-semibold">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">৳ {totalRevenue}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              tickFormatter={(value) => `৳${value}`}
            />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            {/* Bar for counts */}
            <Bar
              yAxisId="left"
              dataKey="count"
              fill="#f9196f"
              barSize={40}
              radius={[10, 10, 0, 0]}
              name="Count"
            />
            {/* Line for revenue */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Revenue (৳)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;
