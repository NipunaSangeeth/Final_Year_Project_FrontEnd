import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Admin,
  CreateAccount,
  Dashboard_A,
  Dashboard_B,
  Details,
  Login,
  Main,
  Placevotes,
  PlaveVotesSisElec,
  Voter,
} from "./containers";

const App = () => {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/voter" element={<Voter />} />
        <Route path="/details" element={<Details />} />
        <Route path="/placevotes" element={<Placevotes />} />
        <Route path="/placevotes_sis_elec" element={<PlaveVotesSisElec />} />
        <Route path="/createaccount" element={<CreateAccount />} />

        <Route path="/dashboard_A/*" element={<Dashboard_A />} />
        <Route path="/dashboard_B/*" element={<Dashboard_B />} />
      </Routes>
    </div>
  );
};

export default App;
