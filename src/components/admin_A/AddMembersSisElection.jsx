import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import manageSisMemberApi from "../../common/sisMembers";
import { toast } from "react-toastify";

const AddMembersSisElection = () => {
  const initialData = {
    student_name: "",
    register_number: "",
    batch: "",
    faculty: "",
    sis_finger_print: "",
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-10">
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
