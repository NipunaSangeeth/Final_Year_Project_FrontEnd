
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Convert milliseconds to hours, minutes, seconds
const splitTime = (ms) => {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };

  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  return { h, m, s };
};

// Single Timer Card
const TimerCard = ({ label, time }) => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-[#028c0b] to-[#028a51] text-white rounded-2xl shadow-2xl p-6 w-72">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="flex justify-center gap-4 text-2xl font-bold">
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.h} <span className="text-sm">h</span>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.m} <span className="text-sm">min</span>
        </div>
        <div className="bg-white/20 px-4 py-2 rounded-lg">
          {time.s} <span className="text-sm">s</span>
        </div>
      </div>
    </div>
  );
};

const Voter = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ electionStartAt: null, electionEndAt: null });
  const [timers, setTimers] = useState({
    electionStart: { h: "00", m: "00", s: "00" },
    electionEnd: { h: "00", m: "00", s: "00" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch election dates
  useEffect(() => {
    const fetchElectionDates = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/election-status");
        const data = res.data?.data;
        if (data) {
          setDates({
            electionStartAt: new Date(data.electionStartAt),
            electionEndAt: new Date(data.electionEndAt),
          });
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchElectionDates();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!dates.electionStartAt || !dates.electionEndAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      setTimers({
        electionStart: splitTime(dates.electionStartAt - now),
        electionEnd: splitTime(dates.electionEndAt - now),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dates]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
        <div className="text-white text-xl">Loading election timers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
        <div className="text-red-400 text-xl">Failed to fetch election status.</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start bg-gradient-to-b from-emerald-950 to-emerald-100 pt-16 gap-8">
      {/* Countdown Timer Cards */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <TimerCard label="Election Starts In" time={timers.electionStart} />
        <TimerCard label="Election Ends In" time={timers.electionEnd} />
      </div>

      {/* Warning Message */}
      <div className="text-center text-yellow-400 font-semibold text-lg mb-6">
        You can't access the system until the election starts.
      </div>

      {/* Voter Login Box */}
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Voter Login</h1>
        {/* NIC Input */}
        <input
          type="text"
          placeholder="Enter NIC number"
          className="w-full py-3 px-4 mb-6 rounded-lg bg-gray-300 text-black focus:outline-none"
        />
        {/* Enter Fingerprint Button */}
        <button
          onClick={() => navigate("/placevotes")}
          className="w-full py-3 mb-4 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
        >
          Enter Fingerprint
        </button>
        {/* Back to Admin Button */}
        <button
          onClick={() => navigate("/admin")}
          className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
        >
          Back to Admin
        </button>
      </div>
    </div>
  );
};

export default Voter;
