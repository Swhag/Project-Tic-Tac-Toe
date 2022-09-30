const playerO = "O";
const playerX = "X";
let currentTurn = playerX;
let board = ["", "", "", "", "", "", "", "", ""];

const restart_btn = document.getElementById("restart-btn");
const boxes = Array.from(document.querySelectorAll(".box"));
const message = document.getElementById("message");

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("mousedown", boxMarked));
  restart_btn.addEventListener("mousedown", restart);
};

function boxMarked(e) {
  const i = e.target.id;
  if (board[i] == "") {
    board[i] = currentTurn;
    e.target.innerText = currentTurn;
    console.log(board);

    if (currentTurn == playerX) {
      currentTurn = playerO;
    } else currentTurn = playerX;
  }
  updateMessage();
}

function restart() {
  boxes.forEach((box) => (box.innerText = ""));
  currentTurn = playerX;
  board.fill("");
}

function updateMessage() {
  if (currentTurn == playerX) {
    message.innerText = "Player X's turn";
  } else message.innerText = "Player O's turn";
}

// const checkWinner = (fieldIndex) => {
//   const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

startGame();
