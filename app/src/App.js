import React, { useState, useEffect } from "react";
import "./App.css";
import { GridTwo } from "./components/GridTwo";
import { produce } from "immer";
// import { Grid } from "./components/Grid";

function App() {
  // const [grid, setGrid] = useState(
  //   Array(rows)
  //     .fill()
  //     .map(() => Array(columns).fill(false))
  // );
  const numOfRows = 30;
  const numOfColumns = 50;
  let speed = 100;
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

  // Whatever Your Plan Is - Josie Buchanan | Moment
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
    clearInterval(intervalId);
    intervalId = setInterval(play, speed);
  }

  function play() {
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < numOfColumns; j++) {
            let count = 0;
            if (i > 0) if (g[i - 1][j]) count++;
            if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
            if (i > 0 && j < numOfColumns - 1) if (g[i - 1][j + 1]) count++;
            if (j < numOfColumns - 1) if (g[i][j + 1]) count++;
            if (j > 0) if (g[i][j - 1]) count++;
            if (i < numOfRows - 1) if (g[i + 1][j]) count++;
            if (i < numOfRows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
            if (i < numOfRows - 1 && j < numOfColumns - 1) {
              if (g[i + 1][j + 1]) count++;
            }
            if (g[i][j] && (count < 2 || count > 3)) gridCopy[i][j] = 0;
            if (!g[i][j] && count === 3) gridCopy[i][j] = 1;
          }
        }
      })
    })
    setGeneration(generation + 1);
  }

  function pauseButton() {
    clearInterval(intervalId);
  }

  function slow() {
    speed = 1000;
    playButton();
  }

  function fast() {
    speed = 100;
    playButton();
  }

  function clear() {
    var newGrid = () => {
      const rows = [];
      for (let i = 0; i < numOfRows; i++) {
        rows.push(Array.from(Array(numOfColumns), () => 0));
      }
      return rows;
    };
    setGrid(newGrid);
    setGeneration(0)
  }
  useEffect(() => {
    seed();
    // playButton();
  }, []);

  return (
    <div className="wrapper">
      <div className="heading">
        <h3>Conway's Game of Life</h3>
      </div>
      <div className="d-flex">
        <div className="game-container">
          <div className="grid-container">
            <GridTwo
              grid={grid}
              rows={numOfRows}
              columns={numOfColumns}
              selectBox={selectBox}
              generation={generation}
              playButton={playButton}
              pauseButton={pauseButton}
              slow={slow}
              fast={fast}
              clear={clear}
            />
          </div>
        </div>
        <div className="rules-container">
          <h3 className="sub-heading">Rules:</h3>
          <p className="text-white">
            The Game of Life is a zero-player game that is played by creating an initial
            configuration and observing how it evolves.
          </p>
          <ul>
            <li className="text-white">Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
            <li className="text-white">Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li className="text-white">Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li className="text-white">Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
