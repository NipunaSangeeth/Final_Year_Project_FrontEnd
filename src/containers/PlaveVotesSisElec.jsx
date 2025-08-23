// import React from "react";

// const genarateSisBinaryHahs = (sisCandidateNumber) => {
//   const sisCandidateBinary = parseInt(sisCandidateNumber)
//     .toString(2)
//     .padStart(4, "0");
//   const sisrandomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");
//   const timeStampBiary = Date.now().toString(2);
//   return `${sisCandidateBinary}-${sisrandomBits}-${timeStampBiary}`;
// };

// const PlaveVotesSisElec = () => {
//   return (
//     <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       <div className="w-full md:w-[60%] bg-gray-300 p-6 rounded-lg shadow-lg">
//         {positions.map((position, i) => (
//           <div key={i} className="mb-10">
//             <h2 className="text-xl font-bold text-white mb-2">{position}</h2>
//             <div className="grid grid-cols-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-t-lg">
//               <span>Candidate</span>
//               <span>Name</span>
//               <span>Position</span>
//               <span>Click</span>
//             </div>
//             {candidates.map((candidate) => (
//               <div
//                 key={candidate.id}
//                 className="grid grid-cols-4 items-center bg-gray-800 text-white py-3 px-4 border-b border-gray-600"
//               >
//                 <img
//                   src={candidate.image}
//                   alt="candidate"
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <span className="text-center">{candidate.name}</span>
//                 <span className="text-center">{candidate.position}</span>
//                 <input
//                   type="checkbox"
//                   className="mx-auto w-5 h-5"
//                   name={`${position}-candidate-${candidate.id}`}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlaveVotesSisElec;

// $$$$$$$$$$$$$$$$$$$$$$$$$$$

// // PlaveVotesSisElec.jsx
// import React, { useEffect, useState } from "react";

// // Binary hash generator for SIS vote tracking (optional dev tool)
// const genarateSisBinaryHahs = (sisCandidateNumber) => {
//   const sisCandidateBinary = parseInt(sisCandidateNumber)
//     .toString(2)
//     .padStart(4, "0");
//   const sisrandomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");
//   const timeStampBiary = Date.now().toString(2);
//   return `${sisCandidateBinary}-${sisrandomBits}-${timeStampBiary}`;
// };

// const PlaveVotesSisElec = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all SIS candidates on component mount
//   useEffect(() => {
//     fetch("http://localhost:8000/api/get-addcandidate-sis-elec")
//       .then((res) => res.json())
//       .then((data) => {
//         setCandidates(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch SIS candidates:", error);
//         setError("Failed to fetch SIS candidates.");
//         setLoading(false);
//       });
//   }, []);

//   // Extract unique positions
//   const positions = [...new Set(candidates.map((c) => c.sis_position))];

//   return (
//     <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       {loading ? (
//         <p className="text-white">Loading candidates...</p>
//       ) : error ? (
//         <p className="text-red-400">{error}</p>
//       ) : (
//         <div className="w-full md:w-[80%] bg-gray-300 p-6 rounded-lg shadow-lg">
//           {positions.map((position, i) => (
//             <div key={i} className="mb-10">
//               <h2 className="text-xl font-bold text-white mb-2 bg-gray-800 px-4 py-2 rounded">
//                 {position}
//               </h2>

//               <div className="grid grid-cols-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-t-lg">
//                 <span>Candidate</span>
//                 <span>Name</span>
//                 <span>Position</span>
//                 <span>Click</span>
//               </div>

//               {candidates
//                 .filter((candidate) => candidate.sis_position === position)
//                 .map((candidate) => (
//                   <div
//                     key={candidate._id}
//                     className="grid grid-cols-4 items-center bg-gray-800 text-white py-3 px-4 border-b border-gray-600"
//                   >
//                     <img
//                       src={candidate.sis_image}
//                       alt={candidate.sis_name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <span className="text-center">{candidate.sis_name}</span>
//                     <span className="text-center">
//                       {candidate.sis_position}
//                     </span>
//                     <input
//                       type="checkbox"
//                       className="mx-auto w-5 h-5"
//                       name={`${position}-candidate-${candidate._id}`}
//                     />
//                   </div>
//                 ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaveVotesSisElec;

// import React from "react";

// const PlaveVotesSisElec = () => {
//   return <div>PlaveVotesSisElec</div>;
// };

// export default PlaveVotesSisElec;

//______GPT__________

// import React, { useEffect, useState } from "react";

// const generateSisBinaryHash = (sisCandidateNumber) => {
//   const sisCandidateBinary = parseInt(sisCandidateNumber)
//     .toString(2)
//     .padStart(4, "0");
//   const sisrandomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");
//   const timeStampBinary = Date.now().toString(2);
//   return `${sisCandidateBinary}-${sisrandomBits}-${timeStampBinary}`;
// };

// const PlaveVotesSisElec = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [groupedCandidates, setGroupedCandidates] = useState({});
//   const [selectedCandidates, setSelectedCandidates] = useState({});
//   const [voteHashes, setVoteHashes] = useState([]);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/get-addcandidate-sis-elec")
//       .then((res) => res.json())
//       .then((data) => {
//         setCandidates(data);
//         const grouped = data.reduce((acc, candidate) => {
//           if (!acc[candidate.sis_position]) {
//             acc[candidate.sis_position] = [];
//           }
//           acc[candidate.sis_position].push(candidate);
//           return acc;
//         }, {});
//         setGroupedCandidates(grouped);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching candidates:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleSelection = (position, candidateId) => {
//     if (hasVoted) return;
//     const updatedSelections = {
//       ...selectedCandidates,
//       [position]: candidateId,
//     };
//     setSelectedCandidates(updatedSelections);

//     // const hash = generateSisBinaryHash(candidateId);
//     // const updatedHashes = Object.entries(updatedSelections).map(
//     //   ([pos, id]) => ({
//     //     position: pos,
//     //     candidateId: id,
//     //     hash,
//     //     timestamp: new Date().toISOString(),
//     //   })
//     // );
//     // setVoteHashes(updatedHashes);
//   };

//   const handleSubmit = () => {
//     if (Object.keys(selectedCandidates).length === 0) return;
//     // setHasVoted(true);
//     // console.log("Vote Hashes:", voteHashes);

//     const hashes = Object.entries(selectedCandidates).map(
//       ([position, candidateId]) => {
//         const hash = generateSisBinaryHash(candidateId);
//         const candidate = candidates.find((c) => c._id === candidateId);
//         console.log(
//           `🧾 ${position} → ${candidate?.sis_name || "Unknown"} → Hash: ${hash}`
//         );
//         return {
//           position,
//           candidateName: candidate?.sis_name || "Unknown",
//           hash,
//           timestamp: new Date().toISOString(),
//         };
//       }
//     );

//     setVoteHashes(hashes);
//     setHasVoted(true);
//   };

//   const resetVoting = () => {
//     setSelectedCandidates({});
//     setVoteHashes([]);
//     setHasVoted(false);
//   };

//   return (
//     <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>
//       {loading ? (
//         <p className="text-white">Loading candidates...</p>
//       ) : hasVoted ? (
//         <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-center">
//           <p className="text-white text-xl mb-4">
//             Your SIS vote has been recorded!
//           </p>

//           {/* Show selected names */}
//           <div className="text-white text-left text-sm mt-4">
//             {Object.entries(selectedCandidates).map(
//               ([position, candidateId]) => {
//                 const candidate = candidates.find((c) => c._id === candidateId);
//                 return (
//                   <p key={position}>
//                     You voted for <strong>{position}</strong>:{" "}
//                     {candidate?.sis_name || "Unknown"}
//                   </p>
//                 );
//               }
//             )}
//           </div>

//           <button
//             onClick={resetVoting}
//             className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
//           >
//             Vote Again (Demo)
//           </button>
//         </div>
//       ) : (
//         <div className="w-full md:w-[60%] bg-gray-300 p-6 rounded-lg shadow-lg">
//           {Object.keys(groupedCandidates).map((position) => (
//             <div key={position} className="mb-10">
//               <h2 className="text-xl font-bold text-white mb-2 bg-gray-700 p-2 rounded">
//                 {position}
//               </h2>
//               <div className="grid grid-cols-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-t-lg">
//                 <span>Candidate</span>
//                 <span>Name</span>
//                 <span>Position</span>
//                 <span>Select</span>
//               </div>
//               {groupedCandidates[position].map((candidate) => (
//                 <div
//                   key={candidate._id}
//                   className="grid grid-cols-4 items-center bg-gray-800 text-white py-3 px-4 border-b border-gray-600"
//                 >
//                   <img
//                     src={candidate.sis_image}
//                     alt="candidate"
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <span className="text-center">{candidate.sis_name}</span>
//                   <span className="text-center">{candidate.sis_position}</span>
//                   <input
//                     type="radio"
//                     className="mx-auto w-5 h-5"
//                     name={`vote-${position}`}
//                     checked={selectedCandidates[position] === candidate._id}
//                     onChange={() => handleSelection(position, candidate._id)}
//                     disabled={hasVoted}
//                   />
//                 </div>
//               ))}
//             </div>
//           ))}

//           <div className="mt-8 flex flex-col items-center">
//             <button
//               className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
//                 Object.keys(selectedCandidates).length > 0
//                   ? "bg-orange-500 hover:bg-orange-600"
//                   : "bg-gray-600 cursor-not-allowed"
//               }`}
//               onClick={handleSubmit}
//               disabled={
//                 Object.keys(selectedCandidates).length === 0 || hasVoted
//               }
//             >
//               CONFIRM VOTE
//             </button>

//             {Object.entries(selectedCandidates).map(
//               ([position, candidateId]) => (
//                 <p key={position} className="mt-2 text-white text-sm">
//                   You voted for <strong>{position}</strong>: {candidateId}
//                 </p>
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaveVotesSisElec;

import React, { useEffect, useState } from "react";

const generateSisBinaryHash = (sisCandidateNumber) => {
  const sisCandidateBinary = parseInt(sisCandidateNumber, 16) // If ID is string/hex
    .toString(2)
    .padStart(8, "0");
  const sisrandomBits = Math.floor(Math.random() * 256)
    .toString(2)
    .padStart(8, "0");
  const timeStampBinary = Date.now().toString(2);
  return `${sisCandidateBinary}-${sisrandomBits}-${timeStampBinary}`;
};

const PlaveVotesSisElec = () => {
  const [candidates, setCandidates] = useState([]);
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [voteHashes, setVoteHashes] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/get-addcandidate-sis-elec")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);

        const grouped = data.reduce((acc, candidate) => {
          if (!acc[candidate.sis_position]) {
            acc[candidate.sis_position] = [];
          }
          acc[candidate.sis_position].push(candidate);
          return acc;
        }, {});

        setGroupedCandidates(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching candidates:", err);
        setLoading(false);
      });
  }, []);

  const handleSelection = (position, candidateId) => {
    if (hasVoted) return;

    const updatedSelections = {
      ...selectedCandidates,
      [position]: candidateId,
    };
    setSelectedCandidates(updatedSelections);

    // Optional: update voteHashes live (can also be done after confirm)
  };

  const handleSubmit = () => {
    if (Object.keys(selectedCandidates).length === 0) return;

    const hashes = Object.entries(selectedCandidates).map(
      ([position, candidateId]) => {
        const hash = generateSisBinaryHash(candidateId);
        const candidate = candidates.find((c) => c._id === candidateId);
        console.log(
          `🧾 ${position} → ${candidate?.sis_name || "Unknown"} → Hash: ${hash}`
        );
        return {
          position,
          candidateName: candidate?.sis_name || "Unknown",
          hash,
          timestamp: new Date().toISOString(),
        };
      }
    );

    setVoteHashes(hashes);
    setHasVoted(true);
  };

  const resetVoting = () => {
    setSelectedCandidates({});
    setVoteHashes([]);
    setHasVoted(false);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

      {loading ? (
        <p className="text-white">Loading candidates...</p>
      ) : hasVoted ? (
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-center">
          <p className="text-white text-xl mb-4">
            Your SIS vote has been recorded!
          </p>

          {/* Show selected names */}
          <div className="text-white text-left text-sm mt-4">
            {Object.entries(selectedCandidates).map(
              ([position, candidateId]) => {
                const candidate = candidates.find((c) => c._id === candidateId);
                return (
                  <p key={position}>
                    You voted for <strong>{position}</strong>:{" "}
                    {candidate?.sis_name || "Unknown"}
                  </p>
                );
              }
            )}
          </div>

          <button
            onClick={resetVoting}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          >
            Vote Again (Demo)
          </button>
        </div>
      ) : (
        <div className="w-full md:w-[60%] bg-gray-300 p-6 rounded-lg shadow-lg">
          {Object.keys(groupedCandidates).map((position) => (
            <div key={position} className="mb-10">
              <h2 className="text-xl font-bold text-white mb-2 bg-gray-700 p-2 rounded">
                {position}
              </h2>
              <div className="grid grid-cols-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-t-lg">
                <span>Candidate</span>
                <span>Name</span>
                <span>Position</span>
                <span>Select</span>
              </div>
              {groupedCandidates[position].map((candidate) => (
                <div
                  key={candidate._id}
                  className="grid grid-cols-4 items-center bg-gray-800 text-white py-3 px-4 border-b border-gray-600"
                >
                  <img
                    src={candidate.sis_image}
                    alt="candidate"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="text-center">{candidate.sis_name}</span>
                  <span className="text-center">{candidate.sis_position}</span>
                  <input
                    type="radio"
                    className="mx-auto w-5 h-5"
                    name={`vote-${position}`}
                    checked={selectedCandidates[position] === candidate._id}
                    onChange={() => handleSelection(position, candidate._id)}
                    disabled={hasVoted}
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="mt-8 flex flex-col items-center">
            <button
              className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
                Object.keys(selectedCandidates).length > 0
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={
                Object.keys(selectedCandidates).length === 0 || hasVoted
              }
            >
              CONFIRM VOTE
            </button>

            {/* Preview (Before submitting) */}
            {Object.entries(selectedCandidates).map(
              ([position, candidateId]) => {
                const candidate = candidates.find((c) => c._id === candidateId);
                return (
                  <p key={position} className="mt-2 text-white text-sm">
                    You selected <strong>{position}</strong>:{" "}
                    {candidate?.sis_name || "Unknown"}
                  </p>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaveVotesSisElec;
