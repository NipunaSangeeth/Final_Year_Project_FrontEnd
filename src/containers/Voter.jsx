import React from "react";
import { useNavigate } from "react-router-dom";

const Voter = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-white mb-6">Voter Login</h1>
        {/* NIC Input */}
        <input
          type="text"
          placeholder="Enter NIC number"
          className="w-full py-3 px-4 mb-8 rounded-lg bg-gray-300 text-black focus:outline-none"
        />
        {/* Enter Fingerprint Button */}
        <button
          onClick={() => navigate("/placevotes")}
          className="w-full py-3 mb-6 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
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
