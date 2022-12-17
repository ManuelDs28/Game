const canvas = document.getElementById("canvas-test");
const ctx = canvas.getContext("2d");

const canvasDiv = document.querySelector(".canvas-div");
const game = new Game(ctx);

const introSound = new Audio("./sounds/intro.mp3");

// introSound.play();
introSound.valume = 0.5;

const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", () => {
  game.start();
  introSound.pause();
  canvasDiv.classList.remove("hidden");
  canvas.classList.remove("hidden");
  bothBtns.classList.add("hidden");
});
const howBtn = document.querySelector(".how-to-play");
const bothBtns = document.querySelector(".both-btn");
const instructions = document.querySelector(".instructions");
howBtn.addEventListener("click", () => {
  instructions.classList.remove("hidden");
  instructions.classList.add("game-center");
  bothBtns.classList.add("hidden");
});
const backToMenu = document.querySelector(".back-to-menu");
backToMenu.addEventListener("click", () => {
  instructions.classList.add("hidden");
  bothBtns.classList.remove("hidden");
  instructions.classList.remove("game-center");
});
const playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", () => {
  canvas.classList.add("hidden");
});

document.addEventListener("keydown", (event) => {
  game.player.directions(event);
});
document.addEventListener("keyup", (event) => {
  game.player.directions(event);
});
