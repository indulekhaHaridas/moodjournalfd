import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faUsers,
  faBook,
  faSmile,
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { getUsersWithMoodsApi } from '../../../services/allApi';
/* label ➜ numeric score */
const SCORE = {
  Happy: 6,
  Calm: 5,
  Angry: 4,
  Anxious: 3,
  Sad: 2,
  Tired: 1
};

const COLORS = ["#34d399", "#60a5fa", "#f87171", "#facc15", "#a3a3a3", "#c084fc"];
// Green, Blue, Red, Yellow, Gray, Purple (one for each mood)


function AdminMoodAnalytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const navigate = useNavigate();

const handleLogout = () => {
  sessionStorage.removeItem("token"); // Clear the token
  navigate("/"); // Redirect to login page (or home)
};

  useEffect(() => {
    (async () => {
      try {
        /* 1️⃣  fetch */
        const token = sessionStorage.getItem("token");
        const { data } = await getUsersWithMoodsApi({ Authorization: `Bearer ${token}` });

        /* 2️⃣  flatten */
        const flat = data.flatMap((u) =>
          u.moods.map((m) => ({
            label: m.mood.label,
            date: new Date(m.date),
            score: SCORE[m.mood.label] ?? 3, // fallback to “Neutral”
          }))
        );

        /* 3️⃣  pie – count by label */
        const pieMap = {};
        flat.forEach(({ label }) => (pieMap[label] = (pieMap[label] || 0) + 1));
        setPieData(Object.entries(pieMap).map(([name, value]) => ({ name, value })));

        /* 4️⃣  line – average score per calendar day */
        const lineMap = {};
        flat.forEach(({ date, score }) => {
          const key = date.toISOString().slice(0, 10); // YYYY‑MM‑DD
          if (!lineMap[key]) lineMap[key] = { day: key, total: 0, n: 0 };
          lineMap[key].total += score;
          lineMap[key].n += 1;
        });
        const trend = Object.values(lineMap)
          .map(({ day, total, n }) => ({ day, moodScore: +(total / n).toFixed(2) }))
          .sort((a, b) => a.day.localeCompare(b.day));

        setLineData(trend);
      } catch (err) {
        console.error("Mood fetch failed:", err);
      }
    })();
  }, []);


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      {/* Sidebar (Desktop) */}
      <aside className="bg-white shadow w-64 hidden md:flex flex-col justify-between">
        <div>
          <div className="p-6 text-blue-900 text-2xl font-bold border-b">Admin Panel</div>
          <nav className="p-8 space-y-4">
            <Link to={'/admin-dashboard'}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Dashboard
              </div>
            </Link>
            <Link to={'/admin-users'}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Users
              </div>
            </Link>
            <Link to={'/admin-journal'}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faBook} className="mr-2" /> Journal Entries
              </div>
            </Link>
            <Link to={'/admin-moodanalysis'}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faSmile} className="mr-2" /> Mood Analytics
              </div>
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </button>
        </div>

      </aside>

      {/* Sidebar (Mobile) */}
      <div className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'block md:hidden' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col justify-between`}>
        <div>
          <div className="p-6 text-blue-900 text-2xl font-bold border-b flex justify-between items-center">
            Admin Panel
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 hover:text-red-600">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <nav className="p-8 space-y-4">
            <Link to={'/admin-dashboard'} onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Dashboard
              </div>
            </Link>
            <Link to={'/admin-users'} onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Users
              </div>
            </Link>
            <Link to={'/admin-journal'} onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faBook} className="mr-2" /> Journal Entries
              </div>
            </Link>
            <Link to={'/admin-moodanalysis'} onClick={() => setIsSidebarOpen(false)}>
              <div className="flex items-center text-gray-700 hover:text-blue-700">
                <FontAwesomeIcon icon={faSmile} className="mr-2" /> Mood Analytics
              </div>
            </Link>
          </nav>
        </div>
      <div className="p-6 border-t">
  <button
    onClick={handleLogout}
    className="flex items-center text-gray-700 hover:text-red-600"
  >
    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
  </button>
</div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          {/* Hamburger (Mobile Only) */}
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-700">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <h1 className="text-xl font-semibold text-gray-700">Mood Analytics</h1>
          <p className="text-sm text-gray-500  hidden md:block">View mood trends of all users</p>
        </header>

        <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LINE – mood trend */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Average Mood Score per Day
            </h2>
            <div className="h-96 flex items-center justify-center">
              {lineData.length === 0 ? (
                <p className="text-gray-500">No mood trend data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="moodScore" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

          </div>

          {/* PIE – distribution */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Mood Distribution (all users)
            </h2>
            <div className="h-96 flex items-center justify-center">
              {pieData.length === 0 ? (
                <p className="text-gray-500">No mood distribution data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMoodAnalytics;
