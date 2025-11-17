// ###################_2025/11/07 mofification_################
// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";

// const CreateElection = () => {
//   const [electionType, setElectionType] = useState("");
//   const [nominationStart, setNominationStart] = useState("");
//   const [nominationEnd, setNominationEnd] = useState("");
//   const [delay, setDelay] = useState("");
//   const [electionStart, setElectionStart] = useState("");
//   const [electionEnd, setElectionEnd] = useState("");
//   const [errors, setErrors] = useState({});
//   const [statusMessages, setStatusMessages] = useState([]);

//   const delayOptions = [
//     { label: "5 minutes", value: 5 },
//     { label: "10 minutes", value: 10 },
//     { label: "30 minutes", value: 30 },
//     { label: "1 hour", value: 60 },
//   ];

//   // 🧮 Automatically calculate election start time after nomination end + delay
//   useEffect(() => {
//     if (nominationEnd && delay) {
//       const calcStart = dayjs(nominationEnd).add(delay, "minute");
//       setElectionStart(calcStart.format("YYYY-MM-DDTHH:mm"));
//     }
//   }, [nominationEnd, delay]);

//   // 🧠 Validation Logic
//   const validateForm = () => {
//     const newErrors = {};

//     if (!electionType) newErrors.electionType = "Election type is required.";
//     if (!nominationStart) newErrors.nominationStart = "Nomination start is required.";
//     if (!nominationEnd) newErrors.nominationEnd = "Nomination end is required.";
//     if (!delay) newErrors.delay = "Please select delay time.";
//     if (!electionStart) newErrors.electionStart = "Election start is required.";
//     if (!electionEnd) newErrors.electionEnd = "Election end is required.";

//     if (nominationStart && nominationEnd && dayjs(nominationEnd).isBefore(dayjs(nominationStart))) {
//       newErrors.nominationEnd = "Nomination end must be after start.";
//     }

//     if (electionStart && electionEnd && dayjs(electionEnd).isBefore(dayjs(electionStart))) {
//       newErrors.electionEnd = "Election end must be after start.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // 🕒 Simulated Scheduler Logs (Frontend only preview)
//   const simulateStatusLogs = (type) => {
//     const now = dayjs();
//     const nominationEndTime = dayjs(nominationEnd);
//     const electionStartTime = dayjs(electionStart);
//     const electionEndTime = dayjs(electionEnd);

//     const newLogs = [
//       `✅ Election saved to MongoDB: new ObjectId('mock_${Math.random().toString(36).slice(2, 10)}')`,
//       `🕒 Scheduler started: checking every 30 seconds...`,
//     ];

//     // Mock scheduler simulation
//     setStatusMessages(newLogs);

//     setTimeout(() => {
//       setStatusMessages((prev) => [...prev, `Nomination time Ended..`]);
//     }, 2000);

//     setTimeout(() => {
//       const diff = electionStartTime.diff(now, "minute");
//       setStatusMessages((prev) => [
//         ...prev,
//         `[countdown] - ${diff} minutes left to start...`,
//       ]);
//     }, 4000);

//     setTimeout(() => {
//       setStatusMessages((prev) => [
//         ...prev,
//         `🚀 Election "${type}" is now RUNNING`,
//       ]);
//     }, 6000);

//     setTimeout(() => {
//       setStatusMessages((prev) => [
//         ...prev,
//         `🏁 Election "${type}" is COMPLETED`,
//       ]);
//     }, 9000);
//   };

//   // 🚀 Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const payload = {
//       electionType,
//       nominationStartAt: nominationStart,
//       nominationEndAt: nominationEnd,
//       delayBeforeStart: `${delay}min`,
//       electionStartAt: electionStart,
//       electionEndAt: electionEnd,
//     };

//     console.log("🗳️ Sending Payload:", payload);

//     try {
//       const res = await fetch("http://localhost:8000/api/create-election", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to create election");

//       const data = await res.json();
//       simulateStatusLogs(electionType); // Show simulated scheduler logs
//       alert("✅ Election Created Successfully!");
//       console.log("Backend Response:", data);
//     } catch (error) {
//       console.error("❌ Error creating election:", error);
//       alert("❌ Failed to connect to backend.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-start md:items-center min-h-screen bg-gray-50 p-6 gap-8">
//       {/* Left: Form */}
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           🗳️ Create Election
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Election Type */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Election Type
//             </label>
//             <select
//               value={electionType}
//               onChange={(e) => setElectionType(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             >
//               <option value="">Select Election Type</option>
//               <option value="president">President Election</option>
//               <option value="sis">SIS Election</option>
//             </select>
//             {errors.electionType && (
//               <p className="text-red-500 text-sm">{errors.electionType}</p>
//             )}
//           </div>

//           {/* Nomination Start */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Nomination Start
//             </label>
//             <input
//               type="datetime-local"
//               value={nominationStart}
//               onChange={(e) => setNominationStart(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//             {errors.nominationStart && (
//               <p className="text-red-500 text-sm">{errors.nominationStart}</p>
//             )}
//           </div>

//           {/* Nomination End */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Nomination End
//             </label>
//             <input
//               type="datetime-local"
//               value={nominationEnd}
//               onChange={(e) => setNominationEnd(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//             {errors.nominationEnd && (
//               <p className="text-red-500 text-sm">{errors.nominationEnd}</p>
//             )}
//           </div>

//           {/* Delay */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Delay Before Election
//             </label>
//             <select
//               value={delay}
//               onChange={(e) => setDelay(Number(e.target.value))}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             >
//               <option value="">Select Delay</option>
//               {delayOptions.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//             {errors.delay && (
//               <p className="text-red-500 text-sm">{errors.delay}</p>
//             )}
//           </div>

//           {/* Election Start */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Election Start (Auto + Editable)
//             </label>
//             <input
//               type="datetime-local"
//               value={electionStart}
//               onChange={(e) => setElectionStart(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//             {errors.electionStart && (
//               <p className="text-red-500 text-sm">{errors.electionStart}</p>
//             )}
//           </div>

//           {/* Election End */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">
//               Election End
//             </label>
//             <input
//               type="datetime-local"
//               value={electionEnd}
//               onChange={(e) => setElectionEnd(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//             {errors.electionEnd && (
//               <p className="text-red-500 text-sm">{errors.electionEnd}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
//           >
//             Create Election
//           </button>
//         </form>
//       </div>

//       {/* Right: Simulated Output */}
//       <div className="bg-gray-900 text-green-400 rounded-2xl p-6 w-full max-w-md font-mono">
//         <h3 className="text-lg font-semibold mb-3 text-white">
//           🧩 Election Status Simulation
//         </h3>
//         <div className="space-y-1 overflow-y-auto h-72 scrollbar-thin scrollbar-thumb-gray-700">
//           {statusMessages.length > 0 ? (
//             statusMessages.map((msg, i) => <p key={i}>{msg}</p>)
//           ) : (
//             <p className="text-gray-400 italic">
//               Status messages will appear here after creation...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateElection;

// //###########################_2025/11/08_###(workinrate - 100%)############################
// // CreateElection.jsx (full - React + Tailwind)
// // ---------------------------------------------------------
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// /**
//  * CreateElection component
//  * - Validates nomination/election times and delay
//  * - Auto-suggests election start = nominationEnd + delay
//  * - Polls backend for latest election status and shows color indicators
//  * - Disables create when an active election exists (status !== 'completed')
//  */

// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "", // ISO local (YYYY-MM-DDTHH:mm)
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null); // latest election from backend
//   const [statusLoading, setStatusLoading] = useState(false);
//   const pollRef = useRef(null);

//   // fetch latest election status from backend
//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) {
//         setServerStatus(res.data.data);
//       } else {
//         setServerStatus(null);
//       }
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//       // keep serverStatus as-is (avoid clearing)
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // poll every 15 seconds for status updates
//   useEffect(() => {
//     fetchStatus(); // initial
//     pollRef.current = setInterval(fetchStatus, 15000);
//     return () => clearInterval(pollRef.current);
//   }, []);

//   // Auto-suggest electionStart when nominationEnd or delay changes
//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const delayObj = DELAYS.find((d) => d.value === delayBeforeStart);
//       const minutes = delayObj ? delayObj.minutes : 0;
//       const suggested = dayjs(nominationEndAt).add(minutes, "minute");
//       setForm((prev) => ({
//         ...prev,
//         electionStartAt: suggested.format("YYYY-MM-DDTHH:mm"),
//       }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   // Validation
//   const validate = () => {
//     const e = {};
//     const {
//       electionType,
//       nominationStartAt,
//       nominationEndAt,
//       delayBeforeStart,
//       electionStartAt,
//       electionEndAt,
//     } = form;

//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";

//     if (nominationStartAt && nominationEndAt && dayjs(nominationEndAt).isBefore(dayjs(nominationStartAt))) {
//       e.nominationEndAt = "Nomination end must be after nomination start.";
//     }

//     // enforce electionStart >= nominationEnd + delay
//     if (nominationEndAt && delayBeforeStart && electionStartAt) {
//       const delayObj = DELAYS.find((d) => d.value === delayBeforeStart);
//       const minStart = dayjs(nominationEndAt).add(delayObj ? delayObj.minutes : 0, "minute");
//       if (dayjs(electionStartAt).isBefore(minStart)) {
//         e.electionStartAt = `Election start must be at or after ${minStart.format("YYYY/MM/DD hh:mm A")}.`;
//       }
//     }

//     if (electionStartAt && electionEndAt && dayjs(electionEndAt).isBefore(dayjs(electionStartAt))) {
//       e.electionEndAt = "Election end must be after election start.";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     // Build payload as ISO strings (UTC handling done by backend)
//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post("http://localhost:8000/api/create-election", payload);
//       if (res.data && res.data.success) {
//         // success: reset form
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         // fetch newest status
//         fetchStatus();
//         alert("✅ Election created successfully.");
//       } else {
//         alert("❌ Failed to create election: " + (res.data.message || "Unknown"));
//       }
//     } catch (err) {
//       console.error("Create election error:", err.response?.data || err.message || err);
//       alert("❌ Error creating election: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Helper: determine if form should be disabled (active election exists)
//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     // disable when status is not 'completed' (i.e., scheduled/nomination/waiting/running)
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   // Helper: indicator styles by status
//   const indicatorFor = (status) => {
//     // returns { label, className } for styling
//     switch (status) {
//       case "nomination":
//         return { label: "Nomination Open", className: "bg-gradient-to-r from-blue-500 to-blue-400 text-white" };
//       case "waiting":
//         // blue -> red gradient
//         return { label: "Nomination Closed (Waiting)", className: "bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white" };
//       case "running":
//         return { label: "Voting (Running)", className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" };
//       case "completed":
//         return { label: "Election Completed", className: "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black" };
//       default:
//         return { label: "No Active Election", className: "bg-gray-200 text-gray-800" };
//     }
//   };

//   const statusObj = serverStatus ? indicatorFor(serverStatus.status) : indicatorFor(null);

//   return (
//     <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-8 px-4">
//       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* LEFT: Form */}
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">🗳️ Create Election</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Election Type */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Election Type</label>
//               <select
//                 value={form.electionType}
//                 onChange={(e) => setForm({ ...form, electionType: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select</option>
//                 <option value="president">President</option>
//                 <option value="sis">SIS Election</option>
//               </select>
//               {errors.electionType && <p className="text-red-500 text-sm mt-1">{errors.electionType}</p>}
//             </div>

//             {/* Nomination Start */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Nomination Start</label>
//               <input
//                 type="datetime-local"
//                 value={form.nominationStartAt}
//                 onChange={(e) => setForm({ ...form, nominationStartAt: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               />
//               {errors.nominationStartAt && <p className="text-red-500 text-sm mt-1">{errors.nominationStartAt}</p>}
//             </div>

//             {/* Nomination End */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Nomination End</label>
//               <input
//                 type="datetime-local"
//                 value={form.nominationEndAt}
//                 onChange={(e) => setForm({ ...form, nominationEndAt: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               />
//               {errors.nominationEndAt && <p className="text-red-500 text-sm mt-1">{errors.nominationEndAt}</p>}
//             </div>

//             {/* Delay */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Delay Before Election</label>
//               <select
//                 value={form.delayBeforeStart}
//                 onChange={(e) => setForm({ ...form, delayBeforeStart: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select delay</option>
//                 {DELAYS.map((d) => (
//                   <option key={d.value} value={d.value}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//               {errors.delayBeforeStart && <p className="text-red-500 text-sm mt-1">{errors.delayBeforeStart}</p>}
//             </div>

//             {/* Election Start */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Election Start (auto-suggest)</label>
//               <input
//                 type="datetime-local"
//                 value={form.electionStartAt}
//                 onChange={(e) => setForm({ ...form, electionStartAt: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               />
//               {errors.electionStartAt && <p className="text-red-500 text-sm mt-1">{errors.electionStartAt}</p>}
//             </div>

//             {/* Election End */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Election End</label>
//               <input
//                 type="datetime-local"
//                 value={form.electionEndAt}
//                 onChange={(e) => setForm({ ...form, electionEndAt: e.target.value })}
//                 className="w-full rounded border p-2"
//                 disabled={isFormDisabled()}
//               />
//               {errors.electionEndAt && <p className="text-red-500 text-sm mt-1">{errors.electionEndAt}</p>}
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={isFormDisabled()}
//                 className={`w-full py-2 rounded-lg font-semibold transition ${
//                   isFormDisabled() ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
//                 }`}
//               >
//                 {isFormDisabled() ? "Create Disabled (Active Election)" : "Create Election"}
//               </button>
//             </div>

//             {isFormDisabled() && serverStatus && (
//               <p className="text-sm text-gray-600 mt-2">
//                 Active election detected (status: <strong>{serverStatus.status}</strong>). New election creation is disabled until it completes.
//               </p>
//             )}
//           </form>
//         </div>

//         {/* RIGHT: Indicators / Preview */}
//         <div className="bg-white p-6 rounded-2xl shadow space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold">Election Status</h3>
//             <div className={`px-3 py-1 rounded-full text-sm ${statusObj.className}`}>
//               {serverStatus ? statusObj.label : "No Active Election"}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Election Overview</h4>
//             {statusLoading ? (
//               <p className="text-sm text-gray-500">Loading status...</p>
//             ) : serverStatus ? (
//               <div className="space-y-2 text-sm">
//                 <div>
//                   <strong>Type:</strong> {serverStatus.electionType}
//                 </div>
//                 <div>
//                   <strong>Nomination:</strong>{" "}
//                   {dayjs(serverStatus.nominationStartAt).format("YYYY/MM/DD hh:mm A")} -{" "}
//                   {dayjs(serverStatus.nominationEndAt).format("YYYY/MM/DD hh:mm A")}
//                 </div>
//                 <div>
//                   <strong>Delay:</strong> {serverStatus.delayBeforeStart}
//                 </div>
//                 <div>
//                   <strong>Election:</strong>{" "}
//                   {dayjs(serverStatus.electionStartAt).format("YYYY/MM/DD hh:mm A")} -{" "}
//                   {dayjs(serverStatus.electionEndAt).format("YYYY/MM/DD hh:mm A")}
//                 </div>
//                 <div>
//                   <strong>Current status:</strong> {serverStatus.status}
//                 </div>
//                 <div className="pt-2">
//                   <button
//                     onClick={() => fetchStatus()}
//                     className="text-sm text-blue-600 underline"
//                   >
//                     Refresh Status
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">No elections found. Create a new one using the form.</p>
//             )}
//           </div>

//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-2">Indicator Guide</h4>
//             <ul className="text-sm space-y-2">
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-blue-500 rounded-sm" /> Nomination Open (blue)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 rounded-sm" /> Nomination Closed / Waiting (blue→red)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-yellow-400 rounded-sm" /> Election Running (gold)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-sm" /> Election Completed (gold→red)
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// //___________________________________________________________________________________________________________________________
// // CreateElection.jsx (final production-ready frontend with 3 live countdowns)
// // -------------------------------------------------------------------------
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// /**
//  * CreateElection component (final)
//  *
//  * - Validates times and delay
//  * - Auto-suggests electionStart = nominationEnd + delay
//  * - Polls backend (/api/election-status) every 15s for status
//  * - Shows three live countdowns (nomination, delay, election) updating every second
//  * - Disables create when an active election exists (status !== 'completed')
//  * - Clean, modern Tailwind UI suitable for dev -> prod
//  */

// // Delay options (keep consistent with backend expectations)
// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// // helper: format seconds -> HH:MM:SS
// function formatSecondsToHMS(totalSeconds) {
//   if (totalSeconds <= 0) return "00:00:00";
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor((totalSeconds / 60) % 60);
//   const h = Math.floor(totalSeconds / 3600);
//   const pad = (n) => String(n).padStart(2, "0");
//   return `${pad(h)}:${pad(m)}:${pad(s)}`;
// }

// // Helper: produce indicator label + class by status
// function indicatorFor(status) {
//   switch (status) {
//     case "nomination":
//       return {
//         label: "Nomination Open",
//         className: "bg-gradient-to-r from-blue-600 to-blue-400 text-white",
//       };
//     case "waiting":
//       return {
//         label: "Waiting (Delay)",
//         className:
//           "bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white",
//       };
//     case "running":
//       return {
//         label: "Voting (Running)",
//         className: "bg-gradient-to-r from-yellow-300 to-yellow-600 text-black",
//       };
//     case "completed":
//       return {
//         label: "Completed",
//         className:
//           "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black",
//       };
//     default:
//       return {
//         label: "No Active Election",
//         className: "bg-gray-200 text-gray-800",
//       };
//   }
// }

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "",
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);

//   // countdown seconds
//   const [nomCountdown, setNomCountdown] = useState(0);
//   const [delayCountdown, setDelayCountdown] = useState(0);
//   const [elecCountdown, setElecCountdown] = useState(0);

//   const pollRef = useRef(null);
//   const tickRef = useRef(null);

//   // Fetch latest election info from backend
//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) {
//         setServerStatus(res.data.data); // data might be null
//       } else {
//         setServerStatus(null);
//       }
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//       // do not clear serverStatus to avoid UI jumps
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // Poll server every 15 seconds
//   useEffect(() => {
//     fetchStatus();
//     pollRef.current = setInterval(fetchStatus, 15000);
//     return () => clearInterval(pollRef.current);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Auto-suggest election start when nominationEnd & delay set
//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const minutes = d ? d.minutes : 0;
//       const suggested = dayjs(nominationEndAt).add(minutes, "minute");
//       setForm((prev) => ({
//         ...prev,
//         electionStartAt: suggested.format("YYYY-MM-DDTHH:mm"),
//       }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   // Validation function (same logic as backend; keep UX friendly)
//   const validate = () => {
//     const e = {};
//     const {
//       electionType,
//       nominationStartAt,
//       nominationEndAt,
//       delayBeforeStart,
//       electionStartAt,
//       electionEndAt,
//     } = form;

//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";

//     if (
//       nominationStartAt &&
//       nominationEndAt &&
//       dayjs(nominationEndAt).isBefore(dayjs(nominationStartAt))
//     ) {
//       e.nominationEndAt = "Nomination end must be after nomination start.";
//     }

//     // electionStart >= nominationEnd + delay
//     if (nominationEndAt && delayBeforeStart && electionStartAt) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const minStart = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
//       if (dayjs(electionStartAt).isBefore(minStart)) {
//         e.electionStartAt = `Election start must be at or after ${minStart.format(
//           "YYYY/MM/DD hh:mm A"
//         )}.`;
//       }
//     }

//     if (
//       electionStartAt &&
//       electionEndAt &&
//       dayjs(electionEndAt).isBefore(dayjs(electionStartAt))
//     ) {
//       e.electionEndAt = "Election end must be after election start.";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/create-election",
//         payload
//       );
//       if (res.data && res.data.success) {
//         // clear form
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         // refresh server status immediately
//         fetchStatus();
//         alert("✅ Election created successfully.");
//       } else {
//         alert(
//           "❌ Failed to create election: " + (res.data.message || "Unknown")
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Create election error:",
//         err.response?.data || err.message || err
//       );
//       alert(
//         "❌ Error creating election: " +
//           (err.response?.data?.message || err.message)
//       );
//     }
//   };

//   // Disable form when an active election exists (status !== 'completed')
//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   // --- Countdown tick logic (runs every 1 second) ---
//   useEffect(() => {
//     // update countdowns each second based on serverStatus
//     function tick() {
//       const now = dayjs();

//       if (!serverStatus) {
//         setNomCountdown(0);
//         setDelayCountdown(0);
//         setElecCountdown(0);
//         return;
//       }

//       const ns = dayjs(serverStatus.nominationStartAt);
//       const ne = dayjs(serverStatus.nominationEndAt);
//       const es = dayjs(serverStatus.electionStartAt);
//       const ee = dayjs(serverStatus.electionEndAt);

//       // nomination remaining
//       if (now.isBefore(ne) && now.isAfter(ns)) {
//         setNomCountdown(Math.max(0, Math.floor(ne.diff(now, "second"))));
//       } else if (now.isBefore(ns)) {
//         // nomination not started yet -> show full duration until nomination end? show full remaining until start? choose remaining until end zero? We'll show remaining until nomination start and then until end when started
//         setNomCountdown(Math.max(0, Math.floor(ne.diff(now, "second"))));
//       } else {
//         setNomCountdown(0);
//       }

//       // delay (waiting) remaining: only meaningful after nomination end and before election start
//       if (now.isAfter(ne) && now.isBefore(es)) {
//         setDelayCountdown(Math.max(0, Math.floor(es.diff(now, "second"))));
//       } else {
//         setDelayCountdown(0);
//       }

//       // election remaining: only if during election
//       if (now.isAfter(es) && now.isBefore(ee)) {
//         setElecCountdown(Math.max(0, Math.floor(ee.diff(now, "second"))));
//       } else {
//         setElecCountdown(0);
//       }
//     }

//     // start local ticker
//     tickRef.current = setInterval(tick, 1000);
//     // run immediately once
//     tick();

//     return () => {
//       clearInterval(tickRef.current);
//     };
//   }, [serverStatus]);

//   // status indicator for the main top badge
//   const statusObj = serverStatus
//     ? indicatorFor(serverStatus.status)
//     : indicatorFor(null);

//   // small UI helpers for phase badges
//   const phaseBadge = (label, className, value) => (
//     <div
//       className={`px-3 py-2 rounded-lg flex items-center justify-between ${className}`}
//     >
//       <div className="text-sm font-medium">{label}</div>
//       <div className="ml-3 text-xs font-mono">{value}</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
//       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT: Create form (takes 2/3 on large screens) */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
//           <h2 className="text-2xl font-semibold mb-4">🗳️ Create Election</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* election type */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election Type
//                 </label>
//                 <select
//                   value={form.electionType}
//                   onChange={(e) =>
//                     setForm({ ...form, electionType: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 >
//                   <option value="">Select</option>
//                   <option value="president">President</option>
//                   <option value="sis">SIS Election</option>
//                 </select>
//                 {errors.electionType && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.electionType}
//                   </p>
//                 )}
//               </div>

//               {/* delay */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Delay Before Election
//                 </label>
//                 <select
//                   value={form.delayBeforeStart}
//                   onChange={(e) =>
//                     setForm({ ...form, delayBeforeStart: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 >
//                   <option value="">Select delay</option>
//                   {DELAYS.map((d) => (
//                     <option key={d.value} value={d.value}>
//                       {d.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.delayBeforeStart && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.delayBeforeStart}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* nomination start */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination Start
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationStartAt: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 />
//                 {errors.nominationStartAt && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.nominationStartAt}
//                   </p>
//                 )}
//               </div>

//               {/* nomination end */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination End
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationEndAt: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 />
//                 {errors.nominationEndAt && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.nominationEndAt}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* election start */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election Start (auto-suggest)
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionStartAt: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 />
//                 {errors.electionStartAt && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.electionStartAt}
//                   </p>
//                 )}
//               </div>

//               {/* election end */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election End
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionEndAt: e.target.value })
//                   }
//                   className="w-full rounded border p-2"
//                   disabled={isFormDisabled()}
//                 />
//                 {errors.electionEndAt && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.electionEndAt}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 pt-2">
//               <button
//                 type="submit"
//                 disabled={isFormDisabled()}
//                 className={`px-6 py-2 rounded-lg font-semibold transition ${
//                   isFormDisabled()
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     : "bg-green-600 hover:bg-green-700 text-white"
//                 }`}
//               >
//                 {isFormDisabled()
//                   ? "Create Disabled (Active Election)"
//                   : "Create Election"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => fetchStatus()}
//                 className="px-4 py-2 rounded-lg border text-sm"
//               >
//                 Refresh Status
//               </button>

//               {isFormDisabled() && serverStatus && (
//                 <div className="text-sm text-gray-600">
//                   Active election detected (status:{" "}
//                   <strong>{serverStatus.status}</strong>)
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* RIGHT: Status / Countdown / Guide */}
//         <div className="bg-white rounded-2xl p-6 shadow space-y-5">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold">Election Status</h3>
//             <div
//               className={`px-3 py-1 rounded-full text-sm ${statusObj.className}`}
//             >
//               {serverStatus ? statusObj.label : "No Active Election"}
//             </div>
//           </div>

//           {/* THREE PHASE BADGES WITH COUNTDOWNS */}
//           <div className="space-y-3">
//             {/* Nomination badge */}
//             <div className="flex items-center justify-between gap-3">
//               {phaseBadge(
//                 "Nomination Phase",
//                 serverStatus && serverStatus.status === "nomination"
//                   ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
//                   : serverStatus && serverStatus.status === "waiting"
//                   ? "bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white"
//                   : "bg-gray-100 text-gray-700",
//                 formatSecondsToHMS(nomCountdown)
//               )}
//             </div>

//             {/* Delay / Waiting badge */}
//             <div className="flex items-center justify-between gap-3">
//               {phaseBadge(
//                 "Delay (Waiting)",
//                 serverStatus && serverStatus.status === "waiting"
//                   ? "bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white"
//                   : "bg-gray-100 text-gray-700",
//                 formatSecondsToHMS(delayCountdown)
//               )}
//             </div>

//             {/* Election badge */}
//             <div className="flex items-center justify-between gap-3">
//               {phaseBadge(
//                 "Election Phase",
//                 serverStatus && serverStatus.status === "running"
//                   ? "bg-gradient-to-r from-yellow-300 to-yellow-600 text-black"
//                   : serverStatus && serverStatus.status === "completed"
//                   ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black"
//                   : "bg-gray-100 text-gray-700",
//                 formatSecondsToHMS(elecCountdown)
//               )}
//             </div>
//           </div>

//           {/* Latest Election Overview */}
//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-2">
//               Latest Election Overview
//             </h4>
//             {statusLoading ? (
//               <p className="text-sm text-gray-500">Loading status...</p>
//             ) : serverStatus ? (
//               <div className="text-sm space-y-1">
//                 <div>
//                   <strong>Type:</strong> {serverStatus.electionType}
//                 </div>
//                 <div>
//                   <strong>Nomination:</strong>{" "}
//                   {dayjs(serverStatus.nominationStartAt).format(
//                     "YYYY/MM/DD hh:mm A"
//                   )}{" "}
//                   -{" "}
//                   {dayjs(serverStatus.nominationEndAt).format(
//                     "YYYY/MM/DD hh:mm A"
//                   )}
//                 </div>
//                 <div>
//                   <strong>Delay:</strong> {serverStatus.delayBeforeStart}
//                 </div>
//                 <div>
//                   <strong>Election:</strong>{" "}
//                   {dayjs(serverStatus.electionStartAt).format(
//                     "YYYY/MM/DD hh:mm A"
//                   )}{" "}
//                   -{" "}
//                   {dayjs(serverStatus.electionEndAt).format(
//                     "YYYY/MM/DD hh:mm A"
//                   )}
//                 </div>
//                 <div>
//                   <strong>Current status:</strong> {serverStatus.status}
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">
//                 No elections found. Create a new one using the form.
//               </p>
//             )}
//           </div>

//           {/* Indicator Guide */}
//           <div>
//             <h4 className="text-sm font-medium text-gray-700 mb-2">
//               Indicator Guide
//             </h4>
//             <ul className="text-sm space-y-2">
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-blue-500 rounded-sm" />{" "}
//                 Nomination Open (blue)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 rounded-sm" />{" "}
//                 Nomination Closed / Waiting (blue→red)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-yellow-400 rounded-sm" />{" "}
//                 Election Running (gold)
//               </li>
//               <li>
//                 <span className="inline-block w-4 h-4 mr-2 align-middle bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-sm" />{" "}
//                 Election Completed (gold→red)
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// //_____________________________________________________






// // CreateElection.jsx (final UI matching provided mockup + live countdowns + console logs)
// // -------------------------------------------------------------------------
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// /**
//  * CreateElection component (final)
//  *
//  * - UI styled with Tailwind to match the uploaded mockup
//  * - Validates times and delay
//  * - Auto-suggests electionStart = nominationEnd + delay
//  * - Polls backend (/api/election-status) every 15s for status
//  * - Shows three live countdowns (nomination, delay, election) updating every second
//  * - Disables create when an active election exists (status !== 'completed')
//  * - On successful create: console logs a success message and the full backend response object
//  */

// // Delay options (keep consistent with backend expectations)
// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// // helper: format seconds -> HH:MM:SS
// function formatSecondsToHMS(totalSeconds) {
//   if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor((totalSeconds / 60) % 60);
//   const h = Math.floor(totalSeconds / 3600);
//   const pad = (n) => String(n).padStart(2, "0");
//   return `${pad(h)}:${pad(m)}:${pad(s)}`;
// }

// // Helper: produce indicator label + class by status
// function indicatorFor(status) {
//   switch (status) {
//     case "nomination":
//       return { label: "Now In Nomination", className: "bg-gradient-to-r from-blue-600 to-blue-400 text-white" };
//     case "waiting":
//       return { label: "Now In Delay", className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" };
//     case "running":
//       return { label: "Now In Election", className: "bg-gradient-to-r from-green-400 to-green-600 text-white" };
//     case "completed":
//       return { label: "Ending The Election", className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white" };
//     default:
//       return { label: "No Active Election", className: "bg-gray-200 text-gray-800" };
//   }
// }

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "",
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);

//   // countdown seconds
//   const [nomCountdown, setNomCountdown] = useState(0);
//   const [delayCountdown, setDelayCountdown] = useState(0);
//   const [elecCountdown, setElecCountdown] = useState(0);

//   const pollRef = useRef(null);
//   const tickRef = useRef(null);

//   // Fetch latest election info from backend
//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) {
//         setServerStatus(res.data.data); // might be null if no election
//       } else {
//         setServerStatus(null);
//       }
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//       // keep serverStatus as-is
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // Poll server every 15 seconds
//   useEffect(() => {
//     fetchStatus();
//     pollRef.current = setInterval(fetchStatus, 15000);
//     return () => clearInterval(pollRef.current);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Auto-suggest election start when nominationEnd & delay set
//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const minutes = d ? d.minutes : 0;
//       const suggested = dayjs(nominationEndAt).add(minutes, "minute");
//       setForm((prev) => ({ ...prev, electionStartAt: suggested.format("YYYY-MM-DDTHH:mm") }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   // Validation function (same logic as backend; keep UX friendly)
//   const validate = () => {
//     const e = {};
//     const { electionType, nominationStartAt, nominationEndAt, delayBeforeStart, electionStartAt, electionEndAt } = form;

//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";

//     if (nominationStartAt && nominationEndAt && dayjs(nominationEndAt).isBefore(dayjs(nominationStartAt))) {
//       e.nominationEndAt = "Nomination end must be after nomination start.";
//     }

//     // electionStart >= nominationEnd + delay
//     if (nominationEndAt && delayBeforeStart && electionStartAt) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const minStart = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
//       if (dayjs(electionStartAt).isBefore(minStart)) {
//         e.electionStartAt = `Election start must be at or after ${minStart.format("YYYY/MM/DD hh:mm A")}.`;
//       }
//     }

//     if (electionStartAt && electionEndAt && dayjs(electionEndAt).isBefore(dayjs(electionStartAt))) {
//       e.electionEndAt = "Election end must be after election start.";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post("http://localhost:8000/api/create-election", payload);

//       if (res.data && res.data.success) {
//         // Console logs per your request
//         console.log("✅ Election created successfully.");          // success message
//         console.log("Full backend response:", res.data);          // full backend response object
//         // clear form and update UI
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         fetchStatus(); // update status immediately
//       } else {
//         // If backend returned success:false with message
//         console.error("❌ Create failed:", res.data?.message || res.data);
//         alert("❌ Failed to create election: " + (res.data?.message || "Unknown"));
//       }
//     } catch (err) {
//       console.error("Create election error:", err.response?.data || err.message || err);
//       alert("❌ Error creating election: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Disable form when an active election exists (status !== 'completed')
//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   // --- Countdown tick logic (runs every 1 second) ---
//   useEffect(() => {
//     // update countdowns each second based on serverStatus
//     function tick() {
//       const now = dayjs();

//       if (!serverStatus) {
//         setNomCountdown(0);
//         setDelayCountdown(0);
//         setElecCountdown(0);
//         return;
//       }

//       const ns = dayjs(serverStatus.nominationStartAt);
//       const ne = dayjs(serverStatus.nominationEndAt);
//       const es = dayjs(serverStatus.electionStartAt);
//       const ee = dayjs(serverStatus.electionEndAt);

//       // nomination remaining (time until nomination end)
//       if (now.isBefore(ne)) {
//         setNomCountdown(Math.max(0, Math.floor(ne.diff(now, "second"))));
//       } else {
//         setNomCountdown(0);
//       }

//       // delay (waiting) remaining: only meaningful after nomination end and before election start
//       if (now.isAfter(ne) && now.isBefore(es)) {
//         setDelayCountdown(Math.max(0, Math.floor(es.diff(now, "second"))));
//       } else {
//         setDelayCountdown(0);
//       }

//       // election remaining: during election
//       if (now.isAfter(es) && now.isBefore(ee)) {
//         setElecCountdown(Math.max(0, Math.floor(ee.diff(now, "second"))));
//       } else {
//         setElecCountdown(0);
//       }
//     }

//     // start local ticker
//     tickRef.current = setInterval(tick, 1000);
//     // run immediately once
//     tick();

//     return () => {
//       clearInterval(tickRef.current);
//     };
//   }, [serverStatus]);

//   // status indicator for the main top badge
//   const statusObj = serverStatus ? indicatorFor(serverStatus.status) : indicatorFor(null);

//   // small UI helpers for phase badges
//   const phaseBadge = (label, className, value) => (
//     <div className={`px-4 py-3 rounded-md flex items-center justify-between shadow-sm ${className}`}>
//       <div className="text-sm font-semibold">{label}</div>
//       <div className="ml-3 text-xs font-mono">{value}</div>
//     </div>
//   );

//   // UI layout — tuned to match your uploaded mockup
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100/60 to-white py-8 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* LEFT: Form panel */}
//         <div className="bg-white rounded-xl p-8 shadow-md">
//           <div className="mb-6 text-center">
//             <h1 className="text-4xl font-extrabold">Create Election <span className="text-2xl">🗳️</span></h1>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gray-100 rounded-md p-4">
//               <label className="text-lg font-semibold block mb-2">Election Type</label>
//               <select
//                 value={form.electionType}
//                 onChange={(e) => setForm({ ...form, electionType: e.target.value })}
//                 className="w-full rounded-md p-3 bg-gray-200 border-none"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select Election Type</option>
//                 <option value="president">President</option>
//                 <option value="sis">SIS Election</option>
//               </select>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-center my-4">Set The Nomination Period</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Nomination Start Date & Time</label>
//                   <input
//                     type="datetime-local"
//                     value={form.nominationStartAt}
//                     onChange={(e) => setForm({ ...form, nominationStartAt: e.target.value })}
//                     className="w-full rounded-md p-3 bg-gray-100"
//                     disabled={isFormDisabled()}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Nomination End Date & Time</label>
//                   <input
//                     type="datetime-local"
//                     value={form.nominationEndAt}
//                     onChange={(e) => setForm({ ...form, nominationEndAt: e.target.value })}
//                     className="w-full rounded-md p-3 bg-gray-100"
//                     disabled={isFormDisabled()}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="text-center">
//               <h3 className="text-xl font-semibold my-3">Election Delay</h3>
//               <select
//                 value={form.delayBeforeStart}
//                 onChange={(e) => setForm({ ...form, delayBeforeStart: e.target.value })}
//                 className="rounded-md p-3 bg-gray-200 w-1/2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Delay Before Election</option>
//                 {DELAYS.map((d) => (
//                   <option key={d.value} value={d.value}>{d.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-center my-4">Set The Election Period</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Election Start Date & Time</label>
//                   <input
//                     type="datetime-local"
//                     value={form.electionStartAt}
//                     onChange={(e) => setForm({ ...form, electionStartAt: e.target.value })}
//                     className="w-full rounded-md p-3 bg-gray-100"
//                     disabled={isFormDisabled()}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Election End Date & Time</label>
//                   <input
//                     type="datetime-local"
//                     value={form.electionEndAt}
//                     onChange={(e) => setForm({ ...form, electionEndAt: e.target.value })}
//                     className="w-full rounded-md p-3 bg-gray-100"
//                     disabled={isFormDisabled()}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="text-center pt-6">
//               <button
//                 onClick={handleSubmit}
//                 disabled={isFormDisabled()}
//                 className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg transition ${
//                   isFormDisabled()
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     : "bg-[#6d4bde] hover:bg-[#593bd1]"
//                 }`}
//               >
//                 Start Election
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: Timers & Indicators */}
//         <div className="bg-white rounded-xl p-6 shadow-md">
//           <h2 className="text-3xl font-extrabold text-center mb-4">Count Down Timers</h2>

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             <div className="bg-gray-100 rounded-md p-4 text-center">
//               <div className="text-2xl font-mono bg-white rounded-md px-3 py-2 inline-block shadow-sm">{formatSecondsToHMS(nomCountdown)}</div>
//               <div className="mt-2 text-sm font-medium">Nomination phase Ending...</div>
//             </div>

//             <div className="bg-gray-100 rounded-md p-4 text-center">
//               <div className="text-2xl font-mono bg-white rounded-md px-3 py-2 inline-block shadow-sm">{formatSecondsToHMS(delayCountdown)}</div>
//               <div className="mt-2 text-sm font-medium">Delay Time Ending..</div>
//             </div>

//             <div className="bg-gray-100 rounded-md p-4 text-center">
//               <div className="text-2xl font-mono bg-white rounded-md px-3 py-2 inline-block shadow-sm">{formatSecondsToHMS(elecCountdown)}</div>
//               <div className="mt-2 text-sm font-medium">Election Phase Ending..</div>
//             </div>
//           </div>

//           <div className="border-t border-b py-4 mb-4">
//             <h3 className="text-xl font-semibold text-center mb-3">Indicators</h3>
//             <div className="flex justify-between items-center gap-3">
//               <div className="w-1/4 text-center rounded-full px-4 py-2 shadow text-white bg-gradient-to-r from-blue-600 to-blue-400">Now In Nomination</div>
//               <div className="w-1/4 text-center rounded-full px-4 py-2 shadow bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">Now In Delay</div>
//               <div className="w-1/4 text-center rounded-full px-4 py-2 shadow bg-gradient-to-r from-green-400 to-green-600 text-white">Now In Election</div>
//               <div className="w-1/4 text-center rounded-full px-4 py-2 shadow bg-gradient-to-r from-purple-500 to-pink-500 text-white">Ending The Election</div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-2xl font-bold text-center mb-3">Current Election Status</h3>

//             <div className="bg-white p-4 rounded-md shadow-inner min-h-[160px]">
//               {statusLoading ? (
//                 <p className="text-sm text-gray-500">Loading status...</p>
//               ) : serverStatus ? (
//                 <div className="space-y-2 text-sm">
//                   <div><strong>Type:</strong> {serverStatus.electionType}</div>
//                   <div><strong>Nomination:</strong> {dayjs(serverStatus.nominationStartAt).format("YYYY/MM/DD hh:mm A")} - {dayjs(serverStatus.nominationEndAt).format("YYYY/MM/DD hh:mm A")}</div>
//                   <div><strong>Delay:</strong> {serverStatus.delayBeforeStart}</div>
//                   <div><strong>Election:</strong> {dayjs(serverStatus.electionStartAt).format("YYYY/MM/DD hh:mm A")} - {dayjs(serverStatus.electionEndAt).format("YYYY/MM/DD hh:mm A")}</div>
//                   <div><strong>Current status:</strong> {serverStatus.status}</div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">No active election. Create a new one using the form.</p>
//               )}
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => fetchStatus()}
//                 className="px-6 py-2 rounded-full bg-[#6d4bde] text-white font-semibold shadow hover:bg-[#593bd1]"
//               >
//                 Refresh status
//               </button>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-2">Indicator Guide</h4>
//             <ul className="list-disc list-inside text-sm space-y-1">
//               <li>Nomination Open (blue)</li>
//               <li>Nomination Closed / Waiting (gold)</li>
//               <li>Election Running (green)</li>
//               <li>Election Completed (purple)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// // CreateElection.jsx (final pixel-perfect + dynamic indicators)
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// // delay list (unchanged)
// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// // format countdown
// function formatSecondsToHMS(totalSeconds) {
//   if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor((totalSeconds / 60) % 60);
//   const h = Math.floor(totalSeconds / 3600);
//   const pad = (n) => String(n).padStart(2, "0");
//   return `${pad(h)}:${pad(m)}:${pad(s)}`;
// }

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "",
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);
//   const [nomCountdown, setNomCountdown] = useState(0);
//   const [delayCountdown, setDelayCountdown] = useState(0);
//   const [elecCountdown, setElecCountdown] = useState(0);

//   const pollRef = useRef(null);
//   const tickRef = useRef(null);

//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) setServerStatus(res.data.data);
//       else setServerStatus(null);
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//     pollRef.current = setInterval(fetchStatus, 15000);
//     return () => clearInterval(pollRef.current);
//   }, []);

//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const suggested = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
//       setForm((prev) => ({
//         ...prev,
//         electionStartAt: suggested.format("YYYY-MM-DDTHH:mm"),
//       }));
//     }
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   const validate = () => {
//     const e = {};
//     const {
//       electionType,
//       nominationStartAt,
//       nominationEndAt,
//       delayBeforeStart,
//       electionStartAt,
//       electionEndAt,
//     } = form;
//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/create-election",
//         payload
//       );
//       if (res.data && res.data.success) {
//         console.log("✅ Election created successfully.");
//         console.log("Full backend response:", res.data);
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         fetchStatus();
//       } else {
//         console.error("❌ Create failed:", res.data?.message || res.data);
//       }
//     } catch (err) {
//       console.error(
//         "Create election error:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   useEffect(() => {
//     function tick() {
//       const now = dayjs();
//       if (!serverStatus) return;
//       const ns = dayjs(serverStatus.nominationStartAt);
//       const ne = dayjs(serverStatus.nominationEndAt);
//       const es = dayjs(serverStatus.electionStartAt);
//       const ee = dayjs(serverStatus.electionEndAt);
//       if (now.isBefore(ne))
//         setNomCountdown(Math.max(0, ne.diff(now, "second")));
//       else setNomCountdown(0);
//       if (now.isAfter(ne) && now.isBefore(es))
//         setDelayCountdown(Math.max(0, es.diff(now, "second")));
//       else setDelayCountdown(0);
//       if (now.isAfter(es) && now.isBefore(ee))
//         setElecCountdown(Math.max(0, ee.diff(now, "second")));
//       else setElecCountdown(0);
//     }
//     tickRef.current = setInterval(tick, 1000);
//     tick();
//     return () => clearInterval(tickRef.current);
//   }, [serverStatus]);

//   // dynamic indicator colors (only one active)
//   const active = serverStatus?.status || null;
//   const getBox = (label, isActive, gradient, textColor) => (
//     <div
//       className={`w-1/4 text-center rounded-full px-4 py-2 shadow font-semibold ${
//         isActive
//           ? `${gradient} ${textColor}`
//           : "bg-white text-gray-600 border border-gray-300"
//       }`}
//     >
//       {label}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100/60 to-white py-8 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* LEFT */}
//         <div className="bg-white rounded-xl p-8 shadow-md">
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-extrabold">
//               Create Election <span>🗳️</span>
//             </h1>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gray-100 rounded-md p-4">
//               <label className="text-lg font-semibold block mb-2">
//                 Election Type
//               </label>
//               <select
//                 value={form.electionType}
//                 onChange={(e) =>
//                   setForm({ ...form, electionType: e.target.value })
//                 }
//                 className="w-full rounded-md p-3 bg-gray-200 border-none"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select Election Type</option>
//                 <option value="president">President</option>
//                 <option value="sis">SIS Election</option>
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">
//               Set The Nomination Period
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination Start Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationStartAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination End Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationEndAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <h3 className="text-xl font-semibold my-3">Election Delay</h3>
//               <select
//                 value={form.delayBeforeStart}
//                 onChange={(e) =>
//                   setForm({ ...form, delayBeforeStart: e.target.value })
//                 }
//                 className="rounded-md p-3 bg-gray-200 w-1/2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Delay Before Election</option>
//                 {DELAYS.map((d) => (
//                   <option key={d.value} value={d.value}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">
//               Set The Election Period
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election Start Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionStartAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election End Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionEndAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center pt-6">
//               <button
//                 onClick={handleSubmit}
//                 disabled={isFormDisabled()}
//                 className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
//                   isFormDisabled()
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     : "bg-[#6d4bde] hover:bg-[#593bd1]"
//                 }`}
//               >
//                 Start Election
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white rounded-xl p-6 shadow-md">
//           <h2 className="text-3xl font-extrabold text-center mb-4">
//             Count Down Timers
//           </h2>

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {[
//               { time: nomCountdown, label: "Nomination phase Ending..." },
//               { time: delayCountdown, label: "Delay Time Ending.." },
//               { time: elecCountdown, label: "Election Phase Ending.." },
//             ].map((x, i) => (
//               <div key={i} className="bg-gray-100 rounded-md p-4 text-center">
//                 <div className="text-2xl font-mono bg-white text-black rounded-md px-3 py-2 inline-block shadow-sm">
//                   {formatSecondsToHMS(x.time)}
//                 </div>
//                 <div className="mt-2 text-sm font-medium">{x.label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-b py-4 mb-4">
//             <h3 className="text-xl font-semibold text-center mb-3">
//               Indicators
//             </h3>
//             <div className="flex justify-between items-center gap-3">
//               {getBox(
//                 "Now In Nomination",
//                 active === "nomination",
//                 "bg-gradient-to-r from-blue-600 to-blue-800",
//                 "text-white"
//               )}
//               {getBox(
//                 "Now In Delay",
//                 active === "waiting",
//                 "bg-gradient-to-r from-yellow-600 to-amber-800",
//                 "text-black"
//               )}
//               {getBox(
//                 "Now In Election",
//                 active === "running",
//                 "bg-gradient-to-r from-green-400 to-green-800",
//                 "text-white"
//               )}
//               {getBox(
//                 "Ending The Election",
//                 active === "completed",
//                 "bg-gradient-to-r from-purple-600 to-violet-800",
//                 "text-white"
//               )}
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-2xl font-bold text-center mb-3">
//               Current Election Status
//             </h3>
//             <div className="bg-white p-4 rounded-md shadow-inner min-h-[160px]">
//               {statusLoading ? (
//                 <p className="text-sm text-gray-500">Loading status...</p>
//               ) : serverStatus ? (
//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <strong>Type:</strong> {serverStatus.electionType}
//                   </div>
//                   <div>
//                     <strong>Nomination:</strong>{" "}
//                     {dayjs(serverStatus.nominationStartAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}{" "}
//                     -{" "}
//                     {dayjs(serverStatus.nominationEndAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}
//                   </div>
//                   <div>
//                     <strong>Delay:</strong> {serverStatus.delayBeforeStart}
//                   </div>
//                   <div>
//                     <strong>Election:</strong>{" "}
//                     {dayjs(serverStatus.electionStartAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}{" "}
//                     -{" "}
//                     {dayjs(serverStatus.electionEndAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}
//                   </div>
//                   <div>
//                     <strong>Current status:</strong> {serverStatus.status}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">
//                   No active election. Create a new one using the form.
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={fetchStatus}
//                 className="px-6 py-2 rounded-full bg-[#6d4bde] text-white font-semibold shadow hover:bg-[#593bd1]"
//               >
//                 Refresh status
//               </button>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-2">Indicator Guide</h4>
//             <ul className="list-disc list-inside text-sm space-y-1">
//               <li>Nomination Open (blue)</li>
//               <li>Nomination Closed / Waiting (gold)</li>
//               <li>Election Running (green)</li>
//               <li>Election Completed (purple)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// //#############################___2025/11/09___##################################
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";

// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// function formatSecondsToHMS(totalSeconds) {
//   if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor((totalSeconds / 60) % 60);
//   const h = Math.floor(totalSeconds / 3600);
//   const pad = (n) => String(n).padStart(2, "0");
//   return `${pad(h)}:${pad(m)}:${pad(s)}`;
// }

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "",
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);
//   const [nomCountdown, setNomCountdown] = useState(0);
//   const [delayCountdown, setDelayCountdown] = useState(0);
//   const [elecCountdown, setElecCountdown] = useState(0);
//   const [activeMsg, setActiveMsg] = useState("");

//   const pollRef = useRef(null);
//   const tickRef = useRef(null);

//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) {
//         setServerStatus(res.data.data);
//       } else {
//         setServerStatus(null);
//       }
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // instant 1s backend polling
//   useEffect(() => {
//     fetchStatus();
//     pollRef.current = setInterval(fetchStatus, 1000);
//     return () => clearInterval(pollRef.current);
//   }, []);

//   // auto fill electionStartAt
//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const suggested = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
//       setForm((prev) => ({
//         ...prev,
//         electionStartAt: suggested.format("YYYY-MM-DDTHH:mm"),
//       }));
//     }
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   const validate = () => {
//     const e = {};
//     const {
//       electionType,
//       nominationStartAt,
//       nominationEndAt,
//       delayBeforeStart,
//       electionStartAt,
//       electionEndAt,
//     } = form;
//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/create-election",
//         payload
//       );
//       if (res.data && res.data.success) {
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         fetchStatus();
//       } else {
//         console.error("Create failed:", res.data?.message || res.data);
//       }
//     } catch (err) {
//       console.error(
//         "Create election error:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   // countdown tick logic
//   useEffect(() => {
//     function tick() {
//       const now = dayjs();
//       if (!serverStatus) return;
//       const ns = dayjs(serverStatus.nominationStartAt);
//       const ne = dayjs(serverStatus.nominationEndAt);
//       const es = dayjs(serverStatus.electionStartAt);
//       const ee = dayjs(serverStatus.electionEndAt);

//       // nomination countdown runs only between start & end
//       if (now.isAfter(ns) && now.isBefore(ne))
//         setNomCountdown(Math.max(0, ne.diff(now, "second")));
//       else setNomCountdown(0);

//       if (now.isAfter(ne) && now.isBefore(es))
//         setDelayCountdown(Math.max(0, es.diff(now, "second")));
//       else setDelayCountdown(0);

//       if (now.isAfter(es) && now.isBefore(ee))
//         setElecCountdown(Math.max(0, ee.diff(now, "second")));
//       else setElecCountdown(0);
//     }

//     tickRef.current = setInterval(tick, 1000);
//     tick();
//     return () => clearInterval(tickRef.current);
//   }, [serverStatus]);

//   // active election message logic
//   useEffect(() => {
//     if (serverStatus?.status && serverStatus.status !== "completed") {
//       setActiveMsg(
//         "⚠️ You can't create another election until the current one ends."
//       );
//     } else {
//       setActiveMsg("");
//     }
//   }, [serverStatus?.status]);

//   const active = serverStatus?.status || null;
//   const getBox = (label, isActive, gradient, textColor) => (
//     <div
//       className={`w-1/4 text-center rounded-full px-4 py-2 shadow font-semibold ${
//         isActive
//           ? `${gradient} ${textColor}`
//           : "bg-white text-gray-600 border border-gray-300"
//       }`}
//     >
//       {label}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100/60 to-white py-8 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* LEFT */}
//         <div className="bg-white rounded-xl p-8 shadow-md">
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-extrabold">
//               Create Election <span>🗳️</span>
//             </h1>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gray-100 rounded-md p-4">
//               <label className="text-lg font-semibold block mb-2">
//                 Election Type
//               </label>
//               <select
//                 value={form.electionType}
//                 onChange={(e) =>
//                   setForm({ ...form, electionType: e.target.value })
//                 }
//                 className="w-full rounded-md p-3 bg-gray-200 border-none"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select Election Type</option>
//                 <option value="president">President</option>
//                 <option value="sis">SIS Election</option>
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">
//               Set The Nomination Period
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination Start Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationStartAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Nomination End Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, nominationEndAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <h3 className="text-xl font-semibold my-3">Election Delay</h3>
//               <select
//                 value={form.delayBeforeStart}
//                 onChange={(e) =>
//                   setForm({ ...form, delayBeforeStart: e.target.value })
//                 }
//                 className="rounded-md p-3 bg-gray-200 w-1/2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Delay Before Election</option>
//                 {DELAYS.map((d) => (
//                   <option key={d.value} value={d.value}>
//                     {d.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">
//               Set The Election Period
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election Start Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionStartAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionStartAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Election End Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionEndAt}
//                   onChange={(e) =>
//                     setForm({ ...form, electionEndAt: e.target.value })
//                   }
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center pt-6">
//               <button
//                 onClick={handleSubmit}
//                 disabled={isFormDisabled()}
//                 className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
//                   isFormDisabled()
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     : "bg-[#6d4bde] hover:bg-[#593bd1]"
//                 }`}
//               >
//                 Start Election
//               </button>

//               {/* Message under button */}
//               {activeMsg && (
//                 <p className="text-red-600 font-medium mt-3 text-sm">
//                   {activeMsg}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="bg-white rounded-xl p-6 shadow-md">
//           <h2 className="text-3xl font-extrabold text-center mb-4">
//             Count Down Timers
//           </h2>

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {[
//               { time: nomCountdown, label: "Nomination phase Ending..." },
//               { time: delayCountdown, label: "Delay Time Ending.." },
//               { time: elecCountdown, label: "Election Phase Ending.." },
//             ].map((x, i) => (
//               <div key={i} className="bg-gray-100 rounded-md p-4 text-center">
//                 <div className="text-2xl font-mono bg-white text-black rounded-md px-3 py-2 inline-block shadow-sm">
//                   {formatSecondsToHMS(x.time)}
//                 </div>
//                 <div className="mt-2 text-sm font-medium">{x.label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-b py-4 mb-4">
//             <h3 className="text-xl font-semibold text-center mb-3">
//               Indicators
//             </h3>
//             <div className="flex justify-between items-center gap-3">
//               {getBox(
//                 "Now In Nomination",
//                 active === "nomination",
//                 "bg-gradient-to-r from-blue-600 to-blue-800",
//                 "text-white"
//               )}
//               {getBox(
//                 "Now In Delay",
//                 active === "waiting",
//                 "bg-gradient-to-r from-yellow-600 to-amber-800",
//                 "text-black"
//               )}
//               {getBox(
//                 "Now In Election",
//                 active === "running",
//                 "bg-gradient-to-r from-green-400 to-green-800",
//                 "text-white"
//               )}
//               {getBox(
//                 "Ending The Election",
//                 active === "completed",
//                 "bg-gradient-to-r from-purple-600 to-violet-800",
//                 "text-white"
//               )}
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-2xl font-bold text-center mb-3">
//               Current Election Status
//             </h3>
//             <div className="bg-white p-4 rounded-md shadow-inner min-h-[160px]">
//               {statusLoading ? (
//                 <p className="text-sm text-gray-500">Loading status...</p>
//               ) : serverStatus ? (
//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <strong>Type:</strong> {serverStatus.electionType}
//                   </div>
//                   <div>
//                     <strong>Nomination:</strong>{" "}
//                     {dayjs(serverStatus.nominationStartAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}{" "}
//                     -{" "}
//                     {dayjs(serverStatus.nominationEndAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}
//                   </div>
//                   <div>
//                     <strong>Delay:</strong> {serverStatus.delayBeforeStart}
//                   </div>
//                   <div>
//                     <strong>Election:</strong>{" "}
//                     {dayjs(serverStatus.electionStartAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}{" "}
//                     -{" "}
//                     {dayjs(serverStatus.electionEndAt).format(
//                       "YYYY/MM/DD hh:mm A"
//                     )}
//                   </div>
//                   <div>
//                     <strong>Current status:</strong> {serverStatus.status}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">
//                   No active election. Create a new one using the form.
//                 </p>
//               )}
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={fetchStatus}
//                 className="px-6 py-2 rounded-full bg-[#6d4bde] text-white font-semibold shadow hover:bg-[#593bd1]"
//               >
//                 Refresh status
//               </button>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-2">Indicator Guide</h4>
//             <ul className="list-disc list-inside text-sm space-y-1">
//               <li>Nomination Open (blue)</li>
//               <li>Nomination Closed / Waiting (gold)</li>
//               <li>Election Running (green)</li>
//               <li>Election Completed (purple)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// //_________#########___________###################____________########################_______________###########################___________________________________


// // CreateElection.jsx (Final — soft alert + modern polish) 
// import React, { useEffect, useState, useRef } from "react";
// import dayjs from "dayjs";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// const DELAYS = [
//   { label: "5 minutes", value: "5min", minutes: 5 },
//   { label: "10 minutes", value: "10min", minutes: 10 },
//   { label: "30 minutes", value: "30min", minutes: 30 },
//   { label: "1 hour", value: "1h", minutes: 60 },
//   { label: "2 hours", value: "2h", minutes: 120 },
//   { label: "24 hours", value: "24h", minutes: 1440 },
// ];

// function formatSecondsToHMS(totalSeconds) {
//   if (!totalSeconds || totalSeconds <= 0) return "00:00:00";
//   const s = Math.floor(totalSeconds % 60);
//   const m = Math.floor((totalSeconds / 60) % 60);
//   const h = Math.floor(totalSeconds / 3600);
//   const pad = (n) => String(n).padStart(2, "0");
//   return `${pad(h)}:${pad(m)}:${pad(s)}`;
// }

// export default function CreateElection() {
//   const [form, setForm] = useState({
//     electionType: "",
//     nominationStartAt: "",
//     nominationEndAt: "",
//     delayBeforeStart: "",
//     electionStartAt: "",
//     electionEndAt: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [serverStatus, setServerStatus] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);
//   const [nomCountdown, setNomCountdown] = useState(0);
//   const [delayCountdown, setDelayCountdown] = useState(0);
//   const [elecCountdown, setElecCountdown] = useState(0);
//   const pollRef = useRef(null);
//   const tickRef = useRef(null);

//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);
//       const res = await axios.get("http://localhost:8000/api/election-status");
//       if (res.data && res.data.success) setServerStatus(res.data.data);
//       else setServerStatus(null);
//     } catch (err) {
//       console.error("Failed to fetch election status:", err.message || err);
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//     pollRef.current = setInterval(fetchStatus, 1000);
//     return () => clearInterval(pollRef.current);
//   }, []);

//   useEffect(() => {
//     const { nominationEndAt, delayBeforeStart } = form;
//     if (nominationEndAt && delayBeforeStart) {
//       const d = DELAYS.find((x) => x.value === delayBeforeStart);
//       const suggested = dayjs(nominationEndAt).add(d ? d.minutes : 0, "minute");
//       setForm((prev) => ({ ...prev, electionStartAt: suggested.format("YYYY-MM-DDTHH:mm") }));
//     }
//   }, [form.nominationEndAt, form.delayBeforeStart]);

//   const validate = () => {
//     const e = {};
//     const { electionType, nominationStartAt, nominationEndAt, delayBeforeStart, electionStartAt, electionEndAt } = form;
//     if (!electionType) e.electionType = "Choose election type.";
//     if (!nominationStartAt) e.nominationStartAt = "Nomination start required.";
//     if (!nominationEndAt) e.nominationEndAt = "Nomination end required.";
//     if (!delayBeforeStart) e.delayBeforeStart = "Select delay.";
//     if (!electionStartAt) e.electionStartAt = "Election start required.";
//     if (!electionEndAt) e.electionEndAt = "Election end required.";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       electionType: form.electionType,
//       nominationStartAt: dayjs(form.nominationStartAt).toISOString(),
//       nominationEndAt: dayjs(form.nominationEndAt).toISOString(),
//       delayBeforeStart: form.delayBeforeStart,
//       electionStartAt: dayjs(form.electionStartAt).toISOString(),
//       electionEndAt: dayjs(form.electionEndAt).toISOString(),
//     };

//     try {
//       const res = await axios.post("http://localhost:8000/api/create-election", payload);
//       if (res.data && res.data.success) {
//         console.log("✅ Election created successfully.");
//         setForm({
//           electionType: "",
//           nominationStartAt: "",
//           nominationEndAt: "",
//           delayBeforeStart: "",
//           electionStartAt: "",
//           electionEndAt: "",
//         });
//         fetchStatus();
//       }
//     } catch (err) {
//       console.error("Create election error:", err.response?.data || err.message);
//     }
//   };

//   const isFormDisabled = () => {
//     if (!serverStatus) return false;
//     return serverStatus.status && serverStatus.status !== "completed";
//   };

//   useEffect(() => {
//     function tick() {
//       const now = dayjs();
//       if (!serverStatus) return;
//       const ns = dayjs(serverStatus.nominationStartAt);
//       const ne = dayjs(serverStatus.nominationEndAt);
//       const es = dayjs(serverStatus.electionStartAt);
//       const ee = dayjs(serverStatus.electionEndAt);
//       if (now.isBefore(ne)) setNomCountdown(Math.max(0, ne.diff(now, "second")));
//       else setNomCountdown(0);
//       if (now.isAfter(ne) && now.isBefore(es)) setDelayCountdown(Math.max(0, es.diff(now, "second")));
//       else setDelayCountdown(0);
//       if (now.isAfter(es) && now.isBefore(ee)) setElecCountdown(Math.max(0, ee.diff(now, "second")));
//       else setElecCountdown(0);
//     }
//     tickRef.current = setInterval(tick, 1000);
//     tick();
//     return () => clearInterval(tickRef.current);
//   }, [serverStatus]);

//   const active = serverStatus?.status || null;
//   const getBox = (label, isActive, gradient, textColor) => (
//     <div
//       className={`w-1/4 text-center rounded-full px-4 py-2 shadow font-semibold transition ${
//         isActive
//           ? `${gradient} ${textColor} scale-105`
//           : "bg-white text-gray-600 border border-gray-300"
//       }`}
//     >
//       {label}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto py-8 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* LEFT */}
//         <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-md">
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-extrabold">Create Election <span>🗳️</span></h1>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gray-100 rounded-md p-4">
//               <label className="text-lg font-semibold block mb-2">Election Type</label>
//               <select
//                 value={form.electionType}
//                 onChange={(e) => setForm({ ...form, electionType: e.target.value })}
//                 className="w-full rounded-md p-3 bg-gray-200 border-none"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Select Election Type</option>
//                 <option value="president">President</option>
//                 <option value="sis">SIS Election</option>
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">Set The Nomination Period</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Nomination Start Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationStartAt}
//                   onChange={(e) => setForm({ ...form, nominationStartAt: e.target.value })}
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Nomination End Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={form.nominationEndAt}
//                   onChange={(e) => setForm({ ...form, nominationEndAt: e.target.value })}
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center">
//               <h3 className="text-xl font-semibold my-3">Election Delay</h3>
//               <select
//                 value={form.delayBeforeStart}
//                 onChange={(e) => setForm({ ...form, delayBeforeStart: e.target.value })}
//                 className="rounded-md p-3 bg-gray-200 w-1/2"
//                 disabled={isFormDisabled()}
//               >
//                 <option value="">Delay Before Election</option>
//                 {DELAYS.map((d) => (
//                   <option key={d.value} value={d.value}>{d.label}</option>
//                 ))}
//               </select>
//             </div>

//             <h2 className="text-2xl font-bold text-center my-4">Set The Election Period</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Election Start Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionStartAt}
//                   onChange={(e) => setForm({ ...form, electionStartAt: e.target.value })}
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Election End Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={form.electionEndAt}
//                   onChange={(e) => setForm({ ...form, electionEndAt: e.target.value })}
//                   className="w-full rounded-md p-3 bg-gray-100"
//                   disabled={isFormDisabled()}
//                 />
//               </div>
//             </div>

//             <div className="text-center pt-6 relative">
//               <button
//                 onClick={handleSubmit}
//                 disabled={isFormDisabled()}
//                 className={`px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg ${
//                   isFormDisabled()
//                     ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     : "bg-[#6d4bde] hover:bg-[#593bd1]"
//                 }`}
//               >
//                 Start Election
//               </button>

//               {/* Soft yellow alert box */}
//               <AnimatePresence>
//                 {isFormDisabled() && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     className="mt-4 bg-yellow-100 border border-yellow-300 text-black/90 font-semibold rounded-md px-4 py-3 shadow-sm inline-block"
//                   >
//                     ⚠️ An election is currently active. You can’t create a new one until it ends.
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-md">
//           <h2 className="text-3xl font-extrabold text-center mb-4">Count Down Timers</h2>

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {[
//               { time: nomCountdown, label: "Nomination phase Ending..." },
//               { time: delayCountdown, label: "Delay Time Ending.." },
//               { time: elecCountdown, label: "Election Phase Ending.." },
//             ].map((x, i) => (
//               <div key={i} className="bg-gray-100 rounded-md p-4 text-center">
//                 <div className="text-2xl font-mono bg-white text-black rounded-md px-3 py-2 inline-block shadow-sm">
//                   {formatSecondsToHMS(x.time)}
//                 </div>
//                 <div className="mt-2 text-sm font-medium">{x.label}</div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-b py-4 mb-4">
//             <h3 className="text-xl font-semibold text-center mb-3">Indicators</h3>
//             <div className="flex justify-between items-center gap-3">
//               {getBox("Now In Nomination", active === "nomination", "bg-gradient-to-r from-blue-600 to-blue-800", "text-white")}
//               {getBox("Now In Delay", active === "waiting", "bg-gradient-to-r from-yellow-600 to-amber-800", "text-black")}
//               {getBox("Now In Election", active === "running", "bg-gradient-to-r from-green-400 to-green-800", "text-white")}
//               {getBox("Ending The Election", active === "completed", "bg-gradient-to-r from-purple-600 to-violet-800", "text-white")}
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-2xl font-bold text-center mb-3">Current Election Status</h3>
//             <div className="bg-white p-4 rounded-md shadow-inner min-h-[160px]">
//               {statusLoading ? (
//                 <p className="text-sm text-gray-500">Loading status...</p>
//               ) : serverStatus ? (
//                 <div className="space-y-2 text-sm">
//                   <div><strong>Type:</strong> {serverStatus.electionType}</div>
//                   <div><strong>Nomination:</strong> {dayjs(serverStatus.nominationStartAt).format("YYYY/MM/DD hh:mm A")} - {dayjs(serverStatus.nominationEndAt).format("YYYY/MM/DD hh:mm A")}</div>
//                   <div><strong>Delay:</strong> {serverStatus.delayBeforeStart}</div>
//                   <div><strong>Election:</strong> {dayjs(serverStatus.electionStartAt).format("YYYY/MM/DD hh:mm A")} - {dayjs(serverStatus.electionEndAt).format("YYYY/MM/DD hh:mm A")}</div>
//                   <div><strong>Current status:</strong> {serverStatus.status}</div>
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500">No active election. Create a new one using the form.</p>
//               )}
//             </div>
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={fetchStatus}
//                 className="px-6 py-2 rounded-full bg-[#6d4bde] text-white font-semibold shadow hover:bg-[#593bd1]"
//               >
//                 Refresh status
//               </button>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold mb-2">Indicator Guide</h4>
//             <ul className="list-disc list-inside text-sm space-y-1">
//               <li>Nomination Open (blue)</li>
//               <li>Nomination Closed / Waiting (gold)</li>
//               <li>Election Running (green)</li>
//               <li>Election Completed (purple)</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// _________________________________|||||||||||||||||||||
 
//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {[
//               { time: nomCountdown, label: "Nomination phase Ending..." },
//               { time: delayCountdown, label: "Delay Time Ending.." },
//               { time: elecCountdown, label: "Election Phase Ending.." },
//             ].map((x, i) => (

//               <div key={i} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-md p-4 text-center">
              
//                 <div className="bg-gray-100 rounded p-4 h-full flex flex-col justify-center items-center text-2xl font-mono bg-white text-black rounded-md px-3 py-2 inline-block shadow-sm">

//                   {formatSecondsToHMS(x.time)}
//                 </div>

//                 <div className="mt-2 text-sm font-medium ">{x.label}</div>
//               </div>
//             ))}
//           </div> 


// // DashboardTimers.jsx
// import React, { useEffect, useState } from "react";
// import { useElectionStatus } from "../../hooks/useElectionStatus";

// const formatTime = (ms) => {
//   if (ms <= 0) return "00:00:00";

//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
//   const seconds = String(totalSeconds % 60).padStart(2, "0");

//   return `${hours}:${minutes}:${seconds}`;
// };

// const DashboardTimers = () => {
//   const { status, loading, error } = useElectionStatus();
//   const [timers, setTimers] = useState({
//     nominationStart: "00:00:00",
//     nominationEnd: "00:00:00",
//     electionStart: "00:00:00",
//     electionEnd: "00:00:00",
//   });

//   const [dates, setDates] = useState({
//     nominationStartAt: null,
//     nominationEndAt: null,
//     electionStartAt: null,
//     electionEndAt: null,
//   });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("latestElectionMeta"));
//     if (stored) {
//       setDates({
//         nominationStartAt: new Date(stored.nominationStartAt),
//         nominationEndAt: new Date(stored.nominationEndAt),
//         electionStartAt: new Date(stored.electionStartAt),
//         electionEndAt: new Date(stored.electionEndAt),
//       });
//     }
//   }, [status]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (
//         !dates.nominationStartAt ||
//         !dates.nominationEndAt ||
//         !dates.electionStartAt ||
//         !dates.electionEndAt
//       ) {
//         return;
//       }

//       const now = new Date();

//       setTimers({
//         nominationStart: formatTime(dates.nominationStartAt - now),
//         nominationEnd: formatTime(dates.nominationEndAt - now),
//         electionStart: formatTime(dates.electionStartAt - now),
//         electionEnd: formatTime(dates.electionEndAt - now),
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [dates]);

//   if (loading) {
//     return (
//       <div className="text-center text-white text-lg py-6">
//         Loading dashboard timers...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-300 text-lg py-6">
//         Failed to fetch election status.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col ml-9  mt-10">
//       {/* TIMER GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[85%] max-w-[700px]">

//         {/* Timer Card */}
//         <TimerCard
//           title="Nomination Starts In"
//           time={timers.nominationStart}
//           color="bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Nomination Ends In"
//           time={timers.nominationEnd}
//           color="bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Election Starts In"
//           time={timers.electionStart}
//           color="bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Election Ends In"
//           time={timers.electionEnd}
//           color="bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//       </div>

//       {/* BUTTON */}
//       <button
//         className="mt-10 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-semibold rounded-xl shadow-lg shadow-black/40 transition-all duration-300"
//       >
//         More Details About the System
//       </button>
//     </div>
//   );
// };

// export default DashboardTimers;

// // -------------------------------------------------
// // Reusable Timer Card Component
// // -------------------------------------------------
// const TimerCard = ({ title, time, color }) => {
//   return (
//     <div
//       className={`p-6 text-center rounded-2xl bg-gradient-to-br ${color} shadow-xl shadow-black/30 border border-white/20 backdrop-blur-sm`}
//     >
//       <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
//       <p className="text-3xl font-bold text-white tracking-wider">{time}</p>
//     </div>
//   );
// };

// ________________________________________________________

// // DashboardTimers.jsx
// import React, { useEffect, useState } from "react";
// import { useElectionStatus } from "../../hooks/useElectionStatus";

// const formatTime = (ms) => {
//   if (ms <= 0) return "00:00:00";

//   const totalSeconds = Math.floor(ms / 1000);
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
//     2,
//     "0"
//   );
//   const seconds = String(totalSeconds % 60).padStart(2, "0");

//   return `${hours}:${minutes}:${seconds}`;
// };

// const DashboardTimers = () => {
//   const { status, loading, error } = useElectionStatus();
//   const [timers, setTimers] = useState({
//     nominationStart: "00:00:00",
//     nominationEnd: "00:00:00",
//     electionStart: "00:00:00",
//     electionEnd: "00:00:00",
//   });

//   const [dates, setDates] = useState({
//     nominationStartAt: null,
//     nominationEndAt: null,
//     electionStartAt: null,
//     electionEndAt: null,
//   });

//   // Fetch election metadata from localStorage stored by the hook
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("latestElectionMeta"));
//     if (stored) {
//       setDates({
//         nominationStartAt: new Date(stored.nominationStartAt),
//         nominationEndAt: new Date(stored.nominationEndAt),
//         electionStartAt: new Date(stored.electionStartAt),
//         electionEndAt: new Date(stored.electionEndAt),
//       });
//     }
//   }, [status]);

//   // -----------------------
//   // MASTER COUNTDOWN LOGIC
//   // -----------------------
//   useEffect(() => {
//     if (
//       !dates.nominationStartAt ||
//       !dates.nominationEndAt ||
//       !dates.electionStartAt ||
//       !dates.electionEndAt
//     ) {
//       return;
//     }

//     const interval = setInterval(() => {
//       const now = new Date();

//       const ns = dates.nominationStartAt - now;
//       const ne = dates.nominationEndAt - now;
//       const es = dates.electionStartAt - now;
//       const ee = dates.electionEndAt - now;

//       // PHASE LOGIC IMPLEMENTATION
//       if (now < dates.nominationStartAt) {
//         // BEFORE NOMINATION
//         setTimers({
//           nominationStart: formatTime(ns),
//           nominationEnd: "00:00:00",
//           electionStart: formatTime(es),
//           electionEnd: "00:00:00",
//         });
//       } else if (
//         now >= dates.nominationStartAt &&
//         now < dates.nominationEndAt
//       ) {
//         // DURING NOMINATION
//         setTimers({
//           nominationStart: "00:00:00",
//           nominationEnd: formatTime(ne),
//           electionStart: formatTime(es),
//           electionEnd: "00:00:00",
//         });
//       } else if (now >= dates.nominationEndAt && now < dates.electionStartAt) {
//         // BETWEEN NOMINATION END AND ELECTION START
//         setTimers({
//           nominationStart: "00:00:00",
//           nominationEnd: "00:00:00",
//           electionStart: formatTime(es),
//           electionEnd: "00:00:00",
//         });
//       } else if (now >= dates.electionStartAt && now < dates.electionEndAt) {
//         // DURING ELECTION
//         setTimers({
//           nominationStart: "00:00:00",
//           nominationEnd: "00:00:00",
//           electionStart: "00:00:00",
//           electionEnd: formatTime(ee),
//         });
//       } else {
//         // AFTER ELECTION
//         setTimers({
//           nominationStart: "00:00:00",
//           nominationEnd: "00:00:00",
//           electionStart: "00:00:00",
//           electionEnd: "00:00:00",
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [dates]);

//   // -----------------------
//   // LOADING + ERROR UI
//   // -----------------------
//   if (loading) {
//     return (
//       <div className="text-center text-white text-lg py-6">
//         Loading dashboard timers...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-300 text-lg py-6">
//         Failed to fetch election status.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col ml-9 mt-10">
//       {/* TIMER GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[85%] max-w-[700px]">
//         <TimerCard
//           title="Nomination Starts In"
//           time={timers.nominationStart}
//           color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Nomination Ends In"
//           time={timers.nominationEnd}
//           color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Election Starts In"
//           time={timers.electionStart}
//           color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />

//         <TimerCard
//           title="Election Ends In"
//           time={timers.electionEnd}
//           color="from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"
//         />
//       </div>
//       {/* BUTTON WRAPPER */}
//       <div className="mt-4">
//         <button className="flex items-center text-white hover:text-blue-200 text-2xl">
//           More Details About the System
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardTimers;

// // Reusable Timer Card
// const TimerCard = ({ title, time, color }) => {
//   return (
//     <div
//       className={`p-6 text-center rounded-2xl bg-gradient-to-br ${color} shadow-xl shadow-black/30 border border-white/20 backdrop-blur-sm`}
//     >
//       <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
//       <p className="text-3xl font-bold text-white tracking-wider">{time}</p>
//     </div>
//   );
// };






        <div className="relative flex flex-col py-12 flex-1 h-full bg-gradient-to-b from-emerald-950 to-emerald-100 overflow-auto">
  <h1 className=" flex-col text-center font-semibold text-5xl">
    ADMINISTRATION A
  </h1>
  <hr className="mt-16" />

  {/* Only show background, guide popup, timers on /dashboard_A */}
  {location.pathname === "/dashboard_A" && (
    <div className="absolute inset-0 top-[11rem] z-0">
      <AdminBackground />
      <DashboardGuidePopup/>
      <DashboardTimers />
    </div>
  )}

  <div className="relative z-10">
    <Routes>
      <Route path="/dashboard_A" element={<Dashboard_A />} />

      <Route path="rightButtonSec">
        <Route index element={<DBRightButtonSec />} />
        <Route path="addmembers" element={<AddMembers />} />
        <Route
          path="addMembers-Sis-Election"
          element={<AddMembersSisElection />}
        />
      </Route>

      <Route path="view-details-tab">
        <Route index element={<ViewDetailsTab />} />
        <Route
          path="view-President-Voters-Details"
          element={<ViewPresidentVoteDetails />}
        />
        <Route
          path="view-sis-voter-details"
          element={<ViewSisVoterDetails />}
        />
      </Route>
    </Routes>
  </div>
</div>