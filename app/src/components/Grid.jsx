import React, { useState } from "react";
import { produce } from "immer";
import { StartButton, PauseButton, StopButton } from "./ActionButtons";

const numOfRows = 30;
const numOfColumns = 30;

export function Grids() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      // push an array of columns
      rows.push(Array.from(Array(numOfColumns), () => 0));
    }
    return rows;
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numOfColumns}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : "white",
                border: "1px solid #ddd",
              }}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </div>
          <div style={{
              display: "flex",
              justifyContent: "space-between"
          }}>
        <StartButton />
        <PauseButton />
        <StopButton />
      </div>
    </>
  );
}
