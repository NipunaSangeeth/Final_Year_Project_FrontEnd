
//____________________2025/11/12________________

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  {useElectionStatus}  from "../../hooks/useElectionStatus";

const DBLeftSec_A = () => {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const { isNominationPeriod, isIdle } = useElectionStatus();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="h-full p-12 flex flex-col bg-gradient-to-b from-emerald-950 to-emerald-100 backdrop-blur-md shadow-2xl min-w-96 w-96 gap-3 overflow-auto">
      <hr className="mt-28 " />
      <ul className="flex flex-col gap-44 mt-36 mb-auto">
        <NavLink
          to={isNominationPeriod ? "/dashboard_A/rightButtonSec" : "#"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer text-white ${
            activeLink === "/dashboard_A/rightButtonSec"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } ${!isNominationPeriod ? "opacity-50 cursor-not-allowed hover:none" : "hover:bg-emerald-950"}`}
          onClick={() =>
            isNominationPeriod && handleLinkClick("/dashboard_A/rightButtonSec")
          }
          disabled={!isNominationPeriod}
        >
          <span>ADD Voters</span>
        </NavLink>

        <NavLink
          to={"/dashboard_A/view-details-tab"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_A/view-details-tab"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_A/view-details-tab")}
        >
          <span>View Voter Details</span>
        </NavLink>

        <button
          onClick={() => navigate("/admin")}
          className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded mt-8"
        >
          Sign Out
        </button>
      </ul>
    </div>
  );
};

export default DBLeftSec_A;
