import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageTobase64 from "../../helper/imageTobase64";
import managePreCandidateApi from "../../common/PresidentCandidate";

import { toast } from "react-toastify";

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

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setData(initialData);
  };

  // const handleUplodpic = async (e) => {
  //   const file = e.target.files[0];

  //   const imagePic = await imageTobase64(file);
  //   console.log("imagePic", imagePic);

  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       candidate_simbol: imagePic,
  //     };
  //   });
  // };

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

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-extrabold text-3xl">Pesident Election </p>
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
