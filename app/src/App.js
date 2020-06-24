import React, { useState, useEffect } from "react";
import "./App.css";
import { GridTwo } from "./components/GridTwo";
import { produce } from "immer";
// import { Grid } from "./components/Grid";

// const rows = 30;
const numOfRows = 30;
const numOfColumns = 50;
// const columns = 50;
// const speed = 100;

function App() {
  // const [grid, setGrid] = useState(
  //   Array(rows)
  //     .fill()
  //     .map(() => Array(columns).fill(false))
  // );
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      // push an array of columns
      rows.push(Array.from(Array(numOfColumns), () => 0));
    }
    return rows;
  });

  function selectBox(row, col) {
    // let gridCopy = arrayClone(grid);
    let newGrid = produce(grid, (gridCopy) => {
      gridCopy[row][col] = gridCopy[row][col] ? 0 : 1;
    });
    setGrid(newGrid)
    // gridCopy[row][col] = !gridCopy[row][col];
    // setGrid(gridCopy);
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

    useEffect(() => {
      seed();
    }, []);
  
  return (
    <GridTwo
      grid={grid}
      rows={numOfRows}
      columns={numOfColumns}
      selectBox={selectBox}
    />
    // <Grid />
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
