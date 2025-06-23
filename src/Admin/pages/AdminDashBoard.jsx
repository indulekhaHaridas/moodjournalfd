import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faUsers,
  faBook,
  faSmile,
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsersApi } from '../../../services/allApi';
import {
  getJournalCountApi,
  getAvgMoodApi,
  getAnomaliesCountApi
} from '../../../services/allApi';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const moodTrendData = [
  { date: 'May 20', moodScore: 3 },
  { date: 'May 21', moodScore: 4 },
  { date: 'May 22', moodScore: 2 },
  { date: 'May 23', moodScore: 5 },
  { date: 'May 24', moodScore: 3 },
  { date: 'May 25', moodScore: 4 },
  { date: 'May 26', moodScore: 2 },
];
function AdminDashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [avgMood, setAvgMood] = useState('');
  const [anomalyCount, setAnomalyCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to login page (or home)
  };


  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = sessionStorage.getItem("token");
      const reqHeader = { "Authorization": `Bearer ${token}` };

      try {
        const [usersRes, journalsRes, avgMoodRes, anomaliesRes] = await Promise.all([
          getAllUsersApi(reqHeader),
          getJournalCountApi(reqHeader),
          getAvgMoodApi(reqHeader),
          getAnomaliesCountApi(reqHeader)
        ]);

        if (usersRes.status === 200) setUserCount(usersRes.data.count || usersRes.data.length);
        if (journalsRes.status === 200) setJournalCount(journalsRes.data.count);
        if (avgMoodRes.status === 200) setAvgMood(avgMoodRes.data.averageMood);
        if (anomaliesRes.status === 200) setAnomalyCount(anomaliesRes.data.count);

      } catch (err) {
        console.error("Error loading admin dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="min-h-screen flex bg-gray-100 relative">
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
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          {/* Hamburger (Mobile Only) */}
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-700">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          <p className="text-sm text-gray-500  hidden md:block">Welcome, Admin</p>
        </header>

        {/* Dashboard Cards */}
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold text-blue-900">{userCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-gray-500">Journal Entries</h2>
            <p className="text-2xl font-bold text-blue-900">{journalCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-gray-500">Avg Mood</h2>
            <p className="text-2xl font-bold text-blue-900">{avgMood}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-gray-500">Anomalies</h2>
            <p className="text-2xl font-bold text-red-600">{anomalyCount}</p>
          </div>
        </main>

        {/* Charts and List */}
        <section className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Mood Trend (Chart Placeholder)</h3>
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="moodScore" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Journal Entries</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>😊 Feeling calm today</li>
              <li>😔 Had a tough day at work</li>
              <li>😁 Productive and happy</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashBoard;
