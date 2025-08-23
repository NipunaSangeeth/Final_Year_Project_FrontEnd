import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CandidateDetails = () => {
  const navigate = useNavigate();
  const [siscandidates, setSisCandidates] = useState([]);

  useEffect(() => {
    const fetchSisCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get-addcandidate-sis-elec"
        );
        setSisCandidates(response.data);
      } catch (error) {
        console.error("Error fetching SIS candidates:", error);
      }
    };

    fetchSisCandidates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {" "}
          SIS Candidate Details
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
              <th className="py-3 px-4 border">Position</th>
              <th className="py-3 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {siscandidates.length > 0 ? (
              siscandidates.map((siscandidate, index) => (
                <tr key={siscandidate._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{siscandidate.sis_name}</td>
                  <td className="py-2 px-4">{siscandidate.sis_regnumber}</td>
                  <td className="py-2 px-4">{siscandidate.sis_batch}</td>
                  <td className="py-2 px-4">{siscandidate.sis_faculty}</td>
                  <td className="py-2 px-4">{siscandidate.sis_position}</td>
                  <td className="py-2 px-4">{siscandidate.sis_image}</td>
                  <td className="py-2 px-4 text-center">
                    {siscandidate._number}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {siscandidate._image ? (
                      <img
                        src={siscandidate._image}
                        alt={siscandidate._name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateDetails;
