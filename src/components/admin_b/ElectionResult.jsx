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
// Import the hook to read isReportWindowActive/isResultLocked
import { useElectionStatus } from "../../hooks/useElectionStatus";

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
  const [totalVotes, setTotalVotes] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  // Election timing info
  const [electionInfo, setElectionInfo] = useState(null);
  const [loadingElectionInfo, setLoadingElectionInfo] = useState(true);

  // Countdown strings
  const [electionCountdown, setElectionCountdown] = useState("");
  const [reportCountdown, setReportCountdown] = useState("");

  // Report window state
  const [isReportWindowOpen, setIsReportWindowOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // refs to intervals so we can clear on unmount
  const pollIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const votesIntervalRef = useRef(null);

  // Color palette
  const colorPalette = [
    "#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899",
    "#F97316","#22D3EE","#6366F1","#EAB308","#14B8A6","#F43F5E",
    "#A855F7","#0EA5E9","#84CC16","#D946EF","#FB7185","#FACC15",
    "#F472B6","#6EE7B7"
  ];


  // Hook: read global computed states (report window + lock)

  const {
    isReportWindowActive, // true while we are in the short report window
    isResultLocked,       // true if report generated or window expired -> final locked
  } = useElectionStatus();


  // Fetch votes & rejected votes
  
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
      }
    } catch (err) {
      console.error("❌ Failed to fetch rejected votes:", err.message);
    }
  };


  // Fetch election status info (used locally to show timers & IDs)

  const fetchElectionInfo = async () => {
    try {
      setLoadingElectionInfo(true);
      const res = await axios.get("http://localhost:8000/api/election-status");
      const info = res.data?.data ?? null;
      setElectionInfo(info);
    } catch (err) {
      console.error("❌ Error fetching election status:", err);
      setElectionInfo(null);
    } finally {
      setLoadingElectionInfo(false);
    }
  };


  // Countdown utilities

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


  // POOLING Initial setup
 
  useEffect(() => {
    fetchElectionInfo();
    fetchVotes();
    fetchRejectedVotes();

    pollIntervalRef.current = setInterval(fetchElectionInfo, 30000);
    votesIntervalRef.current = setInterval(() => {
      fetchVotes();
      fetchRejectedVotes();
    }, 5000);
    countdownIntervalRef.current = setInterval(() => {
      setElectionCountdown((prev) => prev);
      setReportCountdown((prev) => prev);
    }, 1000);

    return () => {
      clearInterval(pollIntervalRef.current);
      clearInterval(countdownIntervalRef.current);
      clearInterval(votesIntervalRef.current);
    };
  }, []);


  // Compute countdowns and window expiration handling
 
  useEffect(() => {
    let reportTimer = null;

    const computeCountdowns = () => {
      if (!electionInfo) {
        setElectionCountdown("");
        setReportCountdown("");
        setIsReportWindowOpen(false);
        return;
      }

      const now = Date.now();
      const electionStart = electionInfo.electionStartAt
        ? new Date(electionInfo.electionStartAt).getTime()
        : null;
      const electionEnd = electionInfo.electionEndAt
        ? new Date(electionInfo.electionEndAt).getTime()
        : null;

      // Top-right election timer
      if (electionStart && electionEnd && now >= electionStart && now <= electionEnd) {
        setElectionCountdown(`Ends in ${formatDiff(electionEnd - now)}`);
      } else if (electionStart && now < electionStart) {
        setElectionCountdown(`Starts in ${formatDiff(electionStart - now)}`);
      } else if (electionEnd && now > electionEnd) {
        setElectionCountdown("Election ended");
      } else setElectionCountdown("");

      // Report window timer
      if (electionEnd) {
        const reportWindowStart = electionEnd;
        const reportWindowEnd = electionEnd + 2 * 60 * 1000; // Dev 2 mins
        // Production (uncomment for 15 minutes)
        // const reportWindowEnd = electionEnd + 15 * 60 * 1000;

        if (now >= reportWindowStart && now <= reportWindowEnd) {
          setReportCountdown(formatDiff(reportWindowEnd - now));
          setIsReportWindowOpen(true);
        } else {
          setReportCountdown("");
          setIsReportWindowOpen(false);

          // Auto-clear Redis & redirect if window expired
          if (now > reportWindowEnd) {
            // Mark reportGenerated flag in localStorage (so hook and sidebar know)
            try {
              if (electionInfo && electionInfo._id) {
                localStorage.setItem(`reportGenerated_${electionInfo._id}`, "true");
              }
            } catch (e) {
              // ignore localStorage errors
            }

            clearTimeout(reportTimer);
            reportTimer = setTimeout(async () => {
              try {
                await axios.delete("http://localhost:8000/api/election/clear");
              } catch (err) {
                console.error("❌ Failed to clear Redis:", err);
              } finally {
                navigate("/dashboard_B");
              }
            }, 300);
          }
        }
      }
    };

    computeCountdowns();
    const tick = setInterval(computeCountdowns, 1000);

    return () => {
      clearInterval(tick);
      clearTimeout(reportTimer);
    };
  }, [electionInfo, navigate]);

  // If the hook indicates final lock (maybe set by hook reading localStorage),
  // redirect user out immediately (prevents access after manual generation or expiry)
  useEffect(() => {
    if (isResultLocked) {
      // small delay to allow UI to settle then redirect
      setTimeout(() => navigate("/dashboard_B"), 200);
    }
  }, [isResultLocked, navigate]);


  // Generate Report + Clear Redis immediately

  const handleGenerateReport = async () => {
    if (!electionInfo || !electionInfo.electionEndAt) {
      navigate("/dashboard_B");
      return;
    }

    const now = Date.now();
    const electionEnd = new Date(electionInfo.electionEndAt).getTime();
    const windowEnd = electionEnd + 2 * 60 * 1000; // Dev 2 mins

    // Only allow generation inside the report window
    if (!(now >= electionEnd && now <= windowEnd)) {
      navigate("/dashboard_B");
      return;
    }

    try {
      setIsGenerating(true);

      // Fetch PDF (your existing implementation used fetch)
      const res = await fetch("http://localhost:8000/api/generate-report", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to generate report, status:", res.status);
        navigate("/dashboard_B");
        return;
      }

      const blob = await res.blob();
      const filename =
        res.headers.get("content-disposition")?.split("filename=")?.[1] ||
        `Election_Report_${Date.now()}.pdf`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.replace(/["']/g, "");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      //  Mark report generated in localStorage (per-election) so hook/sidebar lock state updates
      try {
        if (electionInfo && electionInfo._id) {
          localStorage.setItem(`reportGenerated_${electionInfo._id}`, "true");
        }
      } catch (e) {
        // ignore localStorage errors
      }

      // Clear Redis immediately (your existing endpoint)
      try {
        await axios.delete("http://localhost:8000/api/election/clear");
      } catch (err) {
        console.error("❌ Failed to clear Redis after report:", err);
      }

      //  Redirect to dashboard_B (this also prevents re-access)
      navigate("/dashboard_B");
    } catch (err) {
      console.error("Error generating report:", err);
      navigate("/dashboard_B");
    } finally {
      setIsGenerating(false);
    }
  };

  
  // Chart data

  const barData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [{
      label: "Votes",
      data: candidates.map((c) => c.votes),
      backgroundColor: candidates.map((_, i) => colorPalette[i % colorPalette.length])
    }]
  };

  const pieData = {
    labels: candidates.map((c) => `${c.name} (#${c.number})`),
    datasets: [{
      data: candidates.map((c) => c.votes),
      backgroundColor: candidates.map((_, i) => colorPalette[i % colorPalette.length]),
      borderColor: "#fff",
      borderWidth: 2
    }]
  };

  // ---------------------------
  // Render (unchanged layout)
  // ---------------------------
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
            <p className="text-red-600 font-semibold mb-6 text-2xl">
              Rejected Votes: {rejectedCount}
            </p>
          </div>

          <div className="text-right">
            <div className="bg-white/10 text-white px-4 py-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-200">Election Timer</div>
              <div className="text-xl font-bold">
                {loadingElectionInfo ? "Loading..." : electionCountdown || "—"}
              </div>
              {electionInfo?.electionStartAt && (
                <div className="text-xs text-gray-300 mt-1">
                  {`Start: ${new Date(electionInfo.electionStartAt).toLocaleString()}`}
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
            <Bar data={barData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { drawBorder: false } },
                x: { grid: { display: false } }
              },
              plugins: { legend: { display: false } }
            }} />
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {candidates.map((c, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105">
              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={c.image || "https://via.placeholder.com/150"}
                    alt={c.name}
                    className="w-24 h-24 rounded-full object-cover border-4 mb-3"
                    style={{ borderColor: colorPalette[idx % colorPalette.length] }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                  <h3 className="font-bold text-gray-800 text-center">{c.name}</h3>
                  <p className="text-sm text-gray-600 font-semibold">Number - {c.number}</p>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Votes:</span>
                    <span className="font-semibold">
                      {c.votes} ({totalVotes ? ((c.votes / totalVotes) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${totalVotes ? (c.votes / totalVotes) * 100 : 0}%`,
                        backgroundColor: colorPalette[idx % colorPalette.length],
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Vote Percentage</h2>
          <div className="h-96">
            <Pie data={pieData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right" },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      const percentage = totalVotes ? ((value / totalVotes) * 100).toFixed(1) : 0;
                      return `${label}: ${value} votes (${percentage}%)`;
                    }
                  }
                }
              }
            }} />
          </div>

          {/* Report countdown & Generate button */}
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
