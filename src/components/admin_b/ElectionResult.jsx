//---------------------------____---2025/11/15---___---Add the New feature For the Election Result page(Generate Report---------------------------------------------

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ElectionResult = () => {
  const navigate = useNavigate();

  // Candidate vote data from backend
  const [candidates, setCandidates] = useState([]);
  // Valid vote total
  const [totalVotes, setTotalVotes] = useState(0);
  // invalid Vote count
  const [rejectedCount, setRejectedCount] = useState(0);

  // Election timing info from backend
  const [electionInfo, setElectionInfo] = useState(null); // full data object from /api/election-status
  const [loadingElectionInfo, setLoadingElectionInfo] = useState(true);

  // Countdown strings
  const [electionCountdown, setElectionCountdown] = useState(""); // top-right
  const [reportCountdown, setReportCountdown] = useState(""); // under pie chart

  // Report window state
  const [isReportWindowOpen, setIsReportWindowOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // refs to intervals so we can clear on unmount
  const pollIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const votesIntervalRef = useRef(null);

  // Color palette for up to 20 unique candidates (kept same)
  const colorPalette = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
    "#22D3EE",
    "#6366F1",
    "#EAB308",
    "#14B8A6",
    "#F43F5E",
    "#A855F7",
    "#0EA5E9",
    "#84CC16",
    "#D946EF",
    "#FB7185",
    "#FACC15",
    "#F472B6",
    "#6EE7B7",
  ];

  // ---------------------------
  // Fetch votes & rejected votes
  // ---------------------------
  const fetchVotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-votes");
      const data = res.data || [];
      const total = data.reduce((sum, c) => sum + (c.votes || 0), 0);
      setCandidates(data);
      setTotalVotes(total);
    } catch (err) {
      console.error("❌ Error fetching vote results:", err);
    }
  };

  const fetchRejectedVotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/rejected-vote-counts?electionId=2025_president"
      );
      if (res.data && typeof res.data.totalRejected === "number") {
        setRejectedCount(res.data.totalRejected);
      } else {
        // if backend returns something else, attempt to handle gracefully
        if (res.data && typeof res.data === "number") {
          setRejectedCount(res.data);
        } else {
          console.warn("⚠️ Unexpected rejected votes response:", res.data);
        }
      }
    } catch (err) {
      console.error("❌ Failed to fetch rejected votes:", err.message);
    }
  };

  // ---------------------------
  // Fetch election status info
  // ---------------------------
  const fetchElectionInfo = async () => {
    try {
      setLoadingElectionInfo(true);
      const res = await axios.get("http://localhost:8000/api/election-status");
      // Expecting the backend shape where res.data.data is the object you provided
      const info = res.data?.data ?? null;
      setElectionInfo(info);
    } catch (err) {
      console.error("❌ Error fetching election status:", err);
      setElectionInfo(null);
    } finally {
      setLoadingElectionInfo(false);
    }
  };

  // ---------------------------
  // Countdown utilities
  // ---------------------------
  const formatDiff = (ms) => {
    if (ms <= 0) return "0s";
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  // Compute countdowns each second
  useEffect(() => {
    // load initial
    fetchElectionInfo();

    // set periodic refresh of election info (30s) and also keep local countdown tick
    pollIntervalRef.current = setInterval(() => {
      fetchElectionInfo();
    }, 30000); // matches your hook frequency

    // keep votes updating every 5s (existing behaviour)
    fetchVotes();
    fetchRejectedVotes();
    votesIntervalRef.current = setInterval(() => {
      fetchVotes();
      fetchRejectedVotes();
    }, 5000);

    // one-second tick for countdowns
    countdownIntervalRef.current = setInterval(() => {
      setElectionCountdown((prev) => prev); // trigger rerender; we'll compute below based on latest electionInfo
      setReportCountdown((prev) => prev);
    }, 1000);

    return () => {
      clearInterval(pollIntervalRef.current);
      clearInterval(countdownIntervalRef.current);
      clearInterval(votesIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute derived countdowns whenever electionInfo changes or every second (via interval)
  useEffect(() => {
    let reportWindowTimer = null;

    const compute = () => {
      if (!electionInfo) {
        setElectionCountdown("");
        setReportCountdown("");
        setIsReportWindowOpen(false);
        return;
      }

      const now = new Date().getTime();

      // parse times (they come as ISO strings from backend)
      const nominationStart = electionInfo.nominationStartAt
        ? new Date(electionInfo.nominationStartAt).getTime()
        : null;
      const nominationEnd = electionInfo.nominationEndAt
        ? new Date(electionInfo.nominationEndAt).getTime()
        : null;
      const electionStart = electionInfo.electionStartAt
        ? new Date(electionInfo.electionStartAt).getTime()
        : null;
      const electionEnd = electionInfo.electionEndAt
        ? new Date(electionInfo.electionEndAt).getTime()
        : null;

      // 1) Election duration countdown (top-right)
      // If election is running, show time until electionEnd
      // If election scheduled (now < start), show time until electionStart (helpful)
      // If completed, show "Ended"
      if (
        electionStart &&
        electionEnd &&
        now >= electionStart &&
        now <= electionEnd
      ) {
        const diff = electionEnd - now;
        setElectionCountdown(`Ends in ${formatDiff(diff)}`);
      } else if (electionStart && now < electionStart) {
        const diff = electionStart - now;
        setElectionCountdown(`Starts in ${formatDiff(diff)}`);
      } else if (electionEnd && now > electionEnd) {
        setElectionCountdown("Election ended");
      } else {
        setElectionCountdown("");
      }

      // 2) Report window logic (Option B: no delay) — report window opens immediately after electionEnd
      if (electionEnd) {
        const reportWindowStart = electionEnd;
        // const reportWindowEnd = electionEnd + 15 * 60 * 1000; // +15 minutes
        const reportWindowEnd = electionEnd + 2 * 60 * 1000; // for DEV purpose the Production is 15mins.

        if (now >= reportWindowStart && now <= reportWindowEnd) {
          const diff = reportWindowEnd - now;
          setReportCountdown(formatDiff(diff));
          setIsReportWindowOpen(true);
        } else if (now < reportWindowStart) {
          // before election end, show placeholder or nothing
          setReportCountdown("");
          setIsReportWindowOpen(false);
        } else {
          // now > reportWindowEnd -> report window closed, auto redirect
          setReportCountdown("");
          setIsReportWindowOpen(false);
          // auto-redirect once report window finishes (only if this page is still open)
          // Use small delay to avoid redirecting immediately many times
          if (typeof window !== "undefined") {
            // redirect only once: schedule microtask so current render finishes
            clearTimeout(reportWindowTimer);
            reportWindowTimer = setTimeout(() => {
              navigate("/dashboard_B");
            }, 300);
          }
        }
      } else {
        setReportCountdown("");
        setIsReportWindowOpen(false);
      }
    };

    // run compute immediately and also every second
    compute();
    const tick = setInterval(compute, 1000);

    return () => {
      clearInterval(tick);
      clearTimeout(reportWindowTimer);
    };
  }, [electionInfo, navigate]);

  // ---------------------------
  // Generate Report action
  // ---------------------------
  const handleGenerateReport = async () => {
    // If report window closed or electionInfo missing, redirect
    if (!electionInfo || !electionInfo.electionEndAt) {
      navigate("/dashboard_B");
      return;
    }
    // check window boundaries again before generation
    const now = Date.now();
    const electionEnd = new Date(electionInfo.electionEndAt).getTime();
    const windowStart = electionEnd;
    // const windowEnd = electionEnd + 15 * 60 * 1000;
    const windowEnd = electionEnd + 2 * 60 * 1000; // for Put this Devpurpose only.

    if (!(now >= windowStart && now <= windowEnd)) {
      // out of allowed window
      navigate("/dashboard_B");
      return;
    }

    try {
      setIsGenerating(true);
      // fetch the PDF as blob and force download
      const res = await fetch("http://localhost:8000/api/generate-report", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to generate report, status:", res.status);
        // redirect anyway (per requirement: if clicked and not allowed, redirect)
        navigate("/dashboard_B");
        return;
      }

      const blob = await res.blob();
      const filename =
        res.headers.get("content-disposition")?.split("filename=")?.[1] ||
        `Election_Report_${Date.now()}.pdf`;

      // create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // remove quotes if present
      a.download = filename.replace(/["']/g, "");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // After successful download redirect to admin_B
      navigate("/dashboard_B");
    } catch (err) {
      console.error("Error generating report:", err);
      // Safety redirect
      navigate("/dashboard_B");
    } finally {
      setIsGenerating(false);
    }
  };

  // ---------------------------
  // Chart data (from your original code)
  // ---------------------------
  const barData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.votes),
        backgroundColor: candidates.map(
          (_, i) => colorPalette[i % colorPalette.length]
        ),
      },
    ],
  };

  const pieData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [
      {
        data: candidates.map((c) => c.votes),
        backgroundColor: candidates.map(
          (_, i) => colorPalette[i % colorPalette.length]
        ),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Render (keeps your existing layout; adds countdowns + button)
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              President Election Results
            </h1>
            <p className="text-orange-300 mb-8 text-3xl">
              Successfuly Cated Votes - {totalVotes}
            </p>
            {/* Rejected Votes Count */}
            <p className="text-red-600 font-semibold mb-6 text-2xl">
              Rejected Votes: {rejectedCount}
            </p>
          </div>

          {/* Top-right election countdown indicator */}
          <div className="text-right">
            <div className="bg-white/10 text-white px-4 py-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-200">Election Timer</div>
              <div className="text-xl font-bold">
                {loadingElectionInfo ? "Loading..." : electionCountdown || "—"}
              </div>
              {electionInfo?.electionStartAt && (
                <div className="text-xs text-gray-300 mt-1">
                  {electionInfo.electionStartAt &&
                    `Start: ${new Date(
                      electionInfo.electionStartAt
                    ).toLocaleString()}`}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="flex items-center text-white hover:text-blue-200 mb-4 mt-6"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </button>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Vote Distribution
          </h2>
          <div className="h-96">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                    grid: { drawBorder: false },
                  },
                  x: { grid: { display: false } },
                },
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {candidates.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
            >
              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={c.image || "https://via.placeholder.com/150"}
                    alt={c.name}
                    className="w-24 h-24 rounded-full object-cover border-4 mb-3"
                    style={{
                      borderColor: colorPalette[idx % colorPalette.length],
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <h3 className="font-bold text-gray-800 text-center">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    Number - {c.number}
                  </p>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Votes:</span>
                    <span className="font-semibold">
                      {c.votes} (
                      {totalVotes > 0
                        ? ((c.votes / totalVotes) * 100).toFixed(1)
                        : 0}
                      %)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${
                          totalVotes > 0 ? (c.votes / totalVotes) * 100 : 0
                        }%`,
                        backgroundColor:
                          colorPalette[idx % colorPalette.length],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Vote Percentage
          </h2>
          <div className="h-96">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "right" },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const percentage = totalVotes
                          ? ((value / totalVotes) * 100).toFixed(1)
                          : 0;
                        return `${label}: ${value} votes (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>

          {/* Report countdown & Generate button (under pie chart) */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-left">
              <div className="text-sm text-gray-600">Report availability</div>
              <div className="text-lg font-semibold text-gray-800">
                {isReportWindowOpen
                  ? `Report window ends in: ${reportCountdown}`
                  : electionInfo?.electionEndAt
                  ? `Report window closed or not started`
                  : "No election info"}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateReport}
                disabled={!isReportWindowOpen || isGenerating}
                className={`px-6 py-3 rounded-lg text-white font-semibold ${
                  isReportWindowOpen
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isGenerating ? "Generating..." : "Generate Report"}
              </button>

              <button
                onClick={() => navigate("/dashboard_B")}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResult;
