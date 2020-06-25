import React, { useState, useEffect } from "react";
import { GridTwo } from "./GridTwo";
import { produce } from "immer";
import { Link } from "react-router-dom";
import {
  StartButton,
  SlowButton,
  PauseButton,
  ClearButton,
  FastButton,
  SeedButton,
} from "./ActionButtons";

export function Home() {
  var numOfRows = 30;
  var numOfColumns = 50;
  var speed = 100;
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
      });
    });
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
    setGeneration(0);
  }

  function gridSize(size) {
    switch (size) {
      case "1":
        numOfColumns = 20;
        numOfRows = 10;
        console.log(size);
        break;
      case "2":
        numOfColumns = 60;
        numOfRows = 40;
        console.log(size);
        break;
      case "3":
        numOfColumns = 70;
        numOfRows = 50;
        console.log(size);
        break;
      default:
        numOfColumns = 30;
        numOfRows = 50;
        console.log(size);
    }
    clear();
  }

  useEffect(() => {
    seed();
    // playButton();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <nav>
          <h2>Conway's Game of Life'</h2>
          <Link to="/about">About</Link>
        </nav>
        <div className="d-flex">
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              margin: "15px auto",
              border: "1px solid red",
            }}
          >
            <SlowButton onClick={slow} />
            <FastButton onClick={fast} />
            <SeedButton onClick={seed} />
            <StartButton onClick={playButton} />
            <PauseButton onClick={pauseButton} />
            <ClearButton onClick={clear} />
            <div className="dropdown">
              <button className="dropbtn">Choose Grid</button>
              <div className="dropdown-content">
                <button onClick={() => gridSize(1)}>20x10</button>
                <button onClick={() => gridSize(2)}>50x30</button>
                <button onClick={() => gridSize(3)}>70x50</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
