import React from "react";
import { DBLeftSec_B, DBRightSec_B } from "../components/admin_b";

const Dashboard_A = () => {
  return (
    <div className="w-screen h-screen flex items-center overflow-auto">
      <DBLeftSec_B />
      <DBRightSec_B />
    </div>
  );
};

export default Dashboard_A;
