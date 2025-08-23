import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DBLeftSec_B = () => {
  const [activeLink, setActiveLink] = useState("");

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="h-full p-12 flex flex-col bg-gradient-to-b from-emerald-950 to-emerald-100 backdrop-blur-md shadow-2xl min-w-96 w-96 gap-3 overflow-auto">
      <hr className="mt-28 " />
      <ul className="flex flex-col gap-44 mt-36 mb-auto">
        <NavLink
          to={"/dashboard_B/create-election"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_B/create-election"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_B/create-election")}
        >
          <span>Create Election</span>
        </NavLink>

        <NavLink
          to={"/dashboard_B/rightSideButton-ADMIN_B"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_B/rightSideButton-ADMIN_B"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() =>
            handleLinkClick("/dashboard_B/rightSideButton-ADMIN_B")
          }
        >
          <span>Add Candidates</span>
        </NavLink>

        <NavLink
          to={"/dashboard_B/election-Side-Buttons"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_B/election-Side-Buttons"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_B/election-Side-Buttons")}
        >
          <span>Election Result</span>
        </NavLink>

        <NavLink
          to={"/dashboard_B/pre-elec-result"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_B/pre-elec-result"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_B/pre-elec-result")}
        >
          <span>Previous Election Results</span>
        </NavLink>

        <NavLink
          to={"/dashboard_B/candidate-tabs-Button"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_B/candidate-tabs-Button"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_B/candidate-tabs-Button")}
        >
          <span>Candidates Details</span>
        </NavLink>

        <button
          onClick={() => navigate("/admin")}
          className="bg-orange-600 hover:bg-orange-500 text text-black py-2 px-4 rounded mt-8"
        >
          Sign Out
        </button>
      </ul>
    </div>
  );
};

export default DBLeftSec_B;
