const SIGN_O = "O";
const SIGN_X = "X";

let game = {
  numberOfPlayers: 1, 
  playerOne: { turn: false, playerOneSign: "", score: 0, playerHuman: true },
  playerTwo: { turn: false, playerTwoSign: "", score: 0, playerHuman: false },
  board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  //always starts with X
};

let table = document.getElementById("table");

game.board.forEach(function(element) {
  let cell = document.createElement("BUTTON");
  cell.className = "cell";
  cell.setAttribute("id", element);
  cell.setAttribute("onClick", "clicked(this.id)");
  cell.innerHTML = element;
  table.appendChild(cell);
});

let cells = document.getElementsByClassName("cell");
let scoreBoard = document.getElementById("score");
let P_ONE;
let P_TWO;

function numPlayer(num) {
  if (num === 1) {
    game.numberOfPlayers = 1;
    P_ONE = "Human";
    P_TWO = "Machine";
  } else {
    game.numberOfPlayers = 2;
    P_ONE = "Player One";
    P_TWO = "Player Two";
  }
  document.getElementsByClassName("welcome")[0].style.display = "none";
  document.getElementsByClassName("pickSign")[0].style.display = "block";
  console.log(P_ONE, P_TWO);
  document.getElementById("pickSign").innerHTML = P_ONE + "," + " pick a sign";
}

function playerSign(sign) {
  document.getElementById("table").style.display = "block";

  if (sign === "X") {
    game.playerOne.playerOneSign = sign;
    game.playerTwo.playerTwoSign = SIGN_O;
    game.playerOne.turn = true;
  } else {
    game.playerOne.playerOneSign = sign;
    game.playerTwo.playerTwoSign = SIGN_X;
    game.playerTwo.turn = true;
  }

  document.getElementsByClassName("pickSign")[0].style.display = "none";
  document.getElementsByClassName("one")[0].style.display = "block";
  document.getElementsByClassName("heading")[0].className = "changeHeading";
  console.log(game);
  gamePlay();
}

function switchTurn() {
  if (game.playerOne.turn) {
    game.playerOne.turn = false;
    game.playerTwo.turn = true;
  } else {
    game.playerOne.turn = true;
    game.playerTwo.turn = false;
  }
}

function gamePlay() {
  if (game.numberOfPlayers < 2) {
    let currentPlayerSign =
      game.playerOne.turn === true
        ? game.playerOne.playerOneSign
        : game.playerTwo.playerTwoSign;
    let currentPlayer =
      game.playerOne.turn === true ? "playerOne" : "playerTwo";

    if (!game.playerTwo.playerHuman && game.playerTwo.turn === true) {
      let possibleMoves = arr => arr.filter(e => typeof e === "number");
      //console.log(game.board,possibleMoves(game.board));
      // console.log(possibleMoves(game.board)[0], cells[possibleMoves(game.board)[0]]);
      cells[possibleMoves(game.board)[0]].disabled = true;
      cells[possibleMoves(game.board)[0]].innerHTML = currentPlayerSign;
      game.board[possibleMoves(game.board)[0]] = currentPlayerSign;
      winning(game.board, currentPlayer);
    }
  }
}

function clicked(clicked_id) {
  let currentPlayerSign =
    game.playerOne.turn === true
      ? game.playerOne.playerOneSign
      : game.playerTwo.playerTwoSign;
  let currentPlayer = game.playerOne.turn === true ? "playerOne" : "playerTwo";
  game.board[clicked_id] = currentPlayerSign;
  document.getElementsByClassName("cell")[clicked_id].disabled = true;
  document.getElementsByClassName("cell")[
    clicked_id
  ].innerHTML = currentPlayerSign;
  // console.log(game.board, "board");
  winning(game.board, currentPlayer);
  gamePlay();
}

function refresh() {
  game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (var i in cells) {
    cells[i].innerHTML = i;
    cells[i].disabled = false;
  }
}

function winning(board, player) {
  //let status = board.game;
  switchTurn();
  let status = board;
  console.log(status);
  if (
    status.slice(0, 3).every(x => x === "X") ||
    status.slice(3, 6).every(x => x === "X") ||
    (status[0] === "X" && status[4] === "X" && status[8] === "X") ||
    (status[2] === "X" && status[4] === "X" && status[6] === "X") ||
    (status[0] === "X" && status[3] === "X" && status[6] === "X") ||
    (status[2] === "X" && status[5] === "X" && status[8] === "X") ||
    (status[1] === "X" && status[4] === "X" && status[7] === "X")
  ) {
    game[player].score = game[player].score + 1;
    refresh();
    console.log("winning X", game);
  } else if (
    status.slice(0, 3).every(x => x === "O") ||
    status.slice(3, 6).every(x => x === "O") ||
    (status[0] === "O" && status[4] === "O" && status[8] === "O") ||
    (status[2] === "O" && status[4] === "O" && status[6] === "O") ||
    (status[0] === "O" && status[3] === "O" && status[6] === "O") ||
    (status[2] === "O" && status[5] === "O" && status[8] === "O") ||
    (status[1] === "O" && status[4] === "O" && status[7] === "O")
  ) {
    console.log("winning O", game);
    game[player].score = game[player].score + 1;
    refresh();
  } else if (status.every(x => typeof x === "string")) {
    console.log("draw");
    refresh();
  } else {}

  scoreBoard.innerHTML =
    P_ONE +
    ": " +
    game.playerOne.score +
    "    " +
    P_TWO +
    ": " +
    game.playerTwo.score;
}

function clearRound() {
  refresh();
  game.playerOne.score = 0;
  game.playerTwo.score = 0;
  // game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  console.log(game);

  scoreBoard.innerHTML =
    P_ONE +
    ": " +
    game.playerOne.score +
    "    " +
    P_TWO +
    ": " +
    game.playerTwo.score;
}