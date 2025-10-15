import React, { createContext, useState, useEffect } from "react";

export const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  // Load initial attendance from localStorage
  const [attendanceList, setAttendanceList] = useState(() => {
    return JSON.parse(localStorage.getItem("attendance")) || [];
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle marking attendance
  const handleMarkAttendance = (user) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });

    // Determine session
    const hours = now.getHours();
    let session = null;
    if (hours >= 10 && hours < 11) session = "Morning";
    else if (hours >= 15 && hours < 16) session = "Evening";

    if (!session) {
      setErrorMsg(
        "❌ Attendance can only be marked from 10-11 AM (Morning) or 3-4 PM (Evening)."
      );
      setSuccessMsg("");
      return;
    }

    // Check duplicate
    const alreadyMarked = attendanceList.some(
      (record) =>
        record.email === user.email &&
        record.date === date &&
        record.session === session
    );

    if (alreadyMarked) {
      setErrorMsg(`⚠️ You already marked your ${session} attendance today.`);
      setSuccessMsg("");
      return;
    }

    const record = {
      ...user,
      session,
      date,
      day,
      time,
      status: "Present",
    };

    const updatedList = [...attendanceList, record];
    setAttendanceList(updatedList);
    localStorage.setItem("attendance", JSON.stringify(updatedList));

    setSuccessMsg(
      `✅ ${session} Attendance marked successfully for ${user.name} on ${day}, ${date} at ${time}.`
    );
    setErrorMsg("");
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceList,
        handleMarkAttendance,
        successMsg,
        errorMsg,
        setSuccessMsg,
        setErrorMsg,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
