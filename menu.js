import { sudokuObject } from "./script/data/data.js";
import {startSudoku} from "./script/controler/renderSudoku.js";

window.addEventListener("load", loadOfWindow);
function loadOfWindow() {
  let buttonForDifficalte = document.querySelectorAll(
    ".DivForDifficalte > button"
  );
  for (let i = 0; i < buttonForDifficalte.length; i++) {
    let NameClass = buttonForDifficalte[i].className;
    buttonForDifficalte[i].addEventListener("click", {
      handleEvent: ChangeIndex,
      nameClass: NameClass,
    });
  }
  let tempChooseNum = document.querySelectorAll(".ChooseNum > div > button");
  for (let i = 0; i < tempChooseNum.length; i++) {
    console.log(tempChooseNum[i]);
    tempChooseNum[i].addEventListener("click", {
      handleEvent: ChooseSudoku,
      nameClass: tempChooseNum[i].value,
    });
  }
}

function ChangeIndex() {
  console.log(this.nameClass);
  let tempChooseNum = document.querySelectorAll(".ChooseNum > div");
  for (let j = 0; j < tempChooseNum.length; j++) {
    tempChooseNum[j].style.zIndex = 0;
  }
  document.querySelector("." + this.nameClass + "Div").style.zIndex = "1";
}

function ChooseSudoku() {
  console.log(this.nameClass);
  let key = this.nameClass;
  let keyAnswer =
    this.nameClass.slice(0, this.nameClass.length - 1) +
    "Answer" +
    this.nameClass[this.nameClass.length - 1];
  startSudoku(sudokuObject[key], sudokuObject[keyAnswer]);
}
