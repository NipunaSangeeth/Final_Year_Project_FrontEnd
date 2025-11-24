import React from "react";
//import { Dashboard_A } from "../../containers";
import AddMembers from "./AddMembers";
import {
  AddMembersSisElection,
  DBRightButtonSec,
  ViewDetailsTab,
  ViewPresidentVoteDetails,
  ViewSisVoterDetails,
  ViewVoteDetails,
} from ".";
import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard_A } from "../../containers";
import AdminBackground from "../admin_b/AdminBackground";

import DashboardTimers from "../admin_b/DashboardTimers";
import DashboardGuidPopupAdmin_A from "./DashboardGuidPopupAdmin_A";

const DBRightSec_A = () => {
  const location = useLocation(); // help to rederect parts
  return (
    <div className="relative flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-extrabold text-5xl text-white">
        Voters Enrollment Unit
      </h1>
      <hr className="mt-16" /> {/* The Line(-----)*/}
      {/*Only show background when on /dashboard_B */}
      {location.pathname === "/dashboard_A" && (
        <div className="absolute inset-0 top-[11rem] z-0">
          <AdminBackground />
          {/* <DashboardGuidPopupAdmin_A /> */}
          <DashboardTimers />
        </div>
      )}
      <div className="relative z-10">
        <Routes>
          {/* <Route path="/" element={<Dashboard_A />} /> */}
          <Route path="/dashboard_A" element={<Dashboard_A />} />

          <Route path="rightButtonSec">
            <Route index element={<DBRightButtonSec />} />
            <Route path="addmembers" element={<AddMembers />} />
            <Route
              path="addMembers-Sis-Election"
              element={<AddMembersSisElection />}
            />
          </Route>

          <Route path="view-details-tab">
            <Route index element={<ViewDetailsTab />} />
            <Route
              path="view-President-Voters-Details"
              element={<ViewPresidentVoteDetails />}
            />
            <Route
              path="view-sis-voter-details"
              element={<ViewSisVoterDetails />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSec_A;
