const playerO = "O";
const playerX = "X";

let gameOver = false;
let currentTurn = playerX;
let board = ["", "", "", "", "", "", "", "", ""];
let round = 0;

const restart_btn = document.getElementById("restart-btn");
const boxes = Array.from(document.querySelectorAll(".box"));
const message = document.getElementById("message");

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("mousedown", boxMarked));
  restart_btn.addEventListener("mousedown", restart);
};

function countRound() {
  if (!gameOver && round < 9) {
    round++;
    console.log(round);
    console.log(gameOver);
  }
}

function boxMarked(e) {
  const i = e.target.id;
  if (board[i] == "") {
    board[i] = currentTurn;
    e.target.innerText = currentTurn;

    countRound();
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
  round = 0;

  window.location.reload();
}

function updateMessage() {
  if (round >= 9) {
    message.innerText = "It's a draw!";
  } else if (gameOver) {
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
  board.fill(null);
}

startGame();
