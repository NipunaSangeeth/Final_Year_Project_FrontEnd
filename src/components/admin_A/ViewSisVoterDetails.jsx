import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewSisVoterDetails = () => {
  const navigate = useNavigate();
  const [sisvoter, setSisVoter] = useState([]);

  useEffect(() => {
    const FetchSisVoters = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-addvoter");
        if (!response.ok) {
          throw new Error("faild to fetch SIS Voter");
        }
        const data = await response.json();
        setSisVoter(data);
      } catch (error) {
        console.error("Error fetching SIS voter details:", error);
      }
    };
    FetchSisVoters();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Sis Election Voters Details
        </h1>
        <button
          onClick={() => navigate(-1)} // [-1 is Go tothe back]
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
              <th className="py-3 px-4 border">Registration Number</th>
              <th className="py-3 px-4 border">Batch</th>
              <th className="py-3 px-4 border">Faculty</th>
            </tr>
          </thead>
          <tbody>
            {sisvoter.length > 0 ? (
              sisvoter.map((voter, index) => (
                <tr key={voter._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {voter.student_name}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {voter.register_number}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {voter.batch}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {voter.faculty}
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

export default ViewSisVoterDetails;
