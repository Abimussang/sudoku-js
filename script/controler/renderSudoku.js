import { sudokuObject, arrForComplete } from "../data/data.js";

let comleteSudoku = 0;

export function startSudoku(sudokuArr, sudokuAnswerArr) {
  document.querySelector(".mainBlock").style.display = "none";
  document.querySelector(".Sudoku").style.display = "flex";
  let temp = 0;
  let inputForChange = document.querySelectorAll("input");
  let tdFromTable = document.querySelectorAll("td");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdFromTable[temp].addEventListener("mouseover", mouseoverInput);
      tdFromTable[temp].addEventListener("mouseout", mouseoutInput);
      inputForChange[temp].addEventListener("keyup", {
        handleEvent: changeInput,
        temp: temp,
        sudokuAnswer: sudokuAnswerArr[i][j],
      });
      if (sudokuArr[i][j] === 0) {
        inputForChange[temp].value = "";
      } else {
        let arrOfCell = document.querySelectorAll(
          ".cell" + inputForChange[temp].className[4]
        );
        inputForChange[temp].value = sudokuArr[i][j];
        inputForChange[temp].disabled = true;
        let valueOfCell = inputForChange[temp].value;
        ChangeFontColorCell(arrOfCell);
        ChangeFontColorNum(valueOfCell, inputForChange);
      }
      temp++;
    }
  }
}

export function startEmptySudoku() {
  console.log("start");
  document.querySelector(".mainBlock").style.display = "none";
  document.querySelector(".Sudoku").style.display = "flex";
  let temp = 0;
  let inputForChange = document.querySelectorAll("input");
  let tdFromTable = document.querySelectorAll("td");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdFromTable[temp].addEventListener("mouseover", mouseoverInput);
      tdFromTable[temp].addEventListener("mouseout", mouseoutInput);
      inputForChange[temp].value = "";
      inputForChange[temp].addEventListener("keyup", {
        handleEvent: changeInputEmpty,
        temp: temp,
      });
      temp++;
    }
  }
}

function mouseoverInput() {
  hoverInput("rgba(173,216,230,0.5)", this);
}

function mouseoutInput() {
  hoverInput("", this);
}

function hoverInput(color, tdTemp) {
  let tempClass = ".column" + tdTemp.className[tdTemp.className.length - 1];
  for (let i = 0; i < 9; i++) {
    document.querySelectorAll(tempClass)[i].style.backgroundColor = color;
  }
}

function changeInputEmpty(temp) {
  let inputForChange = document.querySelectorAll("input");
  let tempCheck = false;
  let valueOfCell = inputForChange[this.temp].value;
  for (let i = 1; i <= 9; i++) {
    if (valueOfCell == i) {
      tempCheck = true;
    }
  }
  if (!tempCheck) {
    endSudoku(false);
  } else {
    inputForChange[this.temp].disabled = true;
    comleteSudoku++;
  }
  if (comleteSudoku == 81) {
    validatorSudoku();
  }
}

function changeInput(temp, sudokuAnswer) {
  let inputForChange = document.querySelectorAll("input");
  let valueOfCell = inputForChange[this.temp].value;

  if (valueOfCell != this.sudokuAnswer) {
    endSudoku(false);
  } else {
    inputForChange[this.temp].disabled = true;
    let arrOfCell = document.querySelectorAll(
      ".cell" + inputForChange[this.temp].className[4]
    );
    ChangeFontColorCell(arrOfCell);
    ChangeFontColorNum(valueOfCell, inputForChange);
    if (comleteSudoku == 9) {
      endSudoku(true);
    }
  }
}

function ChangeFontColorCell(arrOfCell) {
  let countCompleteCell = 0;
  for (let i = 0; i < 9; i++) {
    if (arrOfCell[i].value != "") {
      countCompleteCell++;
    }
  }
  if (countCompleteCell == 9) {
    for (let i = 0; i < 9; i++) {
      arrOfCell[i].style.color = "coral";
    }
  }
}

function ChangeFontColorNum(valueOfCell, inputForChange) {
  if (++arrForComplete[valueOfCell - 1] === 9) {
    comleteSudoku++;
    for (let i = 0; i < 81; i++) {
      if (inputForChange[i].value == valueOfCell)
        inputForChange[i].style.color = "coral";
    }
  }
}

function endSudoku(gameResult) {
  let endGame = document.querySelector(".endGame");
  endGame.style.display = "flex";
  if (gameResult == true) {
    endGame.children[0].innerHTML = `<p>You win</p><button class = "goToMenu">Menu</button>`;
  } else {
    endGame.children[0].innerHTML = `<p>You Lose</p><button class = "goToMenu">Menu</button>`;
  }
  document.querySelector(".goToMenu").addEventListener("click", reLoad);
}

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

function validatorSudoku() {
  let inputForChange = document.querySelectorAll("input");
  let tempLose = false;
  let ArrSudoku = [];
  let ArrTemp = [];
  let temp = 0;
  for (let i = 0; i < 9; i++) {
    ArrSudoku[i] = [];
    for (let j = 0; j < 9; j++) {
      ArrSudoku[i][j] = inputForChange[temp].value;
      temp++;
    }
  }
  for (let i = 0; i < 9; i++) {
    ArrTemp = [];
    for (let j = 0; j < 9; j++) {
      ArrTemp.push(ArrSudoku[i][j]);
    }
    ArrTemp.sort(compareNumeric);
    for (let j = 0; j < 9; j++) {
      if (ArrTemp[j] !== j) {
        tempLose = true;
      }
    }
  }
  let tempForI = 0;
  let tempForJ = 0;
  for (let k = 0; k < 9; k++) {
    ArrTemp = [];
    for (let i = tempForI; i < tempForI + 3; i++) {
      for (let j = tempForJ; j < tempForJ + 3; j++) {
        ArrTemp.push(ArrSudoku[j][i]);
      }
    }
    tempForI += 3;
    if ((k + 1) % 3 == 0) {
      tempForJ += 3;
      tempForI = 0;
    }
    ArrTemp.sort(compareNumeric);
    for (let j = 0; j < 9; j++) {
      if (ArrTemp[j] !== j) {
        tempLose = true;
      }
    }
  }
  if (tempLose == true) {
    endSudoku(false);
  }
  else{
    endSudoku(true);
  }
}

function reLoad() {
  window.location.reload();
}
