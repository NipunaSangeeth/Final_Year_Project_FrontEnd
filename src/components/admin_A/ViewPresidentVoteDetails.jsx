// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ViewPresidentVoteDetails = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {" "}
//           Presidnt Election Voters Details
//         </h1>
//         <button
//           onClick={() => navigate(-1)} // [-1 is Go tothe back]
//           className="flex items-center text-blue-950 hover:text-blue-800"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//       <div className="overflow-x-auto rounded-lg shadow-lg">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-sky-700 text-white">
//             <tr>
//               <th className="py-3 px-4 border">#</th>
//               <th className="py-3 px-4 border">Name</th>
//               <th className="py-3 px-4 border">NIC</th>
//               <th className="py-3 px-4 border">DOB</th>
//               <th className="py-3 px-4 border">Gender</th>
//               <th className="py-3 px-4 border">Distric</th>
//             </tr>
//           </thead>
//           <tbody>{/* put the Maping data */}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewPresidentVoteDetails;

//________

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewPresidentVoteDetails = () => {
  const navigate = useNavigate();
  const [voters, setVoters] = useState([]);

  // Fetch voter data from MongoDB via backend API
  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-addmember");
        if (!response.ok) {
          throw new Error("Failed to fetch voters");
        }
        const data = await response.json();
        setVoters(data); // Set the fetched voter data
      } catch (error) {
        console.error("Error fetching voter details:", error);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          President Election Voters Details
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-950 hover:text-blue-800"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">NIC</th>
              <th className="py-3 px-4 border">DOB</th>
              <th className="py-3 px-4 border">Gender</th>
              <th className="py-3 px-4 border">District</th>
            </tr>
          </thead>
          <tbody>
            {voters.length > 0 ? (
              voters.map((voter, index) => (
                <tr key={voter._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {voter.member_name}
                  </td>
                  <td className="py-2 px-4 border text-center">{voter.nic}</td>
                  <td className="py-2 px-4 border text-center">{voter.dob}</td>
                  <td className="py-2 px-4 border text-center">
                    {voter.gender}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {voter.distric}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No voter data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPresidentVoteDetails;
