import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import manageSisCandidateApi from "../../common/sisCandidate";
import imageTobase64 from "../../helper/imageTobase64";
import { toast } from "react-toastify";
import { useElectionStatus } from "../../hooks/useElectionStatus";

const AddCandidatesSisElection = () => {
  const initialData = {
    sis_name: "",
    sis_batch: "",
    sis_regnumber_suffix: "",
    sis_faculty: "",
    sis_position: "",
    sis_image: "",
  };

  const batchPrefixes = {
    "9A": "22UG1-",
    "10A": "23UG1-",
    "11A": "24UG1-",
    "12A": "25UG1-",
  };

  const faculties = [
    "Faculty of Computing and IT",
    "Faculty of Engineering",
    "Faculty of Technology",
    "Faculty of Music",
    "Faculty of Business",
  ];

  const positions = [
    "SIS President",
    "SIS Vice President",
    "SIS Secretary",
    "SIS Treasurer",
  ];

  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(null);
  
    // ✅ Hook to get election timing
    const { isNominationPeriod, status, loading } = useElectionStatus();

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function for Upload Image and Convert it Base64 Format
  const handleUploadPic = async (e, fieldName) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    console.log(`${fieldName} base64:`, imagePic);
    setData((prev) => ({
      ...prev,
      [fieldName]: imagePic,
    }));
  };

  const resetForm = () => {
    setData(initialData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prefix = batchPrefixes[data.sis_batch] || "";
    const fullRegNumber = prefix + data.sis_regnumber_suffix;

    const submitData = {
      sis_name: data.sis_name,
      sis_batch: data.sis_batch,
      sis_faculty: data.sis_faculty,
      sis_position: data.sis_position,
      sis_image: data.sis_image,
      sis_regnumber: fullRegNumber,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/addcandidate-sis-elec",
        {
          method: manageSisCandidateApi.manageSisCandidateReg.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );

      if (response.ok) {
        const dataApi = await response.json();
        toast.success(
          dataApi.message || "SIS Candidate Successfully Submitted"
        );
        resetForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Check your backend.");
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
              navigate("/dashboard_B"); // ⏰ redirect after time ends
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
            onClick={() => navigate("/dashboard_B")}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      );
    }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <p className="font-extrabold text-3xl mb-6">SIS Election Candidates</p>
      {/* ⏰ Remaining time display */}
      {remainingTime && (
        <div className="mb-6 ml-10 text-center text-lg font-bold text-orange-600 bg-white p-3 rounded-lg shadow-md">
          🕒 Nomination period ends in: {remainingTime}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-10 gap-6 w-full max-w-xl rounded-lg shadow-md bg-gradient-to-b from-emerald-950 to-emerald-100 text-white font-semibold"
      >
        {/* Name */}
        <div className="w-full mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="sis_name"
            value={data.sis_name}
            onChange={(e) => handleOnChange("sis_name", e.target.value)}
            className="w-full h-12 p-3 rounded-md bg-slate-200 text-black"
            placeholder="Enter candidate's name"
            required
          />
        </div>

        {/* Batch Dropdown */}
        <div className="w-full mb-4">
          <label className="block mb-1">Batch</label>
          <select
            name="sis_batch"
            value={data.sis_batch}
            onChange={(e) => handleOnChange("sis_batch", e.target.value)}
            className="w-full h-12 p-3 rounded-md bg-slate-200 text-black"
            required
          >
            <option value="" disabled>
              Select a batch
            </option>
            {Object.keys(batchPrefixes).map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        {/* Registration Number Input (Split) */}
        <div className="w-full mb-4">
          <label className="block mb-1">Registration Number</label>
          <div className="flex">
            <span className="flex items-center px-4 bg-gray-400 rounded-l-md text-black font-bold">
              {batchPrefixes[data.sis_batch] || "UG1-"}
            </span>
            <input
              type="text"
              name="sis_regnumber_suffix"
              value={data.sis_regnumber_suffix}
              onChange={(e) =>
                handleOnChange("sis_regnumber_suffix", e.target.value)
              }
              className="flex-1 h-12 p-3 rounded-r-md bg-slate-200 text-black"
              placeholder="Enter your number e.g., 0123"
              required
              disabled={!data.sis_batch}
            />
          </div>
        </div>

        {/* Faculty Dropdown */}
        <div className="w-full mb-4">
          <label className="block mb-1">Faculty</label>
          <select
            name="sis_faculty"
            value={data.sis_faculty}
            onChange={(e) => handleOnChange("sis_faculty", e.target.value)}
            className="w-full h-12 p-3 rounded-md bg-slate-200 text-black"
            required
          >
            <option value="" disabled>
              Select your faculty
            </option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        {/* Position Dropdown */}
        <div className="w-full mb-4">
          <label className="block mb-1">Position</label>
          <select
            name="sis_position"
            value={data.sis_position}
            onChange={(e) => handleOnChange("sis_position", e.target.value)}
            className="w-full h-12 p-3 rounded-md bg-slate-200 text-black"
            required
          >
            <option value="" disabled>
              Select position
            </option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="w-full mb-4">
          <label className="block mb-1">Upload Image</label>
          {data.sis_image && (
            <img
              src={data.sis_image}
              alt="Preview"
              className="w-20 h-20 rounded mb-2 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadPic(e, "sis_image")}
            className="w-full h-12 p-2 rounded-md bg-slate-200 text-black"
            required
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard_B/rightSideButton-ADMIN_B")}
          className="w-full py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddCandidatesSisElection;


