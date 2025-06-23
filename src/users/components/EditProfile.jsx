import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateProfileApi } from "../../../services/allApi";

function EditProfile({ user, onClose }) {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = sessionStorage.getItem("token");
  const header = { Authorization: `Bearer ${token}` };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      const body = { username };
      if (password) body.password = password;

      const res = await updateProfileApi(body, header);
      if (res.status === 200) {
        toast.success("Profile updated!", {
          onClose: () => onClose(res.data), // close only after toast fades
        });
      }
    } catch (err) {
      toast.error("Update failed, try again.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-300"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            New Password (optional)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-300"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-300"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default EditProfile;
