//___________________________________________________________________________________________
//_________election result LiVE part Now Compatible with the time________

//______________________2025/11/12____________________
// LEFT SIDEBAR (ADMIN B)
// Updated to use 'isReportWindowActive' & 'isResultLocked' from hook
// - Election Result(LIVE) button enabled when:
//    a) election is running OR
//    b) report window is active (the 2-minute window after election end)
// - Election Result(LIVE) button disabled when isResultLocked === true

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useElectionStatus } from "../../hooks/useElectionStatus";

const DBLeftSec_B = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  // NEW: we pull isReportWindowActive and isResultLocked from the hook
  const {
    isNominationPeriod,
    isElectionRunning,
    isIdle,
    isReportWindowActive,
    isResultLocked,
  } = useElectionStatus();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Determine if Election Result link should be interactive (enabled)
  // Enabled when:
  //  - election is actively running OR
  //  - report window is active (short window after election end)
  // Disabled when:
  //  - system is idle/nomination and not in running/window state OR
  //  - result is locked (report generated or window expired)
  const electionResultEnabled =
    (isElectionRunning || isReportWindowActive) && !isResultLocked;

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
          to={isNominationPeriod ? "/dashboard_B/rightSideButton-ADMIN_B" : "#"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer text-white ${
            activeLink === "/dashboard_B/rightSideButton-ADMIN_B"
              ? "bg-emerald-950"
              : "bg-emerald-800"
            
          } text-white hover:bg-emerald-950 ${
            !isNominationPeriod ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            isNominationPeriod &&
            handleLinkClick("/dashboard_B/rightSideButton-ADMIN_B")
          }
          disabled={!isNominationPeriod}
        >
          <span>Add Candidates</span>
        </NavLink>

        <NavLink
          // Note: to uses '#' when disabled to avoid navigation
          to={
            electionResultEnabled ? "/dashboard_B/election-Side-Buttons" : "#"
          }
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer text-white ${
            activeLink === "/dashboard_B/election-Side-Buttons"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950 ${
            !electionResultEnabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            electionResultEnabled &&
            handleLinkClick("/dashboard_B/election-Side-Buttons")
          }
          disabled={!electionResultEnabled}
        >
          <span>Election Result(LIVE)</span>
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
