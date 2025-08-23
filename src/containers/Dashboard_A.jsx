import React from "react";
import { DBLeftSec_A, DBRightSec_A } from "../components/admin_A";

const Dashboard_A = () => {
  return (
    <div className="w-screen h-screen flex items-center overflow-auto">
      <DBLeftSec_A />
      <DBRightSec_A />
    </div>
  );
};

export default Dashboard_A;
