import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar, faUsers, faBook, faSmile,
  faSignOutAlt, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { deleteUserApi, getAllUsersApi } from '../../../services/allApi';

function AdminUsers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const handleLogout = () => {
  sessionStorage.removeItem("token"); // Clear the token
  navigate("/"); // Redirect to login page (or home)
};

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true); // show loader until fetch is done
    const token = sessionStorage.getItem("token");
    const reqHeader = { "Authorization": `Bearer ${token}` };

    try {
      const result = await getAllUsersApi(reqHeader);
      if (result.status === 200) {
        setUsers(result.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); // hide loader after response
    }
  };

  const handleDelete = async (userId) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { "Authorization": `Bearer ${token}` };

    try {
      const result = await deleteUserApi(userId, reqHeader);
      if (result.status === 200) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh the user list
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="bg-white shadow w-64 hidden md:flex flex-col justify-between">
        <div>
          <div className="p-6 text-blue-900 text-2xl font-bold border-b">Admin Panel</div>
          <nav className="p-8 space-y-4">
            <Link to="/admin-dashboard"><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faChartBar} className="mr-2" /> Dashboard</div></Link>
            <Link to="/admin-users"><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faUsers} className="mr-2" /> Users</div></Link>
            <Link to="/admin-journal"><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faBook} className="mr-2" /> Journal Entries</div></Link>
            <Link to="/admin-moodanalysis"><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faSmile} className="mr-2" /> Mood Analytics</div></Link>
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

      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'block md:hidden' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col justify-between`}>
        <div>
          <div className="p-6 text-blue-900 text-2xl font-bold border-b flex justify-between items-center">
            Admin Panel
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 hover:text-red-600">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <nav className="p-8 space-y-4">
            <Link to="/admin-dashboard" onClick={() => setIsSidebarOpen(false)}><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faChartBar} className="mr-2" /> Dashboard</div></Link>
            <Link to="/admin-users" onClick={() => setIsSidebarOpen(false)}><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faUsers} className="mr-2" /> Users</div></Link>
            <Link to="/admin-journal" onClick={() => setIsSidebarOpen(false)}><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faBook} className="mr-2" /> Journal Entries</div></Link>
            <Link to="/admin-moodanalysis" onClick={() => setIsSidebarOpen(false)}><div className="flex items-center text-gray-700 hover:text-blue-700"><FontAwesomeIcon icon={faSmile} className="mr-2" /> Mood Analytics</div></Link>
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
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-700">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <h1 className="text-xl font-semibold text-gray-700">Users</h1>
          <p className="text-sm text-gray-500 hidden md:block">Manage all registered users</p>
        </header>

        {/* Users Table Section */}
        <main className="p-6 grid grid-cols-1 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">User List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b text-left">
                  <tr>
                    <th className="p-2">No.</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{user.username}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 space-x-2">

                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading ? (
                <p className="text-center text-gray-500 py-4">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No users found.</p>
              ) : null}

            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default AdminUsers;
