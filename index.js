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
const unitSize = 20;
let highScore = localStorage.getItem("highScore") || 0;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
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
  scoreText.textContent = "Score: " + score;
  highScoreText.textContent = "👑High Score: " + highScore;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
    updateHighScore(score);
  }
}

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gamewidth, gameHeight);
}

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
  context.fillRect(foodx, foody, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

  snake.unshift(head);
  if (snake[0].x == foodx && snake[0].y == foody) {
    score += 1;
    scoreText.textContent = "Score: " + score;
    updateHighScore();
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  console.log(keyPressed);
  const RIGHT = 39;
  const LEFT = 37;
  const DOWN = 40;
  const UP = 38;

  const goingUP = yVelocity == -unitSize;
  const goingDOWN = yVelocity == unitSize;
  const goingRIGHT = xVelocity == unitSize;
  const goingLEFT = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRIGHT:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDOWN:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLEFT:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUP:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gamewidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  context.font = "50px MV Boli";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("GAME OVER!", gamewidth / 2, gameHeight / 2);
  running = false;
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}

function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreText.textContent = "👑High Score: " + highScore;
  }
}
