import React from "react";

export function GridTwo({ grid, rows, columns, selectBox, running }) {
  function selectBoxCell(row, col) {
    if (!running) {
      selectBox(row, col);
    }
  }

  return (
    <div className="grid" style={{ width: columns * 14 }}>
      {grid.map((rows, i) =>
        rows.map((col, j) => (
          <div
            className={grid[i][j] ? "box on" : "box off"}
            key={`${i}-${j}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][j] ? "black" : "white",
              border: "1px solid #ddd",
              marginLeft: "-1px",
              marginBottom: "-1px",
              cursor: running === true ? "no-drop" : "pointer",
            }}
            onClick={() => selectBoxCell(i, j)}
          />
        ))
      )}
    </div>
  );
}
