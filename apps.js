"use strict";

const player = (mark) => {
  const getMark = () => {
    return mark;
  };

  return { getMark };
};

// ----------------------------------------------

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const reset = () => {
    board.fill("");
    location.reload();
  };
  return { board, reset };
})();

// ----------------------------------------------

const gameController = (() => {
  const playerX = player("X");
  const playerO = player("O");

  let round = 0;
  let gameOver = false;
  let currentTurn = playerX.getMark();

  const markBox = (e) => {
    const i = e.target.id;
    if (gameBoard.board[i] == "") {
      gameBoard.board[i] = currentTurn;
      e.target.innerText = currentTurn;

      countRound();
      checkWinner();
      updateMessage();
      getCurrentTurn();
      console.log(round);
      console.log(gameOver);
    }
  };

  const countRound = () => {
    if (!gameOver && round <= 9) {
      round++;
    }
  };

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

  const checkWinner = () => {
    for (const winCondition of winCombos) {
      let [a, b, c] = winCondition;
      if (
        gameBoard.board[a] &&
        gameBoard.board[a] == gameBoard.board[b] &&
        gameBoard.board[a] == gameBoard.board[c]
      ) {
        return (gameOver = true), disableGame();
      }
    }
  };

  const getCurrentTurn = function () {
    if (currentTurn == playerX.getMark()) {
      currentTurn = playerO.getMark();
    } else currentTurn = playerX.getMark();
  };

  const updateMessage = () => {
    if (round >= 9) {
      message.innerText = "It's a draw!";
      gameOver = true;
    } else if (gameOver) {
      message.innerText = `Player ${currentTurn} has won`;
    } else message.innerText = `Player ${currentTurn}'s turn`;
  };

  const disableGame = () => {
    gameBoard.board.fill(null);
  };

  const reset = () => {
    currentTurn = playerX.getMark();
    gameOver = false;
    round = 0;
  };

  return { markBox, reset, updateMessage };
})();

// ----------------------------------------------

const displayController = (() => {
  const message = document.getElementById("message");
  const restart_btn = document.getElementById("restart-btn");
  const boxes = Array.from(document.querySelectorAll(".box"));

  boxes.forEach((box) => box.addEventListener("click", gameController.markBox));

  restart_btn.addEventListener("click", () => {
    reset();
    gameBoard.reset(), gameController.reset(), gameController.updateMessage();
  });

  const reset = () => {
    boxes.forEach((box) => (box.innerText = ""));
  };
})();
