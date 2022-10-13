const extractRow = (grid, index) => {
  return grid[index];
};

const extractColumn = (grid, index) => {
  var array = [];
  for (var i = 0; i < 9; i++) {
    array.push(grid[i][index]);
  }
  return array;
};

const extractGrid = (grid, index) => {
  if(index === 0) {
    return [
      grid[0][0], 
      grid[0][1], 
      grid[0][2], 
      grid[1][0], 
      grid[1][1], 
      grid[1][2], 
      grid[2][0], 
      grid[2][1], 
      grid[2][2], 
    ]
  }
  if(index === 1) {
    return [
      grid[0][0+3], 
      grid[0][1+3], 
      grid[0][2+3], 
      grid[1][0+3], 
      grid[1][1+3], 
      grid[1][2+3], 
      grid[2][0+3], 
      grid[2][1+3], 
      grid[2][2+3], 
    ]
  }
  if (index === 2) {
    return [
      grid[0][0+3+3], 
      grid[0][1+3+3], 
      grid[0][2+3+3], 
      grid[1][0+3+3], 
      grid[1][1+3+3], 
      grid[1][2+3+3], 
      grid[2][0+3+3], 
      grid[2][1+3+3], 
      grid[2][2+3+3], 
    ]
  }
  if(index === 3) {
    return [
      grid[0+3][0], 
      grid[0+3][1], 
      grid[0+3][2], 
      grid[1+3][0], 
      grid[1+3][1], 
      grid[1+3][2], 
      grid[2+3][0], 
      grid[2+3][1], 
      grid[2+3][2], 
    ]
  }
  if(index === 4) {
    return [
      grid[0+3][0+3], 
      grid[0+3][1+3], 
      grid[0+3][2+3], 
      grid[1+3][0+3], 
      grid[1+3][1+3], 
      grid[1+3][2+3], 
      grid[2+3][0+3], 
      grid[2+3][1+3], 
      grid[2+3][2+3], 
    ]
  }
  if(index === 5) {
    return [
      grid[0+3][0+3+3], 
      grid[0+3][1+3+3], 
      grid[0+3][2+3+3], 
      grid[1+3][0+3+3], 
      grid[1+3][1+3+3], 
      grid[1+3][2+3+3], 
      grid[2+3][0+3+3], 
      grid[2+3][1+3+3], 
      grid[2+3][2+3+3], 
    ]
  }
  if(index === 6) {
    return [
      grid[0+3+3][0], 
      grid[0+3+3][1], 
      grid[0+3+3][2], 
      grid[1+3+3][0], 
      grid[1+3+3][1], 
      grid[1+3+3][2], 
      grid[2+3+3][0], 
      grid[2+3+3][1], 
      grid[2+3+3][2], 
    ]
  }
  if(index === 7) {
    return [
      grid[0+3+3][0+3], 
      grid[0+3+3][1+3], 
      grid[0+3+3][2+3], 
      grid[1+3+3][0+3], 
      grid[1+3+3][1+3], 
      grid[1+3+3][2+3], 
      grid[2+3+3][0+3], 
      grid[2+3+3][1+3], 
      grid[2+3+3][2+3], 
    ]
  }
  if(index === 8) {
    return [
      grid[0+3+3][0+3+3], 
      grid[0+3+3][1+3+3], 
      grid[0+3+3][2+3+3], 
      grid[1+3+3][0+3+3], 
      grid[1+3+3][1+3+3], 
      grid[1+3+3][2+3+3], 
      grid[2+3+3][0+3+3], 
      grid[2+3+3][1+3+3], 
      grid[2+3+3][2+3+3], 
    ]
  }
};

const checkGridValid = (grid) => {
  var current = false;
  var row = grid.filter((e) => e !== 0);
  if (row.length === 0) {
    current = true
  }
  var stack = [];
  for (var e of row) {
    if (!stack.includes(e)) {
      stack.push(e);
    } else {
      current = false;
    }
  }
  if(stack.length === row.length) {
    current = true
  }
  else {
    current = false
  }
  return current
};

const checkSudokuIsValid = (sudoku) => {
  var rows = 0;
  var cols = 0;
  var grids = 0;
  for (var i = 0; i < 9; i++) {
    if (checkGridValid(extractRow(sudoku, i))) {
      rows++;
    }
    if (checkGridValid(extractColumn(sudoku, i))) {
      cols++;
    }
    if (checkGridValid(extractGrid(sudoku, i))) {
      grids++;
    }
  }
  if (rows === 9 && cols === 9 && grids === 9) {
    return true;
  }
  return false;
};

console.log(checkSudokuIsValid(Array.from(new Array(9), (a, b) => Array.from(new Array(9), (a, b) => 0))))

export default checkSudokuIsValid
