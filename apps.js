const playerO = "O";
const playerX = "X";
let gameOver = false;
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

    checkWinner();
    updateMessage();

    if (currentTurn == playerX) {
      currentTurn = playerO;
    } else currentTurn = playerX;
  }
}

function restart() {
  boxes.forEach((box) => (box.innerText = ""));
  board.fill("");

  currentTurn = playerX;
  gameOver = false;

  window.location.reload();
}

function updateMessage() {
  if (gameOver) {
    message.innerText = `Player ${currentTurn} has won`;
  } else message.innerText = `Player ${currentTurn}'s turn`;
}

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const winCondition of winCombos) {
    let [a, b, c] = winCondition;
    if (board[a] && board[a] == board[b] && board[a] == board[c]) {
      return (gameOver = true), disableGame();
    }
  }
}

function disableGame() {
  if (gameOver) {
    board.fill(null);
    console.log(board);
  }
}

startGame();
