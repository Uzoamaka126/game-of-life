import React, { useState, useEffect } from "react";
import "./App.css";
import { GridTwo } from "./components/GridTwo";
import { produce } from "immer";
// import { Grid } from "./components/Grid";

// const rows = 30;
const numOfRows = 30;
const numOfColumns = 50;
// const columns = 50;
const speed = 100;

function App() {
  // const [grid, setGrid] = useState(
  //   Array(rows)
  //     .fill()
  //     .map(() => Array(columns).fill(false))
  // );
  let intervalId;
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      // push an array of columns
      rows.push(Array.from(Array(numOfColumns), () => 0));
    }
    return rows;
  });
  const [generation, setGeneration] = useState(0);

  function selectBox(row, col) {
    let newGrid = produce(grid, (gridCopy) => {
      gridCopy[row][col] = gridCopy[row][col] ? 0 : 1;
    });
    setGrid(newGrid);
  }

  function seed() {
    let gridCopy = arrayClone(grid);
    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfColumns; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setGrid(gridCopy);
  }

  function playButton() {
    console.log(intervalId, generation)
    clearInterval(intervalId);
    intervalId = setInterval(play, speed);
    console.log(intervalId, generation)
  }

  function play() {
    let g = grid;
    let gridClone = arrayClone(grid);

    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfColumns; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < numOfColumns - 1) if (g[i - 1][(j + 1)]) count++;
        if (j < numOfColumns - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < numOfRows - 1) if (g[i + 1][j]) count++;
        if (i < numOfRows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < numOfRows - 1 && numOfColumns - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) gridClone[i][j] = false;
        if (!g[i][j] && count === 3) gridClone[i][j] = true;
      }
    }
    setGrid(gridClone);
    setGeneration(generation + 1);
  }

  useEffect(() => {
    seed();
    playButton();
  }, []);

  return (
    <GridTwo
      grid={grid}
      rows={numOfRows}
      columns={numOfColumns}
      selectBox={selectBox}
      generation={generation}
    />
    // <Grid />
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
