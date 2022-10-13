// const [isSudokuValid, setIsSudokuValid] = useState(false);
// const handleSudokuIsValid = () => {
//   // ROW WISE
//   for(var i=0;i<9; i++) {

//   }
// }

// const extractRow = (grid, index) => {
//     return grid[index]
//   }
  
//   const extractColumn = (grid, index) => {
//     var array = []
//     for(var i=0; i<9; i++) {
//       array.push(grid[i][index])
//     }
//     return array
//   }
  
//   const extractGrid = (grid, index) => {
//     var columnComponent = Math.floor(index/3)*3
//     var array = []
//     for(var i=0; i<3; i++) {
//       for(var k=0; k<3; k++) {
//         array.append(grid[index+i][columnComponent+k])
//       }
//     }
//     return array
//   }
  
//   const checkGridValid = (grid) => {
//     var rowStack = []
//     var row = grid.filter(e => typeof e === Number && e !== 0);
//     if(row.length === 0) {
//       rowStack.push(true)
//     }
//     var stack = []
//     for(var e of row) {
//       if(!stack.includes(e)) {
//         stack.push(e)
//       }
//       else {
//         return false
//       }
//     }
//     if(stack.length === row.length) {
//       rowStack.push(true)
//     }
//     return false
//   }
  
//   const checkSudokuIsValid = (sudoku) => {
//     var rows = 0
//     var cols = 0
//     var grids = 0
//     for(var i=0; i<9; i++) {
//       if(checkGridValid(extractRow(sudoku, i))) {
//         rows++;
//       }
//       if(checkGridValid(extractColumn(sudoku, i))) {
//         cols++;
//       }
//       if(checkGridValid(extractGrid(sudoku, i))) {
//         grids++;
//       }
//     }
//     if(rows === 9 && cols === 9 && grids === 9) {
//       return true
//     }
//     return false
//   }