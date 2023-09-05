const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const statustxt = document.querySelector("#status");
const tapaudio = new Audio("audio/usertap.mp3");
const winaudio = new Audio("audio/win.mp3");
const tieaudio = new Audio("audio/tie.mp3");
const scrx = document.getElementById("x-score");
const scro = document.getElementById("o-score");

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playerXscore = 0;
let playerOscore = 0;
let playerX = "X";
let playerO = "O";
let options = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let running = false;
start();

function start() {
  boxes.forEach((box) => box.addEventListener("click", boxclicked));
  reset.addEventListener("click", resetgame);
  statustxt.textContent = ` ${player} your's turn`;
  running = true;
}

function boxclicked() {
  const index = this.dataset.index;
  if (options[index] != "" || !running) {
    return;
  }
  updatebox(this, index);
  checkwinner();
  tapaudio.play();
}

function updatebox(box, index) {
  options[index] = player;
  box.textContent = player;
}

function changeplayer() {
  player = player == "X" ? "O" : "X";
  statustxt.innerHTML = ` ${player} Your's Turn`;
}
function checkwinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];

    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];

    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }

    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxes[condition[0]].classList.add("win");
      boxes[condition[1]].classList.add("win");
      boxes[condition[2]].classList.add("win");
      break;
    }
  }
  if (isWon) {
    updatescore();
    statustxt.textContent = ` ${player} You Won 😎...!`;
    winaudio.play();
    running = false;
  } else if (!options.includes("")) {
    statustxt.textContent = `Game Draw 😐.....`;
    running = false;
    tieaudio.play();
  } else {
    changeplayer();
  }
}
function updatescore() {
  if (player === playerX) {
    playerXscore++;
    scrx.textContent = playerXscore;
  } else {
    playerOscore++;
    scro.textContent = playerOscore;
  }
}

function resetgame() {
  player = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
  });

  statustxt.innerHTML = ` ${player} Your's Turn`;
  running = true;
}
