import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          ADD ADMIN
        </h1>
        <form className="flex flex-col gap-5">
          {/* Username Input */}
          <input
            type="text"
            placeholder="User Name"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />

          {/* Admin Type Dropdown */}
          <select className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none">
            <option value="">Select Admin Type</option>
            <option value="super-admin">Admin "A"</option>
            <option value="moderator">Admin "B"</option>
          </select>

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
