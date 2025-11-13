// import React from "react";
// import { Dashboard_B } from "../../containers";
// import {
//   AddCandidates,
//   AddCandidatesSisElection,
//   CandidateDetails,
//   CreateElection,
//   DBCandidateTabsButton,
//   DBElectionSideButtons,
//   DBRightSideButtonADMIN_B,
//   ElectionResult,
//   PreElecResult,
//   PreviousPresidentElec,
//   SisCandidateDetails,
//   SisElectionResult,
// } from "../admin_b";
// import { Route, Routes } from "react-router-dom";
// import PreElecResultButtons from "./PreElecResultButtons";

// const DBRightSec_B = () => {
//   return (
//     <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
//       <h1 className=" flex-col text-center font-semibold text-5xl">
//         ADMINISTRATION B
//       </h1>
//       <hr className="mt-16" /> {/* The Line(herderow) */}
//       <div>
//         <Routes>
//           <Route path="/dashboard_B" element={<Dashboard_B />} />
//           <Route path="/create-election" element={<CreateElection />} />


//           {/* <Route path="/pre-elec-result">
//           <Route index element={<PreElecResultButtons/>}/>
//           <Route path="/president" element={<PreviousPresidentElec/>}/>
//           </Route> */}

// {/* 🟩 Previous Election Results Section */}
//           <Route path="/pre-elec-result">
//             <Route index element={<PreElecResultButtons />} />
//             <Route
//               path="president"
//               element={<PreviousPresidentElec />}
//             />
//             {/* Optional: future SIS election page */}
//             {/* <Route path="sis" element={<PreviousSisElec />} /> */}
//           </Route>


//           {/* <Route path="/pre-elec-result" element={<PreElecResult />} />
//           <Route path="/Previous-President-Elec" element={<PreviousPresidentElec/>}/>
//           <Route
//             path="/sis-candidates-details"
//             element={<SisCandidateDetails />}
//           /> */}

//           {/* Create Election Routes */}
//           <Route path="rightSideButton-ADMIN_B">
//             <Route index element={<DBRightSideButtonADMIN_B />} />
//             <Route path="add-candidates" element={<AddCandidates />} />
//             <Route
//               path="add-Candidates-Sis-Election"
//               element={<AddCandidatesSisElection />}
//             />
//           </Route>

//           {/* Create Election Routes */}

//           <Route path="election-Side-Buttons">
//             <Route index element={<DBElectionSideButtons />} />
//             <Route
//               path="election-result-President"
//               element={<ElectionResult />}
//             />
//             <Route path="sis-Election-Result" element={<SisElectionResult />} />
//           </Route>

//           {/* Candidate Details Routes */}
//           <Route path="candidate-tabs-Button">
//             <Route index element={<DBCandidateTabsButton />} />
//             <Route path="candidates-details" element={<CandidateDetails />} />
//             <Route
//               path="Sis-Candidate-Details"
//               element={<SisCandidateDetails />}
//             />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default DBRightSec_B;


//_________2025/11/13______Add Some Desing in to DB Background________________

// import React from "react";
// import { Dashboard_B } from "../../containers";
// import {
//   AddCandidates,
//   AddCandidatesSisElection,
//   CandidateDetails,
//   CreateElection,
//   DBCandidateTabsButton,
//   DBElectionSideButtons,
//   DBRightSideButtonADMIN_B,
//   ElectionResult,
//   PreElecResult,
//   PreviousPresidentElec,
//   SisCandidateDetails,
//   SisElectionResult,
// } from "../admin_b";
// import { Route, Routes } from "react-router-dom";
// import PreElecResultButtons from "./PreElecResultButtons";
// import AdminBackground from "./AdminBackground";

// const DBRightSec_B = () => {
//   return (
//     <div className="relative flex flex-col py-12 flex-1 h-full overflow-auto">
//       {/* Background */}
//       <div> <AdminBackground /></div>
     
      

//       {/* Foreground Content */}
//       <div className="relative z-10">
//         <h1 className=" flex-col text-center font-semibold text-5xl text-white">
//           ADMINISTRATION B
//         </h1>

//         <hr className="mt-16 border-gray-300/40" /> {/* The Line(herderow) */}

        
//         <div>
//           <Routes>
//             <Route path="/dashboard_B" element={<Dashboard_B />} />
//             <Route path="/create-election" element={<CreateElection />} />

//             {/* 🟩 Previous Election Results Section */}
//             <Route path="/pre-elec-result">
//               <Route index element={<PreElecResultButtons />} />
//               <Route path="president" element={<PreviousPresidentElec />} />
//             </Route>

//             {/* Create Election Routes */}
//             <Route path="rightSideButton-ADMIN_B">
//               <Route index element={<DBRightSideButtonADMIN_B />} />
//               <Route path="add-candidates" element={<AddCandidates />} />
//               <Route
//                 path="add-Candidates-Sis-Election"
//                 element={<AddCandidatesSisElection />}
//               />
//             </Route>

//             <Route path="election-Side-Buttons">
//               <Route index element={<DBElectionSideButtons />} />
//               <Route
//                 path="election-result-President"
//                 element={<ElectionResult />}
//               />
//               <Route
//                 path="sis-Election-Result"
//                 element={<SisElectionResult />}
//               />
//             </Route>

//             {/* Candidate Details Routes */}
//             <Route path="candidate-tabs-Button">
//               <Route index element={<DBCandidateTabsButton />} />
//               <Route path="candidates-details" element={<CandidateDetails />} />
//               <Route
//                 path="Sis-Candidate-Details"
//                 element={<SisCandidateDetails />}
//               />
//             </Route>
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DBRightSec_B;

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
import AdminBackground from "./AdminBackground"; // ✅ Your new background
import DashboardGuidePopup from "./DashboardGuidePopup";

const DBRightSec_B = () => {
  const location = useLocation(); // ✅ current route path

  return (
    <div className="flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto relative">
      <h1 className="flex-col text-center font-semibold text-5xl">
        ADMINISTRATION B
      </h1>
      <hr className="mt-16" /> {/* The Line(header row) */}

      {/* ✅ Only show background when on /dashboard_B */}
      {location.pathname === "/dashboard_B" && (
        <div className="absolute inset-0 top-[11rem] z-0">
          <AdminBackground />
          <DashboardGuidePopup/>
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
