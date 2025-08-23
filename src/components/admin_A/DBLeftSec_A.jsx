import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DBLeftSec_A = () => {
  //   return <div>DBLeftSec_A</div>;

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
          to={"/dashboard_A/rightButtonSec"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard_A/rightButtonSec"
              ? "bg-emerald-950"
              : "bg-emerald-800"
          } text-white hover:bg-emerald-950`}
          onClick={() => handleLinkClick("/dashboard_A/rightButtonSec")}
        >
          <span>ADD</span>
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

  // this is the normal one//   return (
  //     <div className="w-1/3 h-full bg-gradient-to-b from-gray-800 to-gray-500 text-white flex flex-col items-center justify-between p-4 border-r border-blue-500">
  //       <h1 className="text-2xl font-bold mt-4">Administration A</h1>
  //       <div className="flex flex-col gap-4 mt-8">
  //         <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
  //           Add
  //         </button>
  //         <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
  //           View Voter details
  //         </button>
  //       </div>
  //       <button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded mt-8">
  //         Sign Out
  //       </button>
  //     </div>
  //   );
};

export default DBLeftSec_A;
