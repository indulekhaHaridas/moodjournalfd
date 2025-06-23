import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { addmoodApi, deleteMoodApi, getmoodApi, updateMoodApi } from '../../../services/allApi';

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😴', label: 'Tired' },
];

function Journal() {
  const [token, setToken] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [entryText, setEntryText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedEntry, setSavedEntry] = useState(null);
  const [allmoods, setallMoods] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const hasTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return allmoods.some(m => new Date(m.date).toISOString().split('T')[0] === today);
  };

  const handleSubmit = async () => {
    if (!selectedMood || !entryText) return toast.warning('Please select mood and write something');

    const reqBody = {
      mood: selectedMood,
      text: entryText
    };

    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      const result = await addmoodApi(reqBody, reqHeader);
      if (result.status === 200) {
        setSavedEntry(result.data);
        setSelectedMood(null);
        setEntryText('');
        setDate(new Date().toISOString().split('T')[0]);
        toast.success('Mood added successfully!');
        getallMoods();
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.warning(err.response.data); // Backend message
      } else {
        console.error(err);
        toast.error('Something went wrong while adding mood');
      }
    }
  };

  const getallMoods = async () => {
    try {
      const result = await getmoodApi();
      if (result.status === 200) {
        setallMoods(result.data);
      }
    } catch (err) {
      console.error("Error fetching moods", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteMoodApi(id);
      if (result.status === 200) {
        toast.success("Mood deleted!");
        getallMoods();
      } else {
        toast.error("Failed to delete mood");
      }
    } catch (err) {
      toast.error("Error deleting mood");
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setSelectedMood(item.mood);
    setEntryText(item.text);
    setEditingId(item._id);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const reqBody = {
      mood: selectedMood,
      text: entryText
    };

    try {
      const result = await updateMoodApi(editingId, reqBody, reqHeader);
      if (result.status === 200) {
        toast.success('Mood updated successfully');
        setIsEditing(false);
        setEditingId(null);
        setSelectedMood(null);
        setEntryText('');
        getallMoods();
      } else {
        toast.error(result.response?.data || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while updating');
    }
  };

  useEffect(() => {
    getallMoods();
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Header />
      {token ? (
        <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-blue-100 to-green-100 p-4 flex flex-col items-center justify-start pt-10 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6"
          >
            <h1 className="text-2xl font-bold text-center mb-4 text-indigo-700">New Journal Entry</h1>

            {hasTodayEntry() && !isEditing && (
              <p className="text-sm text-red-600 text-center mb-4">
                You've already added a mood for today.
              </p>
            )}

            <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
              disabled
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Your Mood</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {moods.map((mood) => (
                <button
                  type="button"
                  key={mood.label}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${selectedMood?.label === mood.label
                    ? 'bg-indigo-100 border-indigo-400'
                    : 'bg-white border-gray-300 hover:bg-indigo-50'
                    }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm mt-1 text-gray-600">{mood.label}</span>
                </button>
              ))}
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-700">Your Thoughts</label>
            <textarea
              rows="5"
              placeholder="Write about your day..."
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              className="w-full p-3 mb-6 border rounded-lg"
            ></textarea>

            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Update Entry
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!selectedMood || !entryText || hasTodayEntry()}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50"
              >
                Save Entry
              </button>
            )}
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {allmoods?.length > 0 ? (
              allmoods.map((item, index) => (
                <div className="bg-blue-100 p-4 rounded-xl shadow" key={index}>
                  <h2 className="text-xl font-semibold mb-2">{item.mood?.emoji} {item.mood?.label}</h2>
                  <p className="text-sm mb-2">Energy: <span>⚡⚡⚡</span></p>
                  <p className="italic text-gray-700">{item.text}</p>
                  <div className="text-sm text-gray-600 mt-2">#{item.mood?.label?.toLowerCase()}</div>
                  <div className="text-right text-xs text-gray-500 mt-2">{new Date(item.date).toLocaleDateString('en-GB')}</div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Added Moods.....</p>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 text-center p-6 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">Welcome to Emotly ✨</h2>
            <p className="text-gray-600 mb-6">
              Start tracking your emotions and thoughts to understand yourself better. <br />
              Please log in or sign up to create your first journal entry.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Link to={'/login'}>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Login</button>
              </Link>
              <Link to={'/register'}>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50">Sign Up</button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />
    </>
  );
}

export default Journal;
