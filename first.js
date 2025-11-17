let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameSection = document.querySelector("#game-section");
let startScreen = document.querySelector(".start-screen");
let playBtn = document.querySelector("#play-btn");
let choosePlayer = document.querySelector(".choose-player");
let chooseO = document.querySelector("#choose-o");
let chooseX = document.querySelector("#choose-x");

let turn = true; 
let count = 0;
let playerSymbol = "O"; // default

const winpattern = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

// Start Screen
playBtn.addEventListener("click", () => {
  choosePlayer.classList.remove("hide");
  playBtn.style.display = "none";
});

// Choose player
chooseO.addEventListener("click", () => {
  playerSymbol = "O";
  startGame();
});
chooseX.addEventListener("click", () => {
  playerSymbol = "X";
  startGame();
});

function startGame() {
  startScreen.classList.add("hide");
  gameSection.classList.remove("hide");
}

// Gameplay
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    let currentSymbol = turn ? playerSymbol : (playerSymbol === "O" ? "X" : "O");
    box.innerText = currentSymbol;
    box.classList.add(currentSymbol.toLowerCase());
    box.disabled = true;

    turn = !turn;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const disboxes = () => {
  for (let box of boxes) box.disabled = true;
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o", "x", "winner-o", "winner-x");
  }
};

const showwinner = (winner, winningPattern) => {
  msg.innerText = `🎉 Congrats, Winner is ${winner}!`;
  msgcontainer.classList.remove("hide");

    winningPattern.forEach((index) => {
    boxes[index].classList.add(winner === "O" ? "winner-o" : "winner-x");
  });

  disboxes();
};

const gameDraw = () => {
  msg.innerText = `It's a Draw! 🤝`;
  msgcontainer.classList.remove("hide");
  disboxes();
};

const checkWinner = () => {
  for (let pattern of winpattern) {
    let [a, b, c] = pattern;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showwinner(pos1, pattern);
      return true;
    }
  }
  return false;
};

const resetgame = () => {
  turn = true;
  count = 0;
  enableboxes();
  msgcontainer.classList.add("hide");
};

newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
