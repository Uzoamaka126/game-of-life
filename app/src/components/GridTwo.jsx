import React, { useState, useEffect } from "react";
import { StartButton, PauseButton, StopButton } from "./ActionButtons";

function Box({ boxClass, boxId, selectBoxProps, row, col }) {
  function selectBox() {
    selectBoxProps(row, col);
  }

  return (
    <div
      className={boxClass}
      id={boxId}
      onClick={selectBox}
      //   style={{
      //     width: "20",
      //     heights: 20,
      //     backgroundColor: [row][col] ? "black" : "white",
      //     border: "1px solid #ddd",
      //   }}
    />
  );
}
export function GridTwo({ grid, rows, columns, selectBox }) {
//   var rowsArr = [];
//   var boxClass = "";

  //   for (var i = 0; i < rows; i++) {
  //     for (var j = 0; j < columns; j++) {
  //       let boxId = i + "_" + j;
  //       boxClass = grid[i][j] ? "box on" : "box off";
  //       console.log(boxClass);
  //       rowsArr.push(
  //         <Box
  //           boxClass={boxClass}
  //           key={`${i}-${j}`}
  //           boxId={`${i}-${j}`}
  //           row={i}
  //           col={j}
  //           selectBoxProps={selectBox}
  //         />
  //       );
  //     }
  //   }

  return (
    <>
      <div className="grid" style={{ width: columns * 21 }}>
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
                    onClick={() => { console.log(i, j); selectBox(i, j)}}
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
