import React from "react";
import "./Solved.css";
import { useState } from "react";

const Solved = (props) => {
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from(new Array(9), (a, b) => Array.from(new Array(9), (a, b) => 0))
  );

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      setSudokuGrid((prev) => {
        console.log(props.grid[i][j]);
        prev[i][j] = props.grid[i][j];
      });
    }
  }
  return (
    <div className="App">
      <h2>Sudoku Solver</h2>
      <div className="sudoku">
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rindex) => {
              return (
                <tr key={rindex}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cindex) => {
                    return (
                      <td key={cindex}>
                        <input
                          className="input-field"
                          id={rindex + ":" + cindex}
                          value={
                            sudokuGrid[rindex][cindex] > 0
                            ? sudokuGrid[rindex][cindex].toString()
                            : ""
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solved;
