import express from "express";
import cors from "cors";
import { join, resolve } from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from "dotenv"

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 6969;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



function isSafe(sudoku, row, col, val) {
  console.log("working?");
  for (let i = 0; i < 9; i++) {
    console.log(sudoku[row][i]);
    console.log(sudoku[i][col]);
    if (sudoku[row][i] === val) {
      return false;
    }
    if (sudoku[i][col] === val) {
      return false;
    }
    if (
      sudoku[3 * Math.floor(row / 3) + Math.floor(i / 3)][
        3 * Math.floor(col / 3) + (i % 3)
      ] === val
    ) {
      return false;
    }
  }
  return true;
}

var sudoku = [[0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

function sudokuSolver(sudoku) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (sudoku[row][col] === 0) {
        for (let val = 1; val <= 9; val++) {
          if (isSafe(sudoku, row, col, val)) {
            sudoku[row][col] = val;
            let isNextSolutionPossible = sudokuSolver(sudoku);
            if (isNextSolutionPossible){
              return true;
            } 
            else{
              sudoku[row][col] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

sudokuSolver(sudoku)
console.log(sudoku);

app.post("/solve", async (req, res) => {
  console.log("fetch Working?");
  const sudoku = JSON.parse(req.query.data)
  var state = sudokuSolver(sudoku);
  console.log(state);
  if(!sudoku) {
    res.status(404)
    res.send({
      status: 400,
      error: "The sudoku data not found",
    })
    return
  }
  if(!state) {
    console.log("REQUEST Sent??");
    console.log(state);
    res.status(400)
    res.send({
      status: 400,
      error: "Sudoku Insolvable",
      comment: "Enter valid sudoku."
    })
    console.log("returning??");
    return
  }
  console.log("fetch worked sudoku Solved");
  res.status(200)
  res.send({
    status: 200,
    data: sudoku,
    isSolved: state
  })
})

app.use(express.static(join(__dirname, "build")))

app.get("*",(req,res)=>{
  res.send(resolve(__dirname, "build", "index.html"));
})

app.listen(PORT, () => {
  console.log("Server is running on the port: "+PORT);
});
