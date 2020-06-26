import React from "react";

function CustomButton({ onClick, label, disabled }) {
  return (
    <button
      style={{
        outline: "none",
        borderRadius: "5px",
        border: "none",
        padding: "10px",
        fontSize: "0.875rem",
        color: "#333",
        background: "#fff",
        cursor: disabled ? "no-drop" : "pointer",
        marginRight: "10px",
        width: "fit-content",
        marginTop: "10px"
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
export function StartButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Start" />
  );
}

export function SlowButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Slow" />
  );
}

export function RandomButton({ onClick, running }) {
  console.log(running)
  return (
    <CustomButton onClick={onClick} label="Random" disabled={running} />
  );
}

export function SeedButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Seed" />
  );
}
export function FastButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Fast" />
  );
}
export function PauseButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Pause" />
  );
}

export function ClearButton({ onClick }) {
  return (
    <CustomButton onClick={onClick} label="Clear" />
  );
}