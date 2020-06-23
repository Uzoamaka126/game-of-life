import React from "react";

export function StartButton({ startSimulation, setRunning, runRef }) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff",
        cursor: "pointer",
      }}
      onClick={() => {
        setRunning(true);
        runRef.current = true;
        startSimulation();
      }}
    >
      Start
    </button>
  );
}

export function PauseButton({ setRunning, runRef }) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff",
        cursor: "pointer",
      }}
      onClick={() => {
        runRef.current = false;
        setRunning(false);
      }}
    >
      Pause
    </button>
  );
}

export function StopButton({ setRunning, runRef }) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff",
        cursor: "pointer",
      }}
      onClick={() => {
        runRef.current = false;
        setRunning(false);
      }}
    >
      Stop
    </button>
  );
}
