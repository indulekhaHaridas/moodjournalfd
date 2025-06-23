import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import backgroundImage from '../../assets/images/banner.png';
import { Link } from "react-router-dom";

function Home() {
  const moodEntries = [
    {
      type: "😔 Sad",
      energy: 3,
      message: "Feeling lonely after canceling plans. Watched movies alone all day...",
      tags: ["#lonely", "#rainy", "#canceled"],
      date: "May 1",
      colorClass: "bg-blue-100",
    },
    {
      type: "😊 Happy",
      energy: 4,
      message: "Had an amazing day at the park with friends. The weather was perfect!",
      tags: ["#outdoors", "#friends", "#sunny"],
      date: "May 2",
      colorClass: "bg-yellow-100",
    },
    {
      type: "😠 Angry",
      energy: 3,
      message: "Traffic made me late AGAIN. Someone cut me off and I almost lost my temper!",
      tags: ["#commute", "#roadrage", "#late"],
      date: "May 3",
      colorClass: "bg-red-100",
    },
  ];

  // Quick helper to display energy level visually
  const renderEnergy = (level) => '⚡'.repeat(level);

  return (
    <>
      <Header />
      <main className="bg-white">
        <div
          className="w-full h-[450px] bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Overview section about the product */}
        <section className="px-6 py-8 text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">About Team</h2>
          <p className="text-gray-700">
            Emotly is your private space for mood journaling. Whether it's highs, lows, or the meh-days in between,
            jotting down feelings can lead to powerful insights.
          </p>
        </section>

        {/* How to use feature blocks */}
        <section className="px-6 py-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
            {[
              {
                title: '📝 Log Your Mood',
                desc: 'Pick how you feel, give it some context, tag it if you want.',
              },
              {
                title: '📊 View Analytics',
                desc: 'Visual breakdowns help you spot emotional patterns over time.',
              },
              {
                title: '🌱 Grow Mindfully',
                desc: 'Look back, learn, and level up emotionally.',
              },
            ].map((feature, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User mood logs */}
        <section className="px-6 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {moodEntries.map((entry, idx) => (
            <div key={idx} className={`rounded-lg shadow p-5 ${entry.colorClass}`}>
              <h3 className="text-lg font-semibold">{entry.type}</h3>
              <p className="text-sm">Energy: {renderEnergy(entry.energy)}</p>
              <blockquote className="text-sm italic text-gray-800 my-3">"{entry.message}"</blockquote>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{entry.tags.join(' ')}</span>
                <span>{entry.date}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Feature value pitch */}
        <section className="px-6 py-8 bg-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-center">Why Use Emotly?</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-gray-700 list-disc list-inside">
            <li>See what triggers your moods over time</li>
            <li>No clutter—just clean, focused entries</li>
            <li>Great on any device</li>
            <li>Use tags to organize your emotional data</li>
            <li>Helps with mindfulness and reflection</li>
            <li>Fully private, just for you</li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-600 text-white py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Your Mood Journal Today</h2>
          <p className="mb-6">Hundreds are already on the journey—why not you?</p>
          <Link to="/journal"><button className="bg-white text-purple-600 px-6 py-2 rounded hover:bg-gray-100">
            Get Started
          </button></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
