import "./App.css";
import { useState } from "react";
import checkSudokuIsValid from "./helper.js";

function App() {
  const [solved, setSolved] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [data, setData] = useState("");
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from(new Array(9), (a, b) => Array.from(new Array(9), (a, b) => 0))
  );
  const [sudokuIsValid, setSudokuIsValid] = useState(checkSudokuIsValid(sudokuGrid))
  const handleSudokuIsValid = () => setSudokuIsValid(checkSudokuIsValid(sudokuGrid))

  const clearGrid = () => {
    setSudokuGrid(
      Array.from(new Array(9), (a, b) => Array.from(new Array(9), (a, b) => 0))
    );
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        document.getElementById(i + ":" + j).value = "";
      }
    }
    setSolved(false);
    setIsSolved(false);
  };
  const handleSetSudokuGrid = (row, col, val) => {
    setSudokuGrid((prev) => {
      prev[row][col] = +val;
      return prev;
    });
  };
  const inputChangeHandler = (e) => {
    const _id = e.target.id.split(":");
    if (e.target.value === "") {
      handleSetSudokuGrid(+_id[0], +_id[1], "");
    }
    if (/^[0-9]+$/.test(e.target.value.trim())) {
      const current = e.target.value.trim()[e.target.value.trim().length - 1];
      handleSetSudokuGrid(+_id[0], +_id[1], current);
      e.target.value = current === "0" ? "" : current;
    } else {
      handleSetSudokuGrid(+_id[0], +_id[1], "");
      e.target.value = "";
    }
    handleSudokuIsValid()
  };

  const handleSolveButton = async (event) => {
    handleSudokuIsValid()
    if(!sudokuIsValid) {
      alert("Invalid sudoku grid.\nPlease check and resolve.")
      return
    }
    const res = await (
      await fetch("/solve?data=" + JSON.stringify(sudokuGrid), {
        method: "POST",
      })
    ).json();
    console.log(res.status);
    console.log("/solve?data=" + JSON.stringify(sudokuGrid));
    if (res.status >= 400) {
      debugger;
      console.log("hello");
      setIsSolved(false);
      setSolved(true);
      setData(res.comment || res.error);
      console.log(res.comment);
      console.log(res.error);
    } else {
      setIsSolved(true);
      setSolved(true);
      setData(res.data);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          handleSetSudokuGrid(i, j, res.data[i][j]);
          document.getElementById(i + ":" + j).value =
            res.data[i][j].toString();
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="sudoku">
        <h2 className="heading">Sudoku Solver</h2>
        <div className="grid-container">
          <table id="grid">
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rindex) => {
                return (
                  <tr key={rindex} id={"row-" + rindex}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cindex) => {
                      return (
                        <td key={cindex}>
                          <input
                            onChange={inputChangeHandler}
                            className="input-field"
                            id={rindex + ":" + cindex}
                            autoComplete={"off"}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div id="grid-result">
            {/* {!solved && !isSolved && (
              <button class="arrowMove" onClick={handleSolveButton}>
                <p class="arrowMoveFirstText">Solve Sudoku?</p>
                <div class="icon arrow"></div>
                <p class="arrowMoveSecondText">Click here!</p>
              </button>
            )}

            {solved &&
              !isSolved && (
                <button class="arrowMove" onClick={handleSolveButton}>
                  <p class="arrowMoveFirstText">Solve Sudoku?</p>
                  <div class="icon arrow"></div>
                  <p class="arrowMoveSecondText">Click here!</p>
                </button>
              ) && <p>{data}</p>}

            {solved && isSolved && <p>Solved</p> && (
              <button class="arrowMove" onClick={clearGrid} id="btn-success">
                <p class="arrowMoveFirstText">Clear Sudoku?</p>
                <div class="icon arrow"></div>
                <p class="arrowMoveSecondText">Click here!</p>
              </button>
            )} */}

            {!solved && !isSolved ? (
              <button class="arrowMove" onClick={handleSolveButton}>
                <p class="arrowMoveFirstText">Solve Sudoku?</p>
                <div class="icon arrow"></div>
                <p class="arrowMoveSecondText">Click here!</p>
              </button>
            ) : solved && !isSolved ? (
              <div>
                <button class="arrowMove" onClick={handleSolveButton}>
                  <p class="arrowMoveFirstText">Solve Sudoku?</p>
                  <div class="icon arrow"></div>
                  <p class="arrowMoveSecondText">Click here!</p>
                </button>
                <p>{data}</p>
              </div>
            ) : (
              <div className="success">
                <p>Solved</p>
                <button class="arrowMove" onClick={clearGrid} id="btn-success">
                  <p class="arrowMoveFirstText">Clear Sudoku?</p>
                  <div class="icon arrow"></div>
                  <p class="arrowMoveSecondText">Click here!</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
