import React from "react";
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
  SisCandidateDetails,
  SisElectionResult,
} from "../admin_b";
import { Route, Routes } from "react-router-dom";

const DBRightSec_B = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl">
        ADMINISTRATION B
      </h1>
      <hr className="mt-16" /> {/* The Line(herderow) */}
      <div>
        <Routes>
          <Route path="/dashboard_B" element={<Dashboard_B />} />
          <Route path="/create-election" element={<CreateElection />} />

          <Route path="/pre-elec-result" element={<PreElecResult />} />
          <Route
            path="/sis-candidates-details"
            element={<SisCandidateDetails />}
          />

          {/* Create Election Routes */}
          <Route path="rightSideButton-ADMIN_B">
            <Route index element={<DBRightSideButtonADMIN_B />} />
            <Route path="add-candidates" element={<AddCandidates />} />
            <Route
              path="add-Candidates-Sis-Election"
              element={<AddCandidatesSisElection />}
            />
          </Route>

          {/* Create Election Routes */}

          <Route path="election-Side-Buttons">
            <Route index element={<DBElectionSideButtons />} />
            <Route
              path="election-result-President"
              element={<ElectionResult />}
            />
            <Route path="sis-Election-Result" element={<SisElectionResult />} />
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
