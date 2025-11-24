//____create the Compatible with report generate time window part________
//________________2025/11/12________________
// Custom React Hook: Determines the current election phase
// Extended: Adds report-window and result-lock logic
// - Uses electionEndAt from backend
// - Uses per-election localStorage flag 'reportGenerated_<electionId>'
// - Dev window: 2 minutes (uncomment 15*60*1000 for production)

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/election-status";

export const useElectionStatus = () => {
  // Basic status: "idle" | "nomination" | "running" | "completed"
  const [status, setStatus] = useState("idle");

  // Button control booleans based on time windows
  const [isNominationPeriod, setIsNominationPeriod] = useState(false);
  const [isElectionRunning, setIsElectionRunning] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

  // New: report window state (true while report window active)
  const [isReportWindowActive, setIsReportWindowActive] = useState(false);

  // New: result locked -> final state: no more access allowed
  const [isResultLocked, setIsResultLocked] = useState(false);

  // Loading + error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to read per-election localStorage flag
  const getReportGeneratedFlag = (electionId) => {
    if (!electionId) return false;
    try {
      return localStorage.getItem(`reportGenerated_${electionId}`) === "true";
    } catch (e) {
      // localStorage might be unavailable in some contexts
      return false;
    }
  };

  // Main function: Fetch election status from backend and compute windows
  const fetchStatus = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data?.data;

      // No election info -> idle
      if (!data) {
        setStatus("idle");
        setIsNominationPeriod(false);
        setIsElectionRunning(false);
        setIsIdle(true);
        setIsReportWindowActive(false);
        setIsResultLocked(false);
        setError(null);
        setLoading(false);
        return;
      }

      const now = Date.now();

      // Parse times from backend
      const nominationStart = data.nominationStartAt ? new Date(data.nominationStartAt).getTime() : null;
      const nominationEnd = data.nominationEndAt ? new Date(data.nominationEndAt).getTime() : null;
      const electionStart = data.electionStartAt ? new Date(data.electionStartAt).getTime() : null;
      const electionEnd = data.electionEndAt ? new Date(data.electionEndAt).getTime() : null;

      // Determine current status based on times
      let currentStatus = "idle";
      if (nominationStart && nominationEnd && now >= nominationStart && now <= nominationEnd) {
        currentStatus = "nomination";
      } else if (electionStart && electionEnd && now >= electionStart && now <= electionEnd) {
        currentStatus = "running";
      } else if (electionEnd && now > electionEnd) {
        currentStatus = "completed";
      }

      // Update basic flags
      setStatus(currentStatus);
      setIsNominationPeriod(currentStatus === "nomination");
      setIsElectionRunning(currentStatus === "running");
      setIsIdle(currentStatus === "idle" || currentStatus === "completed");

      // -----------------------------
      // Report window & lock logic
      // -----------------------------
      // Report window starts at electionEnd and lasts for a configurable duration
      // DEV: 2 minutes window
      const REPORT_WINDOW_MS = 2 * 60 * 1000; // DEV (2 minutes)
      // PRODUCTION (uncomment to use 15 minutes)
      // const REPORT_WINDOW_MS = 15 * 60 * 1000;

      // If we don't have electionEnd, no report window
      if (!electionEnd) {
        setIsReportWindowActive(false);
        setIsResultLocked(false);
      } else {
        const windowStart = electionEnd;
        const windowEnd = electionEnd + REPORT_WINDOW_MS;

        // is the report window currently active?
        const windowActive = now >= windowStart && now <= windowEnd;
        setIsReportWindowActive(windowActive);

        // check if report has been generated for this election (localStorage)
        const reportGenerated = getReportGeneratedFlag(data._id);

        // final locked state:
        // - if report already generated => locked
        // - or if now is after windowEnd => locked
        // Note: If election is still running, never locked (admin can still view)
        let locked = false;
        if (currentStatus === "running") {
          // while running, keep unlocked (admins can view)
          locked = false;
        } else {
          // after election finished, consider reportGenerated or time expiry
          if (reportGenerated) locked = true;
          if (now > windowEnd) locked = true;
        }
        setIsResultLocked(locked);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching election status:", err);
      setError(err);

      // fail-safe: make UI idle and locked (safer)
      setStatus("idle");
      setIsNominationPeriod(false);
      setIsElectionRunning(false);
      setIsIdle(true);
      setIsReportWindowActive(false);
      setIsResultLocked(true);
    } finally {
      setLoading(false);
    }
  };

  // Poll frequently so UI updates fast after time windows change
  useEffect(() => {
    fetchStatus(); // initial call
    const interval = setInterval(fetchStatus, 5000); // check every 5s for quicker updates in UI
    return () => clearInterval(interval);
  }, []);

  // Exported state includes the new computed fields
  return {
    status,
    isNominationPeriod,
    isElectionRunning,
    isIdle,
    isReportWindowActive, // true when electionEnd <= now <= electionEnd + window
    isResultLocked,       // true when report generated or window expired (final locked)
    loading,
    error,
  };
};
