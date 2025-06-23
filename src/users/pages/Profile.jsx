import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import EditProfile from "../components/EditProfile";
import { getProfileApi } from "../../../services/allApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      const header = { Authorization: `Bearer ${token}` };
      try {
        const res = await getProfileApi(header);
        if (res.status === 200) setUser(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <p className="min-h-screen flex items-center justify-center">
          Loading profile…
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8"
        >
          {editing ? (
            <EditProfile
              user={user}
              onClose={(updated) => {
                if (updated) setUser(updated);
                setEditing(false);
              }}
            />
          ) : (
            <>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-full bg-indigo-400 flex items-center justify-center text-4xl text-white font-bold mb-4 shadow-md">
                  {user.username?.charAt(0) || user.name?.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-indigo-700">
                  {user.username || user.name}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
      <Footer />

      {/* 🔸 Toast container lives OUTSIDE the modal, so it never unmounts */}
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
    </>
  );
}

export default Profile;
