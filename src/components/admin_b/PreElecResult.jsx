import React, { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FiArrowLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Register ChartJS components

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const PreElecResult = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("president");
  const [expandedYear, setExpandedYear] = useState(2025);
  // Sample election data
  const electionData = {
    president: {
      2025: {
        title: "President Election 2025",
        totalVotes: 1500,
        positions: [
          {
            title: "President",
            color: "#3B82F6",
            candidates: [
              {
                id: 1,
                name: "John Smith",
                image: "",
                votes: 850,
                percentage: 56.7,
              },
              {
                id: 2,
                name: "Sarah Johnson",
                image: "",
                votes: 650,
                percentage: 43.3,
              },
            ],
          },
        ],
      },
      2024: {
        title: "President Election 2024",
        totalVotes: 1400,
        positions: [
          {
            title: "President",
            color: "#3B82F6",
            candidates: [
              {
                id: 1,
                name: "Michael Brown",
                image: "",
                votes: 920,
                percentage: 65.7,
              },
              {
                id: 2,
                name: "Emily Davis",
                image: "",
                votes: 480,
                percentage: 34.3,
              },
            ],
          },
        ],
      },
    },
    sis: {
      2025: {
        title: "SIS Election 2025",
        totalVotes: 2000,
        positions: [
          {
            title: "SIS President",
            color: "#3B82F6",
            candidates: [
              {
                id: 1,
                name: "Hiruni Vimanya",
                image: "",
                votes: 320,
                percentage: 16.0,
              },
              {
                id: 2,
                name: "Kassapa Jayasooriya",
                image: "",
                votes: 280,
                percentage: 14.0,
              },
            ],
          },
          {
            title: "SIS Vice President",
            color: "#10B981",
            candidates: [
              {
                id: 3,
                name: "Nayomi Kalansooriya",
                image: "",
                votes: 290,
                percentage: 14.5,
              },
              {
                id: 4,
                name: "Garuka Mannapperuma",
                image: "",
                votes: 310,
                percentage: 15.5,
              },
            ],
          },
        ],
      },
      2024: {
        title: "SIS Election 2024",
        totalVotes: 1800,
        positions: [
          {
            title: "SIS President",
            color: "#3B82F6",
            candidates: [
              {
                id: 1,
                name: "Ovilu Rupasinha",
                image: "",
                votes: 400,
                percentage: 22.2,
              },
              {
                id: 2,
                name: "Dasmika Kodithuwakku",
                image: "",
                votes: 350,
                percentage: 19.4,
              },
            ],
          },
          {
            title: "SIS Vice President",
            color: "#10B981",
            candidates: [
              {
                id: 3,
                name: "Avidu Bandara",
                image: "",
                votes: 420,
                percentage: 23.3,
              },
              {
                id: 4,
                name: "Wimadu Ganthotage",
                image: "",
                votes: 380,
                percentage: 21.1,
              },
            ],
          },
        ],
      },
    },
  };

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const renderElectionCard = (election, year) => {
    return (
      <div key={year} className="mb-8">
        <div
          className="flex justify-between items-center bg-white p-4 rounded-t-lg shadow-sm cursor-pointer"
          onClick={() => toggleYear(year)}
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {election.title}
          </h3>
          <span className="text-gray-500">
            {expandedYear === year ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>

        {expandedYear === year && (
          <div className="bg-gray-50 p-6 rounded-b-lg shadow-md border border-t-0 border-gray-200">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <p className="text-sm text-gray-500">Total Votes</p>
                <p className="text-2xl font-bold">{election.totalVotes}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <p className="text-sm text-gray-500">Positions</p>
                <p className="text-2xl font-bold">
                  {election.positions.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="text-sm text-gray-500">Candidates</p>
                <p className="text-2xl font-bold">
                  {election.positions.reduce(
                    (sum, pos) => sum + pos.candidates.length,
                    0
                  )}
                </p>
              </div>
            </div>

            {/* Results by Position */}
            {election.positions.map((position) => (
              <div key={position.title} className="mb-8">
                <div className="flex items-center mb-4">
                  <div
                    className="w-3 h-8 rounded-full mr-3"
                    style={{ backgroundColor: position.color }}
                  />
                  <h4 className="text-lg font-semibold text-gray-700">
                    {position.title}
                  </h4>
                </div>

                {/* Winner Highlight */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-2 border-yellow-400">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800">
                        {
                          position.candidates.reduce((prev, current) =>
                            prev.votes > current.votes ? prev : current
                          ).name
                        }
                      </h5>
                      <p className="text-sm text-gray-600">
                        Winner with{" "}
                        {Math.max(...position.candidates.map((c) => c.votes))}{" "}
                        votes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Candidates List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {position.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">
                            {candidate.name}
                          </h5>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-600">
                              {candidate.votes} votes
                            </span>
                            <span className="text-sm font-semibold">
                              {candidate.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${candidate.percentage}%`,
                                backgroundColor: position.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white">Election History</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "president"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-black hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("president")}
          >
            President Elections
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "sis"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-black hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("sis")}
          >
            SIS Elections
          </button>
        </div>

        {/* Election Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Election Cards */}
          <div className="space-y-1">
            {Object.entries(electionData[activeTab])
              .sort(([yearA], [yearB]) => yearB - yearA)
              .map(([year, election]) => (
                <div key={year} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white -ml-2 top-6"></div>
                  {renderElectionCard(election, parseInt(year))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreElecResult;
