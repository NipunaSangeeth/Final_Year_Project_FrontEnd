// import React, { useEffect, useState } from "react";
// import axios from "axios";



// const PreviousPresidentElec = () => {
//   // selectedYear controls which API to call
//   const [selectedYear, setSelectedYear] = useState("2024");

//   // data fetched from API
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // available years to choose from (you can adapt this list or fetch from backend)
//   const availableYears = ["2024", "2023", "2022"];

//   // Fetch function: call API when selectedYear changes
//   useEffect(() => {
//     const fetchElection = async () => {
//       setLoading(true);
//       setError(null);
//       setResult(null);

//       try {
//         // Update this base URL if your backend uses /api prefix
//         // Endpoint expected: /previousresults/president/:year
//         const url = `/previousresults/president/${selectedYear}`;

//         const res = await axios.get(url);
//         // Basic validation and fallback mapping:
//         const data = res.data;

//         // If backend uses a different structure, normalize here
//         // We'll expect the backend to return the fields described above.
//         setResult({
//           year: data.year || Number(selectedYear),
//           totalVotes: typeof data.totalVotes === "number" ? data.totalVotes : (data.totalVotes ? Number(data.totalVotes) : 0),
//           candidates: Array.isArray(data.candidates) ? data.candidates : [],
//           winner: data.winner || (Array.isArray(data.candidates) && data.candidates.length ? data.candidates.reduce((p,c) => (p.votes>c.votes? p:c)).name : null),
//           positions: data.positions || 1,
//         });
//       } catch (err) {
//         console.error("Failed to fetch previous president election:", err);
//         setError("Failed to load election data. Check backend or endpoint.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchElection();
//   }, [selectedYear]);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//       {/* Header & Year selector */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           President Election — {selectedYear}
//         </h2>

//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//           className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
//         >
//           {availableYears.map((y) => (
//             <option key={y} value={y}>
//               {y}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Loading / Error */}
//       {loading && <p className="text-gray-600">Loading election data…</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {/* Render results */}
//       {!loading && !error && result && (
//         <>
//           {/* Summary stats row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//               <p className="text-sm text-gray-600">Total Votes</p>
//               <p className="text-2xl font-bold text-gray-900">{result.totalVotes}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//               <p className="text-sm text-gray-600">Positions</p>
//               <p className="text-2xl font-bold text-gray-900">{result.positions}</p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//               <p className="text-sm text-gray-600">Candidates</p>
//               <p className="text-2xl font-bold text-gray-900">{result.candidates.length}</p>
//             </div>
//           </div>

//           {/* Winner highlight */}
//           <div className="mb-6 border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
//             <div className="flex items-center">
//               <div className="mr-4">
//                 <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
//                   <span className="text-yellow-700 font-bold">1</span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800">
//                   {result.winner || "—"}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Winner with{" "}
//                   {(() => {
//                     // find winner votes if candidate list present
//                     const w = result.candidates.reduce((prev, curr) => (prev.votes > curr.votes ? prev : curr), result.candidates[0] || { votes: 0 });
//                     return w ? w.votes : 0;
//                   })()}{" "}
//                   votes
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Candidates list */}
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {result.candidates.map((c, idx) => (
//                 <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-semibold text-gray-800">{c.name}</h4>
//                       <p className="text-sm text-gray-600">{c.votes} votes</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-semibold text-gray-800">
//                         {typeof c.percentage === "number" ? c.percentage.toFixed(1) : c.percentage}
//                         %
//                       </p>
//                     </div>
//                   </div>

//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                     <div
//                       className="h-2 rounded-full"
//                       style={{
//                         width: `${typeof c.percentage === "number" ? c.percentage : Number(c.percentage) || 0}%`,
//                         backgroundColor: "#3B82F6",
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       {/* No data fallback */}
//       {!loading && !error && (!result || result.candidates.length === 0) && (
//         <p className="text-gray-600 mt-4">No election data available for {selectedYear}.</p>
//       )}
//     </div>
//   );
// };

// export default PreviousPresidentElec;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PreviousPresidentElec = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const availableYears = ["2024", "2023", "2022"];

  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        // ✅ Corrected API endpoint
        const url = `http://localhost:8000/api/previousresults/president/${selectedYear}`;

        const res = await axios.get(url);
        const data = res.data;

        // Normalize data (safety fallback)
        setResult({
          year: data.year || Number(selectedYear),
          totalVotes: typeof data.totalVotes === "number" ? data.totalVotes : 0,
          candidates: Array.isArray(data.candidates) ? data.candidates : [],
          winner:
            data.winner ||
            (Array.isArray(data.candidates) && data.candidates.length
              ? data.candidates.reduce((p, c) => (p.votes > c.votes ? p : c)).name
              : null),
          positions: 1,
        });
      } catch (err) {
        console.error("❌ Failed to fetch previous president election:", err);
        setError("Failed to load election data. Check backend or endpoint.");
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [selectedYear]);

  const navigate = useNavigate();

  return (
    <div className="bg-slate-500 rounded-xl shadow-md p-6 border border-gray-100">
            <>
              {" "}
              <button
                className="flex items-center text-white hover:text-blue-200 mt-2 mb-7 text-2xl"
                onClick={() => navigate("/dashboard_B")}
              >
                <FiArrowLeft className="mr-2" />
                Back to Dashboard
              </button>
            </>
      {/* Header & Year selector */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          President Election — {selectedYear}
        </h2>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-600">Loading election data…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Render results */}
      {!loading && !error && result && (
        <>
          {/* Summary stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900">{result.totalVotes}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Positions</p>
              <p className="text-2xl font-bold text-gray-900">{result.positions}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{result.candidates.length}</p>
            </div>
          </div>

          {/* Winner highlight */}
          <div className="mb-6 border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-700 font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {result.winner || "—"}
                </h3>
                <p className="text-sm text-gray-600">
                  Winner with{" "}
                  {(() => {
                    const w = result.candidates.reduce(
                      (prev, curr) => (prev.votes > curr.votes ? prev : curr),
                      result.candidates[0] || { votes: 0 }
                    );
                    return w ? w.votes : 0;
                  })()}{" "}
                  votes
                </p>
              </div>
            </div>
          </div>

          {/* Candidates list */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.candidates.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{c.name}</h4>
                      <p className="text-sm text-gray-600">{c.votes} votes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">
                        {typeof c.percentage === "number"
                          ? c.percentage.toFixed(1)
                          : c.percentage}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${
                          typeof c.percentage === "number"
                            ? c.percentage
                            : Number(c.percentage) || 0
                        }%`,
                        backgroundColor: "#3B82F6",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* No data fallback */}
      {!loading && !error && (!result || result.candidates.length === 0) && (
        <p className="text-gray-600 mt-4">
          No election data available for {selectedYear}.
        </p>
      )}
    </div>
  );
};

export default PreviousPresidentElec;
