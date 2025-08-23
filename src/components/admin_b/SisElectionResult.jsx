//

//3###################
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  sis_President01,
  sis_President_02,
  sis_Secretary01,
  sis_Secretary02,
  sis_Treasurer01,
  sis_Treasurer02,
  sis_Vice_president01,
  sis_Vice_President02,
} from "../../assets";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const SisElectionResult = () => {
  // Sample data for 8 candidates across 4 positions
  const navigate = useNavigate();
  const positions = [
    {
      title: "SIS President",
      color: "#3B82F6",
      candidates: [
        {
          id: 1,
          name: "Hiruni Vimanya",
          image: sis_President01,
          votes: 320,
        },
        {
          id: 2,
          name: "Kassapa Jayasooriya",
          image: sis_President_02,
          votes: 280,
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
          image: sis_Vice_president01,
          votes: 290,
        },
        {
          id: 4,
          name: "Garuka Mannapperuma",
          image: sis_Vice_President02,
          votes: 310,
        },
      ],
    },
    {
      title: "SIS Secretary",
      color: "#F59E0B",
      candidates: [
        {
          id: 5,
          name: "Ovilu Rupasinha",
          image: sis_Secretary01,
          votes: 260,
        },
        {
          id: 6,
          name: "Dasmika Kodithuwakku",
          image: sis_Secretary02,
          votes: 240,
        },
      ],
    },
    {
      title: "SIS Treasurer",
      color: "#EF4444",
      candidates: [
        {
          id: 7,
          name: "Avidu Bandara",
          image: sis_Treasurer01,
          votes: 330,
        },
        {
          id: 8,
          name: "Wimadu Ganthotage",
          image: sis_Treasurer02,
          votes: 270,
        },
      ],
    },
  ];

  const totalVotes = 2000; // Total across all positions

  // Flatten candidates for charts
  const allCandidates = positions.flatMap((pos) =>
    pos.candidates.map((c) => ({
      ...c,
      position: pos.title,
      color: pos.color,
      positionShort: pos.title.split(" ")[1], // Extract "President", "Vice", etc.
    }))
  );

  // Bar chart data - fixed version
  const barData = {
    labels: allCandidates.map(
      (c) => `${c.name.split(" ")[0]}\n(${c.positionShort})`
    ),
    datasets: [
      {
        label: "Votes",
        data: allCandidates.map((c) => c.votes),
        backgroundColor: allCandidates.map((c) => c.color),
        borderColor: allCandidates.map((c) => c.color),
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data by position
  const pieData = {
    labels: positions.map((pos) => pos.title),
    datasets: [
      {
        data: positions.map((pos) =>
          pos.candidates.reduce((sum, c) => sum + c.votes, 0)
        ),
        backgroundColor: positions.map((pos) => pos.color),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <button
            className="flex items-center text-white hover:text-blue-200 mr-4"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
          <div className="text-center mx-auto">
            <h1 className="text-3xl font-bold text-white">SIS Election 2025</h1>
            <p className="text-blue-200 font-medium">
              Student Interactive Society
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {positions.map((pos) => (
            <div
              key={pos.title}
              className="bg-white rounded-xl shadow-sm p-4 border-l-4"
              style={{ borderColor: pos.color }}
            >
              <h3 className="font-semibold text-gray-700">{pos.title}</h3>
              <p className="text-2xl font-bold" style={{ color: pos.color }}>
                {pos.candidates.reduce((sum, c) => sum + c.votes, 0)} votes
              </p>
              <p className="text-sm text-gray-500">
                {pos.candidates.length} candidates
              </p>
            </div>
          ))}
        </div>

        {/* Bar Chart Section - Fixed */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Votes by Candidate
          </h2>
          <div className="h-[400px]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: Math.max(...allCandidates.map((c) => c.votes)) * 1.2, // 20% padding
                    ticks: {
                      stepSize: 100,
                    },
                    grid: {
                      drawBorder: false,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      autoSkip: false,
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.raw} votes`,
                      title: (context) =>
                        allCandidates[context[0].dataIndex].name,
                    },
                  },
                },
                barPercentage: 0.8,
                categoryPercentage: 0.9,
              }}
            />
          </div>
        </div>

        {/* Candidate Cards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Candidates by Position
          </h2>
          <div className="space-y-8">
            {positions.map((position) => (
              <div key={position.title}>
                <div className="flex items-center mb-4">
                  <div
                    className="w-3 h-8 rounded-full mr-3"
                    style={{ backgroundColor: position.color }}
                  />
                  <h3 className="text-lg font-bold text-gray-800">
                    {position.title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {position.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="p-5">
                        <div className="flex items-start">
                          <img
                            src={candidate.image}
                            alt={candidate.name}
                            className="w-16 h-16 rounded-full object-cover border-4 mr-4"
                            style={{ borderColor: position.color }}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                candidate.name
                              )}&background=random`;
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800">
                              {candidate.name}
                            </h3>
                            {candidate.slogan && (
                              <p className="text-sm text-gray-500 mb-2 italic">
                                "{candidate.slogan}"
                              </p>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Votes:</span>
                              <span className="font-semibold">
                                {candidate.votes} (
                                {((candidate.votes / totalVotes) * 100).toFixed(
                                  1
                                )}
                                % )
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (candidate.votes / totalVotes) * 100
                                  }%`,
                                  backgroundColor: position.color,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Votes by Position
          </h2>
          <div className="h-[400px]">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const value = context.raw;
                        const percentage = ((value / totalVotes) * 100).toFixed(
                          1
                        );
                        return `${context.label}: ${value} votes (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SisElectionResult;
