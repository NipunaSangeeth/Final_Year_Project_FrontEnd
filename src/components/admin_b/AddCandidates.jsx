import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageTobase64 from "../../helper/imageTobase64";
import managePreCandidateApi from "../../common/PresidentCandidate";

import { toast } from "react-toastify";
import { useElectionStatus } from "../../hooks/useElectionStatus";

const AddCandidates = () => {
  const initialData = {
    candidate_name: "",
    candidate_nic: "",
    candidate_dob: "",
    candidate_district: "",
    candidate_party: "",
    candidate_simbol: "",
    candidate_number: "",
    candidate_image: "",
  };

  const [remainingTime, setRemainingTime] = useState(null);

  // ✅ Hook to get election timing
  const { isNominationPeriod, status, loading } = useElectionStatus();

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData(initialData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/addcandidate", {
        method: managePreCandidateApi.managePreCandidateReg.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Check the Request Was Successfully...
      if (response.ok) {
        const dataApi = await response.json();
        console.log("Request Data", dataApi);

        toast.success(dataApi.message || "Candidate Sucessfuly Submit");
        // reset the Form
        resetForm();
      } else {
        // Help for Handle the case the REQ is not Success
        const errorData = await response.json();
        toast.error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error is: ", error);
    }
  };
  const [data, setData] = useState(initialData);

  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center">
      <p className="font-extrabold text-4xl pt-4">Pesident Election </p>

      {remainingTime && (
        // <div className="flex flex-col mb-6 text-center text-lg font-bold text-orange-600 bg-white p-3 rounded-lg shadow-md">
        <div className="flex flex-col mb-1 text-lg font-bold text-orange-600 bg-white p-3 rounded-lg shadow-md w-fit h-16 self-start text-left border-4 border-rose-600">
          {" "}
          🕒 Nomination period ends in: {remainingTime}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md"
      >
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Name</label>
          <input
            type="text"
            name="candidate_name"
            value={data.candidate_name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Name"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NIC</label>
          <input
            type="text"
            name="candidate_nic"
            value={data.candidate_nic}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the NIC"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">DOB</label>
          <input
            type="text"
            name="candidate_dob"
            value={data.candidate_dob}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the DOB"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">District</label>
          <input
            type="text"
            name="candidate_district"
            value={data.candidate_district}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the District"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Political party</label>
          <input
            type="text"
            name="candidate_party"
            value={data.candidate_party}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the Political party"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">SYMBOL</label>

          <img
            src={data.candidate_simbol}
            alt="Symbol icon"
            className="w-16 h-16 object-cover rounded"
          />
          <input
            type="file"
            name="candidate_simbol"
            //onChange={handleUploadPic}
            onChange={(e) => handleUploadPic(e, "candidate_simbol")} // (e, fieldName = candidate_simbol)
            //value={data.candidate_simbol}
            //onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the SYMBOL"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">NUMBER</label>
          <input
            type="text"
            name="candidate_number"
            value={data.candidate_number}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Enter the NUMBER"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">IMAGE</label>
          <img
            src={data.candidate_image}
            alt="Candidate image"
            className="w-16 h-16 object-cover rounded"
          />
          <input
            type="file"
            name="candidate_image"
            //value={data.candidate_image}
            //onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            onChange={(e) => handleUploadPic(e, "candidate_image")} // (e, fieldName = candidate_image)
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Drag the IMAGE"
            required
          />
        </div>

        <button
          className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
          //onClick={""}
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/dashboard_B/rightSideButton-ADMIN_B")}
          className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddCandidates;

//_____________________
