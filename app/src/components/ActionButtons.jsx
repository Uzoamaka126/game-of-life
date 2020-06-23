import React from "react";

export function StartButton(props) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff"
      }}
    >
      Start
    </button>
  );
}

export function PauseButton(props) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff"
      }}
    >
      Pause
    </button>
  );
}

export function StopButton(props) {
  return (
    <button
      style={{
        borderRadius: "10px",
        border: "1px solid #c4c4c4",
        padding: "14px 16px",
        fontSize: "1rem",
        color: "#333",
        background: "#fff"
      }}
    >
      Stop
    </button>
  );
}
