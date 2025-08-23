import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import managePreMemberApi from "../../common/presidentMembers";
import { toast } from "react-toastify";

const AddMembers = () => {
  const initialData = {
    member_name: "",
    nic: "",
    dob: "",
    gender: "",
    distric: "",
    finger_print: "",
  };
  const [data, setData] = useState(initialData);

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
      const response = await fetch("http://localhost:8000/api/addmember", {
        method: managePreMemberApi.managePreMemReg.method,
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
        toast.success(dataApi.message || "Voter Sucessfuly Submit");

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

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-10">
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
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
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
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
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
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the DOB"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Gender</label>
          <select
            type="text"
            name="gender"
            value={data.gender}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Gender"
            required
          >
            <option value="">Select the Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2 text-center">Distric</label>
          <input
            type="text"
            name="distric"
            value={data.distric}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            className="w- h-12 text-center bg-slate-300 rounded-md p-2"
            placeholder="Type the Distric"
            required
          />
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

        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
          //onClick={""}
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
