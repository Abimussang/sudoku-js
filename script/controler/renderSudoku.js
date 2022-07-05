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

function changeInput(temp, sudokuAnswer) {
  let inputForChange = document.querySelectorAll("input");
  let valueOfCell = inputForChange[this.temp].value;

  if (valueOfCell != this.sudokuAnswer) {
    endSudoku(false);
  } else {
    //log(comleteSudoku);
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

/*export function loadOfWindow() {
  let buttonForDifficalte = document.querySelectorAll(
    ".DivForDifficalte > button"
  );
  for (let i = 0; i < buttonForDifficalte.length; i++) {
    let NameClass = buttonForDifficalte[i].className;
    buttonForDifficalte[i].addEventListener("click", {
      handleEvent: ChangeIndex,
      nameClass: NameClass,
    });
    //document.querySelector("."+NameClass+"Div").addEventListener("click", {handleEvent: ChangeIndex, nameClass: NameClass});
  }
  let tempChooseNum = document.querySelectorAll(".ChooseNum > div > button");
  for (let i = 0; i < tempChooseNum.length; i++) {
    console.log(tempChooseNum[i]);
    tempChooseNum[i].addEventListener("click", {
      handleEvent: ChooseSudoku,
      nameClass: tempChooseNum[i].value,
    });
  }
  //document.querySelector(".easyDiv").addEventListener("click", {handleEvent: ChangeIndex, nameClass: });
}*/

/*function ChangeIndex() {
  //document.querySelector(".easyDiv").style
  console.log(this.nameClass);
  let tempChooseNum = document.querySelectorAll(".ChooseNum > div");
  for (let j = 0; j < tempChooseNum.length; j++) {
    tempChooseNum[j].style.zIndex = 0;
  }
  document.querySelector("." + this.nameClass + "Div").style.zIndex = "1";
}

function ChooseSudoku() {
  console.log(this.nameClass);
  //console.log("data ", sudokuObject[this.nameClass]);
  let key = this.nameClass;
  let keyAnswer =
    this.nameClass.slice(0, this.nameClass.length - 1) +
    "Answer" +
    this.nameClass[this.nameClass.length - 1];
  //console.log(sudokuObject[key]);
  startSudoku(sudokuObject[key], sudokuObject[keyAnswer]);
  //console.log(sudokuObject[keyAnswer]);
  //console.log(keyAnswer);
  //Classname = this.nameClass;
  //ChoosedSudoku;
}*/

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
    endGame.children[0].innerHTML = "<p>You win</p>";
  } else {
    endGame.children[0].innerHTML = "<p>You Lose</p>";
  }
}
