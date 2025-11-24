
//##################______2025/11/13________###############

import React from "react";
import { useLocation } from "react-router-dom"; // ✅ Add this
import { Dashboard_B } from "../../containers";
import {
  AddCandidates,
  AddCandidatesSisElection,
  CandidateDetails,
  CreateElection,
  DBCandidateTabsButton,
  DBElectionSideButtons,
  DBRightSideButtonADMIN_B,
  ElectionResult,
  PreElecResult,
  PreviousPresidentElec,
  SisCandidateDetails,
  SisElectionResult,
} from "../admin_b";
import { Route, Routes } from "react-router-dom";
import PreElecResultButtons from "./PreElecResultButtons";
import AdminBackground from "./AdminBackground"; //
import DashboardGuidePopup from "./DashboardGuidePopup";
import DashboardTimers from "./DashboardTimers";

const DBRightSec_B = () => {
  const location = useLocation(); //  current route path

  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto relative">
      <h1 className="flex-col text-center font-semibold text-5xl text-white">
        Electoral Process Administration
      </h1>
      <hr className="mt-16" /> {/* The Line(header row) */}

      {/* Only show background when on /dashboard_B */}
      {location.pathname === "/dashboard_B" && (
        <div className="absolute inset-0 top-[11rem] z-0">
          <AdminBackground />
          {/* <DashboardGuidePopup/> */}
          <DashboardTimers />
        </div>
      )}

      {/* Dashboard content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/dashboard_B" element={<Dashboard_B />} />
          <Route path="/create-election" element={<CreateElection />} />

          {/* 🟩 Previous Election Results Section */}
          <Route path="/pre-elec-result">
            <Route index element={<PreElecResultButtons />} />
            <Route path="president" element={<PreviousPresidentElec />} />
          </Route>

          {/* Create Election Routes */}
          <Route path="rightSideButton-ADMIN_B">
            <Route index element={<DBRightSideButtonADMIN_B />} />
            <Route path="add-candidates" element={<AddCandidates />} />
            <Route
              path="add-Candidates-Sis-Election"
              element={<AddCandidatesSisElection />}
            />
          </Route>

          {/* Election Results Routes */}
          <Route path="election-Side-Buttons">
            <Route index element={<DBElectionSideButtons />} />
            <Route
              path="election-result-President"
              element={<ElectionResult />}
            />
            <Route
              path="sis-Election-Result"
              element={<SisElectionResult />}
            />
          </Route>

          {/* Candidate Details Routes */}
          <Route path="candidate-tabs-Button">
            <Route index element={<DBCandidateTabsButton />} />
            <Route path="candidates-details" element={<CandidateDetails />} />
            <Route
              path="Sis-Candidate-Details"
              element={<SisCandidateDetails />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSec_B;
