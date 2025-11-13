// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import managePreMemberApi from "../../common/presidentMembers";
// import { toast } from "react-toastify";

// const AddMembers = () => {
//   const initialData = {
//     member_name: "",
//     nic: "",
//     dob: "",
//     gender: "",
//     distric: "",
//     finger_print: "",
//   };
//   const [data, setData] = useState(initialData);

//   const handleOnChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Reset the Form
//   const resetForm = () => {
//     setData(initialData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/api/addmember", {
//         method: managePreMemberApi.managePreMemReg.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       // Check the Request Was Successfully ~~~~~~
//       if (response.ok) {
//         const dataApi = await response.json();
//         console.log("Request Data", dataApi);

//         // Show the Success MSG Using Toast
//         toast.success(dataApi.message || "Voter Sucessfuly Submit");

//         // Reset the Form fild (reset the form)
//         resetForm();
//       } else {
//         // Help for Handle the case the REQ is not Success
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Something went wrong. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center p-10">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-lg bg-gradient-to-b from-emerald-950 to-emerald-100"
//       >
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Member Name</label>
//           <input
//             type="text"
//             name="member_name"
//             value={data.member_name}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Name"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">NIC</label>
//           <input
//             type="text"
//             name="nic"
//             value={data.nic}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the NIC"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5 overflow-auto">
//           <label className="text-lg mb-2 text-center">DOB</label>
//           <input
//             type="date"
//             name="dob"
//             value={data.dob}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the DOB"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Gender</label>
//           <select
//             type="text"
//             name="gender"
//             value={data.gender}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Gender"
//             required
//           >
//             <option value="">Select the Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Distric</label>
//           <input
//             type="text"
//             name="distric"
//             value={data.distric}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Distric"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <button
//             type="button"
//             //onClick={handleFingerprintScan}
//             className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
//           >
//             Scan Fingerprint
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
//           //onClick={""}
//         >
//           DONE
//         </button>
//         <button
//           onClick={() => navigate("/dashboard_A/rightButtonSec")}
//           className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
//         >
//           Back
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMembers;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import managePreMemberApi from "../../common/presidentMembers";
import { useElectionStatus } from "../../hooks/useElectionStatus"; // ✅ shared hook import

const AddMembers = () => {
  const navigate = useNavigate();

  const initialData = {
    member_name: "",
    nic: "",
    dob: "",
    gender: "",
    distric: "",
    finger_print: "",
  };
  const [data, setData] = useState(initialData);
  const [remainingTime, setRemainingTime] = useState(null);

  // ✅ Hook to get election timing
  const { isNominationPeriod, status, loading } = useElectionStatus();

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => setData(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/addmember", {
        method: managePreMemberApi.managePreMemReg.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resetForm();
        console.log("✅ Voter successfully submitted.");
      } else {
        const err = await response.json();
        console.log("❌ Error:", err.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ✅ Timer Logic
  useEffect(() => {
    let timer;
    const fetchTimer = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/election-status");
        const json = await res.json();
        const data = json?.data;
        if (!data) return;

        const end = new Date(data.nominationEndAt).getTime();
        timer = setInterval(() => {
          const now = new Date().getTime();
          const diff = end - now;

          if (diff <= 0) {
            clearInterval(timer);
            navigate("/dashboard_A/rightButtonSec"); // ⏰ redirect after time ends
          } else {
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);
      } catch (err) {
        console.error("Timer error:", err);
      }
    };

    fetchTimer();
    return () => clearInterval(timer);
  }, [navigate]);

  // ✅ Access Control
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold text-gray-600">
        Checking Election Status...
      </div>
    );
  }

  if (!isNominationPeriod) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          🚫 Nomination Period is not active.
        </h2>
        <button
          onClick={() => navigate("/dashboard_A/rightButtonSec")}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ Main UI (only visible during nomination)
  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* ⏰ Remaining time display */}
      {remainingTime && (
        <div className="mb-6 ml-10 text-center text-lg font-bold text-orange-600 bg-white p-3 rounded-lg shadow-md">
          🕒 Nomination period ends in: {remainingTime}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-lg bg-gradient-to-b from-emerald-950 to-emerald-100"
      >
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Member Name</label>
          <input
            type="text"
            name="member_name"
            value={data.member_name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Name"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NIC</label>
          <input
            type="text"
            name="nic"
            value={data.nic}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the NIC"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5 overflow-auto">
          <label className="text-lg mb-2 text-center">DOB</label>
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Gender</label>
          <select
            name="gender"
            value={data.gender}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            required
          >
            <option value="">Select the Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">District</label>
          <input
            type="text"
            name="distric"
            value={data.distric}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Fingerprint</label>
          <button
            type="button"
            className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
          >
            Scan Fingerprint
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
        >
          DONE
        </button>
        <button
          onClick={() => navigate("/dashboard_A/rightButtonSec")}
          className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddMembers;
