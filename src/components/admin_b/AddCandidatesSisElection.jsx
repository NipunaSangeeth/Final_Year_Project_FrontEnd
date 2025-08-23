// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import manageSisCandidateApi from "../../common/sisCandidate";
// import imageTobase64 from "../../helper/imageTobase64";
// import { toast } from "react-toastify";

// const AddCandidatesSisElection = () => {
//   // const [data, setdata] = useState({
//   //   sis_name: "",
//   //   sis_regnumber: "",
//   //   sis_batch: "",
//   //   sis_faculty: "",
//   //   sis_position: "",
//   //   sis_image: "",
//   // });

//   const initialData = {
//     sis_name: "",
//     sis_regnumber: "",
//     sis_batch: "",
//     sis_faculty: "",
//     sis_position: "",
//     sis_image: "",
//   };
//   const handleOnChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetForm = () => {
//     setData(initialData);
//   };

//   // function for Upload Image and Convert it Base64 Format
//   const handleUploadPic = async (e, fieldName) => {
//     const file = e.target.files[0];
//     const imagePic = await imageTobase64(file);
//     console.log(`${fieldName} base64:`, imagePic);

//     setData((prev) => ({
//       ...prev,
//       [fieldName]: imagePic,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/addcandidate-sis-elec",
//         {
//           method: manageSisCandidateApi.manageSisCandidateReg.method,
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       // Check the Request Was Successfully...
//       if (response.ok) {
//         const dataApi = await response.json();
//         console.log("Request Data", dataApi);

//         toast.success(dataApi.message || "SIS Candidate Sucessfuly Submit");
//         // reset the Form
//         resetForm();
//       } else {
//         // Help for Handle the case the REQ is not Success
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Something went wrong. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error is: ", error);
//     }
//   };
//   const [data, setData] = useState(initialData);

//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center p-10">
//       <p className="font-extrabold text-3xl">SIS Election Candidates </p>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-lgbg-gradient-to-b from-emerald-950 to-emerald-100"
//       >
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Name</label>
//           <input
//             type="text"
//             name="sis_name"
//             value={data.sis_name}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Name"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">
//             Registration Number
//           </label>
//           <input
//             type="text"
//             name="sis_regnumber"
//             value={data.sis_regnumber}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Registration Number"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Batch</label>
//           <input
//             type="text"
//             name="sis_batch"
//             value={data.sis_batch}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Batch"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Faculty</label>
//           <input
//             type="text"
//             name="sis_faculty"
//             value={data.sis_faculty}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Faculty"
//             required
//           />
//         </div>

//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Position</label>
//           <input
//             type="text"
//             name="sis_position"
//             value={data.sis_position}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Faculty"
//             required
//           />
//         </div>
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">IMAGE</label>
//           <img
//             src={data.sis_image}
//             alt="Candidate Image"
//             className="w-16 h-16 object-cover rounded"
//           />
//           <input
//             type="file"
//             name="sis_image"
//             onChange={(e) => handleUploadPic(e, "sis_image")}
//             className="w- h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Drag the IMAGE"
//             required
//           />
//         </div>

//         <button className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none">
//           DONE
//         </button>

//         <button
//           onClick={() => navigate("/dashboard_B/rightSideButton-ADMIN_B")}
//           className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
//         >
//           Back
//         </button>
//       </form>
//     </div>
//   );
// };
// export default AddCandidatesSisElection;

//___________________$$$$$$$$$$$$$$$$$____________________

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import manageSisCandidateApi from "../../common/sisCandidate";
import imageTobase64 from "../../helper/imageTobase64";
import { toast } from "react-toastify";

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

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <p className="font-extrabold text-3xl mb-6">SIS Election Candidates</p>

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
