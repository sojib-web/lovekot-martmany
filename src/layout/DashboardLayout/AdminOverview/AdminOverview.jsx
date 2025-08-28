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

// Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Loader from "../../../Components/shared/Loader";

// Recharts
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
        <Loader />
      </p>
    );
  }

  const { totalBiodata, maleCount, femaleCount, premiumCount, totalRevenue } =
    stats;

  const cardClass = "border border-rose-200 hover:shadow-lg transition-all";

  const chartData = [
    { name: "Total", count: totalBiodata, revenue: totalRevenue },
    { name: "Male", count: maleCount, revenue: totalRevenue * 0.3 },
    { name: "Female", count: femaleCount, revenue: totalRevenue * 0.3 },
    { name: "Premium", count: premiumCount, revenue: totalRevenue * 0.4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        Admin Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className={cardClass}>
          <CardHeader className="text-center">
            <FaUsers className="text-3xl text-rose-600 mx-auto mb-2" />
            <CardTitle>Total Biodata</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-rose-700 text-center">
            {totalBiodata}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="text-center">
            <FaMale className="text-3xl text-blue-600 mx-auto mb-2" />
            <CardTitle>Male Biodata</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-700 text-center">
            {maleCount}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="text-center">
            <FaFemale className="text-3xl text-pink-500 mx-auto mb-2" />
            <CardTitle>Female Biodata</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-pink-600 text-center">
            {femaleCount}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="text-center">
            <FaStar className="text-3xl text-yellow-500 mx-auto mb-2" />
            <CardTitle>Premium Biodata</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-600 text-center">
            {premiumCount}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className="text-center">
            <FaMoneyBillWave className="text-3xl text-green-500 mx-auto mb-2" />
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600 text-center">
            ৳ {totalRevenue}
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Biodata & Revenue Area Chart
          </CardTitle>
          <Separator className="my-2" />
        </CardHeader>
        <CardContent style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f9196f" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#f9196f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#f9196f" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                tickFormatter={(value) => `৳${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="count"
                stroke="#f9196f"
                fillOpacity={1}
                fill="url(#colorCount)"
                name="Biodata Count"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue (৳)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
