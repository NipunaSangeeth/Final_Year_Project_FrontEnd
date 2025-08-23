import React from "react";
import { NavLink } from "react-router-dom";

const DBCandidateTabsButton = () => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      <NavLink
        to="view-President-Voters-Details"
        className={({ isActive }) =>
          `py-3 px-6 font-medium ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-black hover:text-gray-800"
          }`
        }
      >
        President Election Voters
      </NavLink>
      <NavLink
        to="view-sis-voter-details"
        className={({ isActive }) =>
          `py-3 px-6 font-medium ${
            isActive
              ? "text-green-600 border-b-2 border-green-600"
              : "text-black hover:text-gray-800"
          }`
        }
      >
        SIS Election Voters
      </NavLink>
    </div>
  );
};

export default DBCandidateTabsButton;
