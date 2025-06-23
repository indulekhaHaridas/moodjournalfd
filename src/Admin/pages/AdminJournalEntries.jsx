import React, { useEffect, useState } from 'react';
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

function AdminJournalEntries() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usersMoods, setUsersMoods] = useState([]); // holds users with moods
  const [selectedUser, setSelectedUser] = useState(null); // email of clicked user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to login page (or home)
  };
  // Fetch moods grouped by user on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await getUsersWithMoodsApi(headers); // pass headers if your API accepts it
        if (response?.data) {
          setUsersMoods(response.data);
        } else {
          setUsersMoods([]);
        }
      } catch (err) {
        setError("Failed to fetch moods");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler for clicking user card
  const handleUserClick = (userEmail) => {
    if (selectedUser === userEmail) {
      // If clicked again, toggle off
      setSelectedUser(null);
    } else {
      setSelectedUser(userEmail);
    }
  };

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
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'block md:hidden' : 'hidden'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden flex flex-col justify-between`}
      >
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
          <h1 className="text-xl font-semibold text-gray-700">Journal Entries</h1>
          <p className="text-sm text-gray-500 hidden md:block">View recent user journals</p>
        </header>

        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Loading state */}
          {loading && (
            <p className="text-gray-500 col-span-full text-center">Loading users and journal entries...</p>
          )}

          {/* Error state */}
          {error && <p className="text-red-600 col-span-full text-center">{error}</p>}

          {/* No users */}
          {!loading && !error && usersMoods.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">No journal entries found.</p>
          )}

          {/* User cards */}
          {!loading &&
            !error &&
            usersMoods.length > 0 &&
            usersMoods.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className={`relative bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow ${selectedUser === user._id ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                {/* Card Content */}
                <div className="flex items-center space-x-4">
                  
                  <div>
                    <div className="text-lg font-semibold text-blue-900">
                      {user.userDetails?.username || user._id}
                    </div>
                    <div className="font-semibold text-blue-900 text-sm">
                      {user.userDetails?.email || user._id}
                    </div>
                    <div className="text-gray-600 text-sm">Entries: {user.count}</div>
                  </div>
                </div>

                {/* Moods dropdown */}
                {selectedUser === user._id && (
                  <div className="absolute left-0 top-full w-full z-10 mt-2 bg-white shadow-lg rounded-lg p-4">
                    {user.moods && user.moods.length > 0 ? (
                      user.moods.map((moodEntry, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-100 text-blue-900 rounded-md p-2 text-sm mb-2"
                        >
                          <strong>
                            {moodEntry.mood.emoji} {moodEntry.mood.label}
                          </strong>{' '}
                          — <em>{new Date(moodEntry.date).toLocaleDateString()}</em>
                          <p className="mt-1 text-gray-700">{moodEntry.text || 'No description'}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">This user has no moods entered.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
        </main>

      </div>
    </div>
  );
}

export default AdminJournalEntries;
