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
import { Route, Routes } from "react-router-dom";
import { Dashboard_A } from "../../containers";

const DBRightSec_A = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
      <h1 className=" flex-col text-center font-semibold text-5xl">
        ADMINISTRATION A
      </h1>
      <hr className="mt-16" /> {/* The Line(-----)*/}
      <div>
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
