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
  RandomButton,
} from "./ActionButtons";

export function Home() {
  const [generation, setGeneration] = useState(0);
  const [dimension, setDimension] = useState(0);
  const [running, setRunning] = useState(false);
  const [numOfRows, setNumOfRows] = useState(30);
  const [numOfColumns, setNumOfColumns] = useState(50);
  var speed = 100;
  var intervalId;
  function generateEmptyGrid() {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      rows.push(Array.from(Array(numOfColumns), () => 0));
    }
    return rows;
  }

  const [grid, setGrid] = useState(() => {
    // return a function which in turn returns a row array
    return generateEmptyGrid();
  });

// function to make the cells clickable
  function selectBox(row, col) {
    let newGrid = produce(grid, (gridCopy) => {
      gridCopy[row][col] = gridCopy[row][col] ? 0 : 1;
    });
    setGrid(newGrid);
  }

  // handle the seeding of the application
  function handleSeed() {
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

  function handlePlay() {
    setRunning(true);
    console.log(running);
  }

  function play() {
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < numOfColumns; j++) {
            let neighbors = 0;
            if (i > 0) if (g[i - 1][j]) neighbors++;
            if (i > 0 && j > 0) if (g[i - 1][j - 1]) neighbors++;
            if (i > 0 && j < numOfColumns - 1) if (g[i - 1][j + 1]) neighbors++;
            if (j < numOfColumns - 1) if (g[i][j + 1]) neighbors++;
            if (j > 0) if (g[i][j - 1]) neighbors++;
            if (i < numOfRows - 1) if (g[i + 1][j]) neighbors++;
            if (i < numOfRows - 1 && j > 0) if (g[i + 1][j - 1]) neighbors++;
            if (i < numOfRows - 1 && j < numOfColumns - 1) {
              if (g[i + 1][j + 1]) neighbors++;
            }
            if (g[i][j] && (neighbors < 2 || neighbors > 3)) gridCopy[i][j] = 0;
            if (!g[i][j] && neighbors === 3) gridCopy[i][j] = 1;
          }
        }
      });
    });
    setGeneration((prev) => prev + 1);
  }

  useEffect(() => {
    if (running) {
      let intervalRun = setTimeout(play, 100)
      return () => clearTimeout(intervalRun)
    };
  });

  function handlePause() {
    setRunning(false);
  }

  function handleSlow() {
    speed = 1000;
    handlePlay();
  }

  function handleFast() {
    speed = 100;
    handlePlay();
  }

  function handleClear() {
    setGrid(generateEmptyGrid());
    setRunning(false);
    setGeneration(0);
    // clearInterval(setInterval(play, speed));
    // setGeneration(generation * 0);
    // console.log(intervalId, generation);
  }

  // function to generate random configuration
  function handleRandomGeneration() {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      rows.push(
        Array.from(Array(numOfColumns), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  function handleGridSize(size) {
    switch (size) {
      case "1":
        setNumOfColumns(20)
        setNumOfRows(10)
        break;
      case "2":
        setNumOfColumns(60)
        setNumOfRows(40)
        break;
      case "3":
        setNumOfColumns(70)
        setNumOfRows(50)
        break;
      default:
        setNumOfColumns(50)
        setNumOfRows(30)
    }
    handleClear();
  }
  
// populate the grid when the component mounts
  useEffect(() => {
    handleSeed();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <nav>
          <h2>Conway's Game of Life'</h2>
          <Link to="/about">About</Link>
        </nav>
        <div className="center">
          <RandomButton onClick={handleRandomGeneration} running={running} />
          <SlowButton onClick={handleSlow} />
          <FastButton onClick={handleFast} />
          <SeedButton onClick={handleSeed} />
          <StartButton onClick={handlePlay} />
          <PauseButton onClick={handlePause} />
          <ClearButton onClick={handleClear} />
          <div className="dropdown">
            <button className="dropbtn">Choose Grid</button>
            <div className="dropdown-content">
              <button onClick={() => handleGridSize("1")}>20x10</button>
              <button onClick={() => handleGridSize("2")}>50x30</button>
              <button onClick={() => handleGridSize("3")}>70x50</button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-center">Generation : {generation}</h4>
        </div>
        <div className="d-flex">
          <GridTwo
            grid={grid}
            rows={numOfRows}
            columns={numOfColumns}
            selectBox={selectBox}
            running={running}
          />
        </div>
      </div>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
