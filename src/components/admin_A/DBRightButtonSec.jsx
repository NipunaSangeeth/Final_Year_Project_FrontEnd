import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DBRightButtonSec = () => {
  return (
    <div className="text-center mt-20">
      <div className="flex justify-center gap-10">
        <NavLink
          to="addmembers"
          className="bg-indigo-700 hover:bg-indigo-800 text-white py-4 px-6 rounded-full font-semibold shadow-md"
        >
          President Election
        </NavLink>
        <NavLink
          to="addMembers-Sis-Election"
          className="bg-indigo-700 hover:bg-indigo-800 text-white py-4 px-6 rounded-full font-semibold shadow-md"
        >
          SIS Election
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

export default DBRightButtonSec;
