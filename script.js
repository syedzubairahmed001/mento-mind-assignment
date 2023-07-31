
//defining drag events
let activeDiv = null;
let originalColor = null;
let originalNumber = null;

let undoTargetDiv = null;
let undoActiveDiv = null;

const dragStart = function (event) {
  activeDiv = event.target;
  originalColor = activeDiv.style.backgroundColor;
  originalNumber = activeDiv.innerText;
  event.dataTransfer.setData("text", "");
};
const dragEnter = function (event) {
  event.preventDefault();
  if (event.target.classList.contains("draggable")) {
    event.target.style.opacity = "0.5";
  }
};
const dragLeave = function (event) {
  event.preventDefault();
  if (event.target.classList.contains("draggable")) {
    event.target.style.opacity = "1";
  }
};
const dragOver = function (event) {
  event.preventDefault();
};
const dragEnd = function (event) {
  event.preventDefault();
  activeDiv.style.backgroundColor = originalColor;
  activeDiv.style.opacity = "1";
//   activeDiv = null;
};

//drop action
const drop = function (event) {
  event.preventDefault();
  if (event.target.classList.contains("draggable")) {
    const targetDiv = event.target;
    undoTargetDiv = targetDiv;
    undoActiveDiv = activeDiv;
    const tempColor = targetDiv.style.backgroundColor;

    targetDiv.style.backgroundColor = originalColor;
    activeDiv.style.backgroundColor = tempColor;
    activeDiv.innerText = targetDiv.innerText;
    targetDiv.innerText = originalNumber;
  }
  activeDiv.style.opacity = "1";
  activeDiv = null;
  originalNumber = null;
};

//undo function
const onUndoClick = function () {
    let activeColor = undoActiveDiv.style.backgroundColor;
    let activeText = undoActiveDiv.innerText;
    let targetColor = undoTargetDiv.style.backgroundColor;
    let targetText = undoTargetDiv.innerText;

    undoActiveDiv.style.backgroundColor = targetColor;
    undoTargetDiv.style.backgroundColor = activeColor;

    undoActiveDiv.innerText = targetText;
    undoTargetDiv.innerText = activeText;
}


//attach drag events
const draggables = document.querySelectorAll(".draggable");
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragenter", dragEnter);
  draggable.addEventListener("dragleave", dragLeave);
  draggable.addEventListener("dragover", dragOver);
  draggable.addEventListener("drop", drop);
  draggable.addEventListener("dragend", dragEnd);
});
