// SNAKE GAME PRROGRAM

const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gamewidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25; //px
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
  //starts with 5 parts of the snake
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      //14:31
    });
  }
}

function clearBoard() {}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }

  foodx = randomFood(0, gamewidth - unitSize);
  foody = randomFood(0, gamewidth - unitSize);
}

function drawFood() {
  context.fillStyle = foodColor;
  console.log(foodx);
  console.log(foody);
  context.fillRect(foodx, foody, unitSize, unitSize);
}

function moveSnake() {}

function drawSnake() {}

function changeDirection() {}

function checkGameOver() {}

function displayGameOver() {}

function resetGame() {}
