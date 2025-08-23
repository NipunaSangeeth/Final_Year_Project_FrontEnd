// import React, { useState } from "react";

// // // Import images from your assets folder

// import {
//   candidate1,
//   candidate2,
//   candidate3,
//   candidate4,
//   symbol1,
//   symbol2,
//   symbol3,
//   symbol4,
// } from "../assets";

// //Array LIst For Store to the Candidates
// const candidates = [
//   {
//     id: 1,
//     candidateImg: candidate1,
//     symbolImg: symbol1,
//     details: "Kasun Subasignha\nNumber 1",
//   },
//   {
//     id: 2,
//     candidateImg: candidate2,
//     symbolImg: symbol2,
//     details: "Upuli Seerashinha\nNumber 2",
//   },
//   {
//     id: 3,
//     candidateImg: candidate3,
//     symbolImg: symbol3,
//     details: "Radun Ganukkaduwa\nNumber 3",
//   },
//   {
//     id: 4,
//     candidateImg: candidate4,
//     symbolImg: symbol4,
//     details: "Inuru Radawadunna\nNumber 4",
//   },
// ];

// // hash generator part for the vote
// const generateBinaryHash = (candidateId) => {
//   // 1. Candidate identifier (4 bits)[Converts the ID to binary]
//   const candidateBinary = candidateId.toString(2).padStart(4, "0");

//   // 2. Random component (8 bits)[random number between 0 and 255]
//   const randomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");

//   // 3. Timestamp component (milliseconds since epoch, variable length)(it not mendotory just development perpose)
//   const timestampBinary = Date.now().toString(2);

//   // 4. Combine all components with separators
//   return `${candidateBinary}-${randomBits}-${timestampBinary}`;
// };

// const Placevotes = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null); //[HElp to track of which candidate was selected ]
//   const [hasVoted, setHasVoted] = useState(false); //[CHeake if the user has already voted]
//   const [isSubmitting, setIsSubmitting] = useState(false); //[ if the vote is currently being submitted]
//   const [currentBinaryHash, setCurrentBinaryHash] = useState("");
//   const [generatedHashes, setGeneratedHashes] = useState([]); // [STore the hased the Gena]erated]

//   const handleSelection = (id) => {
//     if (!hasVoted) {
//       setSelectedCandidate(id);
//       // Generate new binary hash immediately when candidate is selected(change on the)
//       const newHash = generateBinaryHash(id);
//       setCurrentBinaryHash(newHash);

//       // Log the generation to console
//       console.log(`Generated binary hash for Candidate ${id}:`, newHash);

//       // Store all generated hashes for reference
//       setGeneratedHashes((prev) => [
//         ...prev,
//         {
//           candidate: id,
//           hash: newHash,
//           time: new Date().toISOString(),
//         },
//       ]);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedCandidate) {
//       setIsSubmitting(true);

//       // Simulate blockchain submission without alerts
//       setTimeout(() => {
//         setHasVoted(true);
//         setIsSubmitting(false);
//       }, 1500);
//     }
//   };

//   const resetVoting = () => {
//     setSelectedCandidate(null);
//     setHasVoted(false);
//     setCurrentBinaryHash("");
//     setGeneratedHashes([]);
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       {/* Used some Conditional rendering Show the Success Voted MSG */}
//       {hasVoted ? (
//         <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
//           <p className="text-white text-xl mb-4">
//             Your vote has been successfully recorded!
//           </p>

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
//             {/* Only Testing Perpose  */}
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
//                 <span className="flex items-center">Submitting Vote...</span>
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
//_______$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//import React, { useState, useEffect } from "react";

// hash generator part for the vote
// const generateBinaryHash = (candidateNumber) => {
//   const candidateBinary = parseInt(candidateNumber)
//     .toString(2)
//     .padStart(4, "0");
//   const randomBits = Math.floor(Math.random() * 256)
//     .toString(2)
//     .padStart(8, "0");
//   const timestampBinary = Date.now().toString(2);
//   return `${candidateBinary}-${randomBits}-${timestampBinary}`;
// };

// const Placevotes = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentBinaryHash, setCurrentBinaryHash] = useState("");
//   const [generatedHashes, setGeneratedHashes] = useState([]);

//   // Fetch candidates from backend
//   useEffect(() => {
//     fetch("http://localhost:8000/api/get-addcandidate")
//       .then((res) => res.json())
//       .then((data) => {
//         setCandidates(data);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch candidates", err);
//       });
//   }, []);

//   const handleSelection = (candidateNumber) => {
//     if (!hasVoted) {
//       setSelectedCandidate(candidateNumber);
//       const newHash = generateBinaryHash(candidateNumber);
//       setCurrentBinaryHash(newHash);
//       setGeneratedHashes((prev) => [
//         ...prev,
//         {
//           candidate: candidateNumber,
//           hash: newHash,
//           time: new Date().toISOString(),
//         },
//       ]);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedCandidate) {
//       setIsSubmitting(true);
//       setTimeout(() => {
//         setHasVoted(true);
//         setIsSubmitting(false);
//       }, 1500);
//     }
//   };

//   const resetVoting = () => {
//     setSelectedCandidate(null);
//     setHasVoted(false);
//     setCurrentBinaryHash("");
//     setGeneratedHashes([]);
//   };

//   return (
//     <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

//       {hasVoted ? (
//         <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
//           <p className="text-white text-xl mb-4">
//             Your vote has been successfully recorded!
//           </p>
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
//                     key={candidate._id}
//                     className={`border-b border-gray-700 hover:bg-gray-700 transition-all ${
//                       hasVoted &&
//                       selectedCandidate !== candidate.candidate_number
//                         ? "opacity-40"
//                         : ""
//                     } ${
//                       selectedCandidate === candidate.candidate_number
//                         ? "bg-gray-700 bg-opacity-70"
//                         : ""
//                     }`}
//                   >
//                     <td className="px-4 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={candidate.candidate_image}
//                           alt={`Candidate ${candidate.candidate_name}`}
//                           className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
//                         />
//                         <span className="ml-3 font-medium">
//                           {candidate.candidate_name}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-4">
//                       <img
//                         src={candidate.candidate_simbol}
//                         alt={`Symbol for ${candidate.candidate_name}`}
//                         className="h-12 w-12 object-contain"
//                       />
//                     </td>
//                     <td className="px-4 py-4 whitespace-pre-line">
//                       {`${candidate.candidate_name}\nNumber ${candidate.candidate_number}`}
//                     </td>
//                     <td className="px-4 py-4 text-center">
//                       <input
//                         type="radio"
//                         name="candidateSelection"
//                         className="h-5 w-5 cursor-pointer"
//                         checked={
//                           selectedCandidate === candidate.candidate_number
//                         }
//                         onChange={() =>
//                           handleSelection(candidate.candidate_number)
//                         }
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
//                 <span className="flex items-center">Submitting Vote...</span>
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

// %%%%%%%%%%%%%%%%%

// Placevotes.jsx
import React, { useState, useEffect } from "react";

// Binary hash generator for vote tracking (for dev/demo purposes)
const generateBinaryHash = (candidateNumber) => {
  const candidateBinary = parseInt(candidateNumber)
    .toString(2)
    .padStart(4, "0");
  const randomBits = Math.floor(Math.random() * 256)
    .toString(2)
    .padStart(8, "0");
  const timestampBinary = Date.now().toString(2);
  return `${candidateBinary}-${randomBits}-${timestampBinary}`;
};

// Success message component
const VoteSuccessCard = ({ onReset }) => (
  <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center max-w-md">
    <p className="text-white text-xl mb-4">
      Your vote has been successfully recorded!
    </p>
    <button
      onClick={onReset}
      className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
    >
      Demo: Vote Again
    </button>
  </div>
);

// Voting UI component
const VotingSection = ({
  candidates,
  selectedCandidate,
  onSelect,
  onSubmit,
  isSubmitting,
  hasVoted,
}) => (
  <>
    <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="px-4 py-3">Candidate</th>
            <th className="px-4 py-3">Symbol</th>
            <th className="px-4 py-3">Details</th>
            <th className="px-4 py-3 text-center">Select</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate._id}
              className={`border-b border-gray-700 hover:bg-gray-700 transition-all ${
                hasVoted && selectedCandidate !== candidate.candidate_number
                  ? "opacity-40"
                  : ""
              } ${
                selectedCandidate === candidate.candidate_number
                  ? "bg-gray-700 bg-opacity-70"
                  : ""
              }`}
            >
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <img
                    src={candidate.candidate_image}
                    alt={`Candidate ${candidate.candidate_name}`}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-500"
                  />
                  <span className="ml-3 font-medium">
                    {candidate.candidate_name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <img
                  src={candidate.candidate_simbol}
                  alt={`Symbol for ${candidate.candidate_name}`}
                  className="h-12 w-12 object-contain"
                />
              </td>
              <td className="px-4 py-4 whitespace-pre-line">
                {`${candidate.candidate_name}\nNumber ${candidate.candidate_number}`}
              </td>
              <td className="px-4 py-4 text-center">
                <input
                  type="radio"
                  name="candidateSelection"
                  className="h-5 w-5 cursor-pointer"
                  checked={selectedCandidate === candidate.candidate_number}
                  onChange={() => onSelect(candidate.candidate_number)}
                  disabled={hasVoted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Confirm vote button */}
    <div className="mt-8 flex flex-col items-center">
      <button
        className={`px-10 py-3 text-white font-bold text-lg rounded-lg focus:outline-none transition-all ${
          isSubmitting
            ? "bg-gray-600 cursor-not-allowed"
            : selectedCandidate
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-gray-600 cursor-not-allowed"
        }`}
        onClick={onSubmit}
        disabled={!selectedCandidate || isSubmitting}
      >
        {isSubmitting ? "Submitting Vote..." : "CONFIRM VOTE"}
      </button>

      {selectedCandidate && !hasVoted && (
        <p className="mt-4 text-gray-300 text-sm">
          You are voting for:{" "}
          <span className="font-bold">Candidate {selectedCandidate}</span>
        </p>
      )}
    </div>
  </>
);

const Placevotes = () => {
  const [candidates, setCandidates] = useState([]); // Fetched candidate list
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Selected candidate number
  const [hasVoted, setHasVoted] = useState(false); // Track vote status
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submit state
  const [currentBinaryHash, setCurrentBinaryHash] = useState(""); // For dev: binary hash per vote
  const [generatedHashes, setGeneratedHashes] = useState([]); // Store vote hashes (optional)
  const [loading, setLoading] = useState(true); // Track loading
  const [error, setError] = useState(""); // Track fetch error

  // Fetch candidate data on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/get-addcandidate")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch candidates.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Handle selecting a candidate
  const handleSelection = (candidateNumber) => {
    if (!hasVoted) {
      setSelectedCandidate(candidateNumber);
      const newHash = generateBinaryHash(candidateNumber);
      setCurrentBinaryHash(newHash);
      setGeneratedHashes((prev) => [
        ...prev,
        {
          candidate: candidateNumber,
          hash: newHash,
          time: new Date().toISOString(),
        },
      ]);
    }
  };

  // Handle vote submission (simulated here)
  const handleSubmit = () => {
    if (selectedCandidate) {
      setIsSubmitting(true);
      setTimeout(() => {
        setHasVoted(true);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  // Reset vote for demo/testing
  const resetVoting = () => {
    setSelectedCandidate(null);
    setHasVoted(false);
    setCurrentBinaryHash("");
    setGeneratedHashes([]);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Cast Your Vote</h1>

      {loading ? (
        <p className="text-white">Loading candidates...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : hasVoted ? (
        <VoteSuccessCard onReset={resetVoting} />
      ) : (
        <VotingSection
          candidates={candidates}
          selectedCandidate={selectedCandidate}
          onSelect={handleSelection}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasVoted={hasVoted}
        />
      )}
    </div>
  );
};

export default Placevotes;
