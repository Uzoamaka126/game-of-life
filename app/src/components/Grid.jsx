import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";
import { StartButton, PauseButton, StopButton } from "./ActionButtons";

const numOfRows = 30;
const numOfColumns = 30;
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export function Grids() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      // push an array of columns
      rows.push(Array.from(Array(numOfColumns), () => 0));
    }
    return rows;
  });
  const [running, setRunning] = useState(false);
  const runRef = useRef(running);
  runRef.current = running;

  // Here's the thing, we want our function to run only once
  // so we are going to use a useCallback and have it take an empty dependency
  // as a second parameter
  const startSimulation = useCallback(() => {
    console.log(running, running.current);
    if (!running.current) return;
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < numOfColumns; j++) {
            //   compute the neighbours
            let neighbours = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // check to see that we don't go out of bounds
              if (
                newI >= 0 &&
                newI <= numOfRows &&
                newJ >= 0 &&
                newJ < numOfColumns
              ) {
                neighbours += g[newI][newJ];
              }
            });
            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(startSimulation, 1000);
  }, []);

  return (
    <div
      style={{
        maxWidth: "70%",
        margin: "auto",
        padding: "30px 15px",
      }}
    >
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          marginTop: "15px",
        }}
      >
        <StartButton
          runRef={runRef}
          setRunning={setRunning}
          startSimulation={startSimulation}
        />
        <PauseButton runRef={runRef} setRunning={setRunning} />
        <StopButton runRef={runRef} setRunning={setRunning} />
      </div>
    </div>
  );
}
