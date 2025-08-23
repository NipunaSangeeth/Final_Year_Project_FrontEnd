import React from "react";
import { NavLink } from "react-router-dom";

const DBElectionSideButtons = () => {
  return (
    <div className="text-center mt-20">
      <div className="flex justify-center gap-10">
        <NavLink
          to="election-result-President"
          className="bg-indigo-700 hover:bg-indigo-800 text-white py-4 px-6 rounded-full font-semibold shadow-md"
        >
          President Election Result Details
        </NavLink>
        <NavLink
          to="sis-Election-Result"
          className="bg-indigo-700 hover:bg-indigo-800 text-white py-4 px-6 rounded-full font-semibold shadow-md"
        >
          SIS Election Result Details
        </NavLink>
      </div>

      <div className="mt-20">
        <h2 className="text-red-600 font-bold text-xl">NOTE</h2>
        <p className="text-black text-2xl font-semibold mt-2">
          Choose The Election To Show The Relevant Forms
        </p>
      </div>
    </div>
  );
};

export default DBElectionSideButtons;
