import React, { useState, useEffect } from "react";
import { StartButton, PauseButton, StopButton } from "./ActionButtons";

export function GridTwo({ grid, rows, columns, selectBox, generation }) {
 
  function selectBoxCell(row, col) {
    selectBox(row, col)
  }
  return (
    <>
      <div>
        <h4 className="text-center">Generation : {generation}</h4>
      </div>
      <div className="grid" style={{ width: columns * 10 }}>
        {grid.map(
          (rows, i) =>
            rows.map((col, j) => (
              <div
                className={grid[i][j] ? "box on" : "box off"}
                key={`${i}-${j}`}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][j] ? "black" : "white",
                  border: "1px solid #ddd",
                }}
                onClick={() => selectBoxCell(i, j)}
              />
            ))
          //   )
        )}
          </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          marginTop: "15px",
        }}
      >
        <StartButton />
        <PauseButton />
        <StopButton />
      </div>
    </>
  );
}
