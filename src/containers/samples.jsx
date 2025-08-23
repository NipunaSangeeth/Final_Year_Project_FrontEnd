// const availabilityTable = require("../models/availabilityModel");
// const router = require("../routes");

// async function availabilityController(req, res) {
//   try {
//     const { faculty, department, timeRange, date, startTime, endTime } =
//       req.body;

//     const userAvalable = new availabilityTable({
//       faculty,
//       department,
//       timeRange,
//       date,
//       startTime,
//       endTime,
//     });

//     const saveAvalable = userAvalable.save();

//     res.status(201).json({
//       data: saveAvalable,
//       success: true,
//       error: false,
//       message: "User created Successfully",
//     });
//     console.log("req.body", req.body);
//   } catch (err) {
//     console.log(err, "print error"),
//       res.json({
//         message: err,
//         error: true,
//         success: false,
//       });
//   }
// }

// module.exports = availabilityController;

// //// create MoNgOdB schema

// const mongoose = require("mongoose");

// const availabilitySchema = new mongoose.Schema({
//   faculty: String,
//   department: String,
//   timeRange: String,
//   date: String,
//   startTime: String,
//   endTime: String,
// });

// const availabilityTable = mongoose.model("availability", availabilitySchema);
// module.exports = availabilityTable;
// ____________

//Get Lecture Data
//   getLecture: async (req, res) => {
//     try {
//       let lecturetables = await lectureTable.find();
//       console.log("All LectureData Fetched");
//       res.send(lecturetables);
//       // console.log("Hiiiii", lecturetables);
//     } catch (err) {
//       console.log(err);
//       res.status(400).json({
//         message: err.message || err,
//         error: true,
//         success: false,
//       });
//     }
//   },

//   router.get("/getmember", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const member = await addMemberTable.findById(id);
//       if (!member) {
//         return res.status(404).json({
//           message: "Member not found",
//           success: false,
//           error: true,
//         });
//       }

//       res.status(200).json({
//         data: member,
//         success: true,
//         error: false,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: "Server error",
//         error: true,
//         success: false,
//       });
//     }
// });
//??????????????????????????????????
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const Details = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Extract 'id' from URL parameters
//   const [member, setMember] = useState({
//     member_name: "",
//     nic: "",
//     distric: "",
//   });

//   // Fetch member details from backend
//   useEffect(() => {
//     const fetchMemberDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/api/getmember/${id}`
//         );
//         const data = await response.json();

//         if (data.success) {
//           setMember(data.data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching member details:", error);
//       }
//     };

//     fetchMemberDetails();
//   }, [id]);

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-white mb-6">
//           Voter Details
//         </h1>
//         <form className="flex flex-col gap-5">
//           {/* Name Input */}
//           <input
//             type="text"
//             value={member.member_name}
//             readOnly
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* NIC Input */}
//           <input
//             type="text"
//             value={member.nic}
//             readOnly
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* District Input */}
//           <input
//             type="text"
//             value={member.distric}
//             readOnly
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* Next Button */}
//           <button
//             type="button"
//             onClick={() => navigate("/nextpage")}
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//           >
//             NEXT
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Details;

// const express = require("express");
// const router = express.Router();
// const addMemberTable = require("../models/addMemberModel");

// // POST Route: Add a New Member
// router.post("/addmember", async (req, res) => {
//   try {
//     const { member_name, nic, distric } = req.body;

//     const newMember = new addMemberTable({
//       member_name,
//       nic,
//       distric,
//     });

//     const saveAddMember = await newMember.save();

//     res.status(200).json({
//       data: saveAddMember,
//       success: true,
//       error: false,
//       message: "New Member Added Successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error adding member",
//       error: true,
//       success: false,
//       details: err,
//     });
//   }
// });

// // GET Route: Fetch Member Details by ID
// router.get("/getmember/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const member = await addMemberTable.findById(id);

//     if (!member) {
//       return res.status(404).json({
//         message: "Member not found",
//         success: false,
//         error: true,
//       });
//     }

//     res.status(200).json({
//       data: member,
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Server error",
//       error: true,
//       success: false,
//       details: err,
//     });
//   }
// });

// module.exports = router;
// import { motion } from "framer-motion";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <h1 className="text-4xl font-bold text-white mb-8">
//         Administration Login
//       </h1>

//       <div className="flex flex-col gap-4 items-center w-80">
//         <div>
//           <input
//             type="email"
//             placeholder="User Name"
//             className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <span>
//             <FaEye />
//           </span>
//         </div>
//         {/* <input
//           type="email"
//           placeholder="User Name"
//           className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//         /> */}
//         {/* <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//         /> */}

//         <p className="text-black text-sm mt-2 gap-5">Don't have an Account</p>
//       </div>

//       <div className="flex flex-col gap-5 w-40">
//         <button
//           onClick={() => navigate("/voter")}
//           className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
//         >
//           Voter's Login
//         </button>

//         <motion.button
//           onClick={() => navigate("/details")}
//           className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//         >
//           Sign Up
//         </motion.button>
//       </div>
//     </div>
//   );
// };
// export default Login;

// import React, { useState } from "react";

// // Import images from your assets folder
// import candidate1 from "../assets/images/candidate1.png";
// import candidate2 from "../assets/images/candidate2.png";
// import candidate3 from "../assets/images/candidate3.png";
// import candidate4 from "../assets/images/candidate4.png";

// const candidates = [
//   {
//     id: 1,
//     candidateImg: candidate1,
//     symbolImg: candidate1,
//     details: "Name 1\nNumber 1",
//   },
//   {
//     id: 2,
//     candidateImg: candidate2,
//     symbolImg: candidate2,
//     details: "Name 2\nNumber 2",
//   },
//   {
//     id: 3,
//     candidateImg: candidate3,
//     symbolImg: candidate3,
//     details: "Name 3\nNumber 3",
//   },
//   {
//     id: 4,
//     candidateImg: candidate4,
//     symbolImg: candidate4,
//     details: "Name 4\nNumber 4",
//   },
// ];

// // Function to generate a random binary hash
// const generateBinaryHash = (candidateId) => {
//   // Get current timestamp
//   const timestamp = Date.now().toString(2); // Convert to binary

//   // Generate random 8-bit binary number
//   const randomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");

//   // Combine candidate ID (as binary), timestamp, and random bits
//   const candidateBinary = candidateId.toString(2).padStart(4, "0");

//   // Create final hash by combining all components
//   const binaryHash = `${candidateBinary}-${randomBits}-${timestamp}`;

//   return binaryHash;
// };

// const Placevotes = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [voteHash, setVoteHash] = useState("");

//   const handleSelection = (id) => {
//     if (!hasVoted) {
//       setSelectedCandidate(id);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedCandidate) {
//       setIsSubmitting(true);

//       // Generate unique binary hash for this vote
//       const newVoteHash = generateBinaryHash(selectedCandidate);
//       setVoteHash(newVoteHash);

//       // Log the voting details to console
//       console.log("Vote submitted with details:", {
//         candidate: selectedCandidate,
//         binaryHash: newVoteHash,
//         timestamp: new Date().toISOString(),
//       });

//       // Simulate blockchain voting submission
//       setTimeout(() => {
//         alert(
//           `Your vote for Candidate ${selectedCandidate} has been recorded!\nBinary Hash: ${newVoteHash}`
//         );
//         setHasVoted(true);
//         setIsSubmitting(false);
//       }, 1500);
//     } else {
//       alert("Please select a candidate before submitting!");
//     }
//   };

//   const resetVoting = () => {
//     setSelectedCandidate(null);
//     setHasVoted(false);
//     setVoteHash("");
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       {hasVoted ? (
//         <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
//           <p className="text-white text-xl mb-4">
//             Your vote has been successfully recorded!
//           </p>
//           <div className="bg-gray-800 p-4 rounded mb-6">
//             <p className="text-gray-300 font-mono text-sm break-all">
//               Binary Hash:
//             </p>
//             <p className="text-green-400 font-mono text-sm break-all">
//               {voteHash}
//             </p>
//           </div>
//           <button
//             onClick={resetVoting}
//             className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             Demo: Vote Again
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-4xl">
//             <table className="table-auto w-full text-left text-white">
//               <thead>
//                 <tr className="border-b border-gray-600">
//                   <th className="px-4 py-3">Candidate</th>
//                   <th className="px-4 py-3">Symbol</th>
//                   <th className="px-4 py-3">Details</th>
//                   <th className="px-4 py-3 text-center">Select</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate) => (
//                   <tr
//                     key={candidate.id}
//                     className={`border-b border-gray-700 hover:bg-gray-700 transition-all ${
//                       hasVoted && selectedCandidate !== candidate.id
//                         ? "opacity-40"
//                         : ""
//                     } ${
//                       selectedCandidate === candidate.id
//                         ? "bg-gray-700 bg-opacity-70"
//                         : ""
//                     }`}
//                   >
//                     <td className="px-4 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={candidate.candidateImg}
//                           alt={`Candidate ${candidate.id}`}
//                           className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
//                         />
//                         <span className="ml-3 font-medium">
//                           Candidate {candidate.id}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <img
//                         src={candidate.symbolImg}
//                         alt={`Symbol ${candidate.id}`}
//                         className="h-12 w-12 object-contain"
//                       />
//                     </td>
//                     <td className="px-4 py-4 whitespace-pre-line">
//                       {candidate.details}
//                     </td>
//                     <td className="px-4 py-4 text-center">
//                       <input
//                         type="radio"
//                         name="candidateSelection"
//                         className="h-5 w-5 cursor-pointer"
//                         checked={selectedCandidate === candidate.id}
//                         onChange={() => handleSelection(candidate.id)}
//                         disabled={hasVoted}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-8 flex flex-col items-center">
//             <button
//               className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
//                 isSubmitting
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : selectedCandidate
//                   ? "bg-orange-500 hover:bg-orange-600"
//                   : "bg-gray-600 cursor-not-allowed"
//               }`}
//               onClick={handleSubmit}
//               disabled={!selectedCandidate || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Generating Vote Hash...
//                 </span>
//               ) : (
//                 "CONFIRM VOTE"
//               )}
//             </button>

//             {selectedCandidate && !hasVoted && (
//               <p className="mt-4 text-gray-300 text-sm">
//                 You are voting for:{" "}
//                 <span className="font-bold">Candidate {selectedCandidate}</span>
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Placevotes;

// import React from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const ElectionResults = () => {
//   // Sample data for 4 candidates
//   const candidates = [
//     {
//       id: 1,
//       name: "Kasun Subasignha",
//       image: "https://randomuser.me/api/portraits/men/1.jpg",
//       votes: 420,
//       color: "#3B82F6", // blue
//     },
//     {
//       id: 2,
//       name: "Upuli Seerashinha",
//       image: "https://randomuser.me/api/portraits/women/1.jpg",
//       votes: 320,
//       color: "#10B981", // green
//     },
//     {
//       id: 3,
//       name: "Radun Ganukkaduwa",
//       image: "https://randomuser.me/api/portraits/men/2.jpg",
//       votes: 180,
//       color: "#F59E0B", // amber
//     },
//     {
//       id: 4,
//       name: "Inuru Radawadunna",
//       image: "https://randomuser.me/api/portraits/women/2.jpg",
//       votes: 80,
//       color: "#EF4444", // red
//     },
//   ];

//   const totalVotes = 1000;

//   // Bar chart data
//   const barData = {
//     labels: candidates.map((c) => c.name),
//     datasets: [
//       {
//         label: "Votes",
//         data: candidates.map((c) => c.votes),
//         backgroundColor: candidates.map((c) => c.color),
//         borderColor: candidates.map((c) => c.color),
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Pie chart data
//   const pieData = {
//     labels: candidates.map((c) => c.name),
//     datasets: [
//       {
//         data: candidates.map((c) => c.votes),
//         backgroundColor: candidates.map((c) => c.color),
//         borderColor: "#fff",
//         borderWidth: 2,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Election Results
//         </h1>
//         <p className="text-gray-600 mb-8">Total Votes Cast: {totalVotes}</p>

//         {/* Bar Chart Section */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Vote Distribution
//           </h2>
//           <div className="h-96">
//             <Bar
//               data={barData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     max: 500,
//                     ticks: {
//                       stepSize: 100,
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>

//         {/* Candidate Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {candidates.map((candidate) => (
//             <div
//               key={candidate.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="p-4">
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={candidate.image}
//                     alt={candidate.name}
//                     className="w-16 h-16 rounded-full object-cover border-4"
//                     style={{ borderColor: candidate.color }}
//                   />
//                   <div className="ml-4">
//                     <h3 className="font-bold text-gray-800">
//                       {candidate.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Candidate #{candidate.id}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div>
//                     <span className="text-gray-600">Votes: </span>
//                     <span className="font-semibold">{candidate.votes}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-600">Percentage: </span>
//                     <span className="font-semibold">
//                       {((candidate.votes / totalVotes) * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div
//                       className="h-2.5 rounded-full"
//                       style={{
//                         width: `${(candidate.votes / totalVotes) * 100}%`,
//                         backgroundColor: candidate.color,
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pie Chart Section */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Vote Percentage
//           </h2>
//           <div className="h-96">
//             <Pie
//               data={pieData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: "right",
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ElectionResults;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Add this import
// import { Bar, Pie } from "react-chartjs-2";
// // ... (other imports remain the same)

// const PreElecResult = () => {
//   const navigate = useNavigate(); // Add this line
//   const [activeTab, setActiveTab] = useState("president");
//   const [expandedYear, setExpandedYear] = useState(2025);

//   // ... (rest of your component code remains the same until the return statement)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             className="flex items-center text-blue-600 hover:text-blue-800"
//             onClick={() => navigate(-1)} // Or navigate('/your-path') for specific route
//           >
//             <FiArrowLeft className="mr-2" />
//             Back to Dashboard
//           </button>
//           <h1 className="text-3xl font-bold text-white">Election History</h1>
//           <div className="w-24"></div> {/* Spacer for alignment */}
//         </div>

//         {/* ... rest of your component code remains the same ... */}
//       </div>
//     </div>
//   );
// };

// export default PreElecResult;
// __________________;

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
//   const navigate = useNavigate();

//   const handleOnChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetForm = () => {
//     setData(initialData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // ✅ fixed typo

//     try {
//       const response = await fetch("http://localhost:8000/api/addmember", {
//         method: managePreMemberApi.managePreMemReg.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const dataApi = await response.json();
//         console.log("Request Data", dataApi);

//         toast.success(dataApi.message || "Voter Successfully Submitted");

//         resetForm();
//       } else {
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Something went wrong. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-10">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-lg bg-gradient-to-b from-emerald-950 to-emerald-100"
//       >
//         {/* Member Name */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Member Name</label>
//           <input
//             type="text"
//             name="member_name" // ✅ fixed name
//             value={data.member_name}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the Name"
//             required
//           />
//         </div>

//         {/* NIC */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">NIC</label>
//           <input
//             type="text"
//             name="nic" // ✅ fixed name
//             value={data.nic}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the NIC"
//             required
//           />
//         </div>

//         {/* DOB */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">DOB</label>
//           <input
//             type="date" // ✅ improved UX
//             name="dob" // ✅ fixed name
//             value={data.dob}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             required
//           />
//         </div>

//         {/* Gender */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Gender</label>
//           <select
//             name="gender" // ✅ fixed name
//             value={data.gender}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             required
//           >
//             <option value="">Select the Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         {/* District */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">District</label>
//           <input
//             type="text"
//             name="distric" // ✅ fixed name
//             value={data.distric}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-full h-12 text-center bg-slate-300 rounded-md p-2"
//             placeholder="Type the District"
//             required
//           />
//         </div>

//         {/* Fingerprint (Placeholder Button) */}
//         <div className="flex flex-col w-full mb-5">
//           <label className="text-lg mb-2 text-center">Fingerprint</label>
//           <button
//             type="button"
//             // onClick={handleFingerprintScan}
//             className="bg-blue-500 mt-4 px-8 py-2 hover:bg-blue-600 rounded-full text-white"
//           >
//             Scan Fingerprint
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 focus:outline-none"
//         >
//           DONE
//         </button>

//         {/* Back Button */}
//         <button
//           type="button"
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
// //

//@@@@@@@@@@@@@@@@@@@@@@

// const addCandidateSisElecTable = require("../models/addCandidatesSisElecModel");

// const manageCandidateSisElecCtrl = {
//   addCandidateSisElecData: async (req, res) => {
//     try {
//       const {
//         sis_name,
//         sis_regnumber,
//         sis_batch,
//         sis_faculty,
//         sis_position,
//         sis_image,
//       } = req.body;

//       // Check if the registration number already exists
//       const existingCandidate = await addCandidateSisElecTable.findOne({
//         sis_regnumber: sis_regnumber,
//       });

//       if (existingCandidate) {
//         return res.status(400).json({
//           success: false,
//           message:
//             "This Registration Number already exists. Please use a different one.",
//         });
//       }

//       // If not exist, then proceed to save
//       const newCandidateSisElec = new addCandidateSisElecTable({
//         sis_name,
//         sis_regnumber,
//         sis_batch,
//         sis_faculty,
//         sis_position,
//         sis_image,
//       });

//       await newCandidateSisElec.save();

//       return res.status(201).json({
//         success: true,
//         message: "SIS Candidate Added Successfully",
//       });
//     } catch (error) {
//       console.error("Error adding SIS candidate:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Server Error: Unable to add candidate.",
//         error: error.message,
//       });
//     }
//   },

//   getCandidateSisElec: async (req, res) => {
//     try {
//       const candidates = await addCandidateSisElecTable.find();
//       console.log("All SIS Candidates data fetched");
//       return res.status(200).json(candidates);
//     } catch (err) {
//       console.log("Failed to fetch candidates:", err);
//       return res.status(400).json({
//         message: err.message || "Error fetching data",
//         success: false,
//         error: true,
//       });
//     }
//   },
// };

// module.exports = manageCandidateSisElecCtrl;

// server/config/redis.js
// ✅ Responsible for connecting to your Redis instance

// const { createClient } = require('redis');

// // Create the Redis client with default localhost:6379
// const redisClient = createClient({
//   url: 'redis://localhost:6379',
// });

// // Listen for Redis errors
// redisClient.on('error', (err) => {
//   console.error('❌ Redis Client Error:', err);
// });

// // Connect to Redis
// (async () => {
//   await redisClient.connect();
//   console.log('✅ Redis connected!');
// })();

// module.exports = redisClient;

// // server/controller/manageShowVoteCtrl.js

// const redisClient = require("../config/redis"); // ✅ Import the Redis connection

// const manageShowVoteCtrl = {

//   // ✅ 1. This endpoint receives a vote & counts it
//   getshowvot: async (req, res) => {
//     const { decrypted_vote } = req.body;

//     console.log("📥 New decrypted vote:", decrypted_vote);

//     // Example decrypted_vote: "1010101011001101:Kasun Subasignha:101"
//     // Split by ":" to extract parts
//     const parts = decrypted_vote.split(':');
//     const voterId = parts[0];
//     const candidateName = parts[1];
//     const candidateNumber = parts[2]; // e.g., 101

//     if (!candidateName || !candidateNumber) {
//       return res.status(400).json({ message: "Invalid vote format" });
//     }

//     // ✅ Build a Redis key: election:2025_president:101_Kasun_Subasignha
//     const redisKey = `votes:2025_president:${candidateNumber}_${candidateName.replace(/\s+/g, '_')}`;

//     // ✅ Increment the vote count in Redis
//     await redisClient.incr(redisKey);

//     console.log(`✅ Vote counted for ${candidateName} (#${candidateNumber})`);
//     res.status(200).json({
//       message: `Vote counted for ${candidateName} (#${candidateNumber})`
//     });
//   },

//   // ✅ 2. This endpoint returns all live counts for all candidates
//   getVoteCounts: async (req, res) => {
//     try {
//       // Example: scan Redis for keys starting with votes:2025_president:
//       const pattern = "votes:2025_president:*";
//       const keys = await redisClient.keys(pattern);

//       let results = {};

//       for (const key of keys) {
//         const count = await redisClient.get(key);
//         results[key] = parseInt(count);
//       }

//       console.log("📊 Live vote counts:", results);

//       res.status(200).json(results);

//     } catch (err) {
//       console.error("❌ Failed to get vote counts", err);
//       res.status(500).json({ message: "Failed to get vote counts" });
//     }
//   },

// };

// module.exports = manageShowVoteCtrl;

// // server/index.js

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// const connectDB = require("./config/db");
// const redisClient = require("./config/redis"); // ✅ This will auto-connect
// const router = require("./routes");

// const app = express();
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(cookieParser());

// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   credentials: true,
// }));

// // ✅ Use your routes
// app.use("/api", router);

// const PORT = process.env.PORT || 8000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`✅ MongoDB connected`);
//     console.log(`✅ Redis ready`);
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// });

// getVoteCounts: async (req, res) => {
//   try {
//     let cursor = 0;
//     let keys = [];
//     const pattern = "votes:2025_president:*";

//     do {
//       const [nextCursor, foundKeys] = await redisClient.scan(cursor, "MATCH", pattern, "COUNT", "100");
//       cursor = Number(nextCursor);
//       keys = keys.concat(foundKeys);
//     } while (cursor !== 0);

//     const results = {};

//     for (const key of keys) {
//       const count = await redisClient.get(key);
//       results[key] = parseInt(count);
//     }

//     console.log("📊 Live vote counts:", results);
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("❌ Failed to get vote counts:", err);
//     res.status(500).json({ message: "Failed to get vote counts 😕" });
//   }

// $$$$$$$$$$$$$$_________$$$$$$$$$$$$$

const redisClient = require("../config/redis");
const addCandidateTable = require("../models/addCandidatesModel");

const manageShowVoteCtrl = {
  getshowvot: async (req, res) => {
    const { decrypted_vote } = req.body;

    console.log("\n🔵 ================================");
    console.log(`📥 Incoming decrypted vote: ${decrypted_vote}`);
    console.log("🔵 ================================");

    const part = decrypted_vote.split(":");
    const voterRandomBits = part[0];
    const candidateName = part[1];

    if (!voterRandomBits || !candidateName) {
      console.log("🚫 [Rejected] Invalid format: missing fields");
      return res.status(400).json({ message: "🚫 Invalid Vote Format" });
    }

    // Unique code check
    const codeKey = `voterRandomBits:${voterRandomBits}`;
    const setResult = await redisClient.set(codeKey, "1", {
      NX: true,
      EX: 86400,
    });

    if (setResult === null) {
      console.log(`🚫 [Rejected] Duplicate code: ${voterRandomBits}`);
      return res.status(400).json({
        message: "🚫 Duplicate vote code — vote rejected",
      });
    }

    // Validate candidate name
    const candidate = await addCandidateTable.findOne({
      candidate_name: candidateName,
    });

    if (!candidate) {
      console.log(`🚫 [Rejected] Invalid candidate name: ${candidateName}`);
      return res.status(400).json({
        message: "🚫 Invalid candidate name — vote rejected",
      });
    }

    // Build safe Redis key
    const safeCandidateName = candidateName.replace(/\s+/g, "_");
    const redisKey = `Votes:2025_president:${safeCandidateName}`;

    try {
      await redisClient.incr(redisKey);
      console.log(`✅ [Accepted] Vote COUNTED for: ${candidateName}`);
      return res.status(200).json({
        message: `☑️ Vote counted for: ${candidateName}`,
      });
    } catch (err) {
      console.error("❌ Redis increment failed:", err);
      return res.status(500).json({
        message: "Server error counting vote",
      });
    }
  },

  getVoteCounts: async (req, res) => {
    try {
      let cursor = "0";
      let keys = [];
      const pattern = "Votes:2025_president:*";

      do {
        const { cursor: nextCursor, keys: foundKeys } = await redisClient.scan(
          cursor,
          "MATCH",
          pattern,
          "COUNT",
          "100"
        );
        cursor = nextCursor;
        keys = keys.concat(foundKeys);
      } while (cursor !== "0");

      const results = {};
      for (const key of keys) {
        const count = await redisClient.get(key);
        results[key] = parseInt(count);
      }

      console.log("\n📊 ================================");
      console.log("📊 Current VALID vote counts:");
      console.log(results);
      console.log("📊 ================================");

      res.status(200).json(results);
    } catch (error) {
      console.error("❌ Failed to get vote counts", error);
      res.status(500).json({ message: "Failed to get vote counts 😕" });
    }
  },
};

module.exports = manageShowVoteCtrl;
