import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import manageSisMemberApi from "../../common/sisMembers";
import { toast } from "react-toastify";
import { useElectionStatus } from "../../hooks/useElectionStatus";


const AddMembersSisElection = () => {
  const initialData = {
    student_name: "",
    register_number: "",
    batch: "",
    faculty: "",
    sis_finger_print: "",
  };

  const [data, setData] = useState(initialData);
  // Required state (You missed this earlier)
  const [remainingTime, setRemainingTime] = useState("");

  const navigate = useNavigate();
  //Load election state
  const { isNominationPeriod, status, nominationEndAt, loading } =
    useElectionStatus();

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset the Form
  const resetForm = () => {
    setData(initialData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/addvoter", {
        method: manageSisMemberApi.manageSisMemReg.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Check the Request Was Successfully ~~~~~~
      if (response.ok) {
        const dataApi = await response.json();
        console.log("Request Data", dataApi);

        // Show the Success MSG Using Toast
        toast.success(dataApi.message || "SIS Voter Sucessfuly Submit");

        // Reset the Form fild (reset the form)
        resetForm();
      } else {
        // Help for Handle the case the REQ is not Success
        const errorData = await response.json();
        toast.error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ⏳ TIMER LOGIC — FIXED & STABLE
  // useEffect(() => {
  //   if (!nominationEndAt) return;

  //   let timer;
  //   const end = new Date(nominationEndAt).getTime();

  //   timer = setInterval(() => {
  //     const now = new Date().getTime();
  //     const diff = end - now;

  //     if (diff <= 0) {
  //       clearInterval(timer);
  //       navigate("/dashboard_A/rightButtonSec");
  //     } else {
  //       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //       const minutes = Math.floor((diff / (1000 * 60)) % 60);
  //       const seconds = Math.floor((diff / 1000) % 60);

  //       setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [nominationEndAt, navigate]);
  
  // Timer Logic
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

  // 🟡 LOAD STATE
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Checking Election Status…
      </div>
    );
  }

  // 🔴 ACCESS CONTROL — FIXED
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
          <label className="text-lg mb-2 text-center">Student Name</label>
          <input
            type="text"
            name="student_name"
            value={data.student_name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Name"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">
            Registration Number
          </label>
          <input
            type="text"
            name="register_number"
            value={data.register_number}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Registration Number"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Batch</label>
          <select
            type="text"
            name="batch"
            value={data.batch}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Select the Batch"
            required
          >
            <option value="">Select the Batch</option>
            <option value="2026A">2026A</option>
            <option value="2027A">2027A</option>
            <option value="2028A">2028A</option>
            <option value="2029A">2029A</option>
            <option value="2030A">2030A</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Faculty</label>
          <select
            type="text"
            name="faculty"
            value={data.faculty}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Select the Faculty"
            required
          >
            <option value="">Select the Faculty</option>
            <option value="Fcult Of Computing and IT">
              Facult Of Computing and IT
            </option>
            <option value="Faculty of Engineering">
              Faculty of Engineering
            </option>
            <option value="Faculty of Technology">Faculty of Technology</option>
            <option value="Faculty of Music">Faculty of Music</option>
            <option value="Faculty of Science">Faculty of Science</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Fingerprint</label>
          <button
            type="button"
            //onClick={handleFingerprintScan}
            className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
          >
            Scan Fingerprint
          </button>
        </div>

        <button className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none">
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

export default AddMembersSisElection;

