import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getUserMoodAnalysisApi } from "../../../services/allApi";

const COLORS = [
  "#00C49F", // Happy
  "#36A2EB", // Calm
  "#FF8042", // Angry
  "#FFBB28", // Anxious
  "#9C27B0", // Sad
  "#FF6384", // Tired
];

function Analysis() {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const token = sessionStorage.getItem("token");
  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (token) {
      fetchAnalysis();
    }
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await getUserMoodAnalysisApi(reqHeader);
      if (res.status === 200) {
        setLineData(res.data.lineData);
        setPieData(res.data.pieData);
      }
    } catch (err) {
      console.error("Error fetching analysis:", err);
    }
  };

  const mostFrequentMood = () =>
    pieData.reduce(
      (best, cur) => (cur.value > best.value ? cur : best),
      { value: 0, name: "None" }
    ).name;

  const bestDay = () =>
    lineData.length
      ? lineData.reduce(
          (best, cur) => (cur.Happy > best.Happy ? cur : best),
          lineData[0]
        ).day
      : "—";

  return (
    <>
      <Header />

      {token ? (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-indigo-50 to-pink-50 px-4 py-8 sm:px-6 md:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-indigo-700">
            Your Mood Analysis
          </h2>

          {/* Charts */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
            {/* Line Chart */}
            <div className="w-full h-64 sm:h-80 max-w-full lg:max-w-3xl">
              {lineData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Happy" stroke={COLORS[0]} />
                    <Line type="monotone" dataKey="Calm" stroke={COLORS[1]} />
                    <Line type="monotone" dataKey="Angry" stroke={COLORS[2]} />
                    <Line type="monotone" dataKey="Anxious" stroke={COLORS[3]} />
                    <Line type="monotone" dataKey="Sad" stroke={COLORS[4]} />
                    <Line type="monotone" dataKey="Tired" stroke={COLORS[5]} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500">No mood trend data.</p>
              )}
            </div>

            {/* Pie Chart */}
            <div className="w-64 sm:w-full h-64 sm:h-80 max-w-full sm:max-w-sm">
              {pieData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500">No mood data.</p>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-indigo-600">
                Most Frequent Mood
              </h3>
              <p className="text-xl sm:text-2xl mt-2">😊 {mostFrequentMood()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-indigo-600">Best Day</h3>
              <p className="text-xl sm:text-2xl mt-2">{bestDay()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold text-indigo-600">Tips</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Maintain a gratitude journal to reinforce positive moods.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Hero Section for Logged Out Users
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-purple-50 to-pink-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4">
              See Your Emotional Patterns
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Emotly helps you visualize your emotional trends through
              interactive charts. Sign up today and start your journey to
              better self‑awareness.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Analysis;
