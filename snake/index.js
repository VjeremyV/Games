const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
class SnakeBody{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}
const restart = document.getElementById('restart');
let bestScoreContainer = document.getElementById('best');
const img = new Image();
img.src = "./assets/grass.png";
let snakeParts = [];
const gulp = new Audio('./assets/gulp.wav');
const endSound = new Audio('./assets/gameover.wav');
let tailLength = 2;

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;
let xShift = 0;
let yShift = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
let bestScore = 0;


function runGame() {
  snakeShift();
  let gameStatus = isGameOver();
  if(gameStatus){
    return;
  }
  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  increaseScore();
  setTimeout(runGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;
if(headX < 0 || headX == tileCount || headY < 0 || headY == tileCount){
  gameOver = true;

}

for(let j=0; j < snakeParts.length; j++ ){
  let part = snakeParts[j];
  if(part.x === headX && part.y === headY && tailLength > 2) {
    gameOver = true;
  }
}

if(gameOver){
  ctx.fillStyle = "white";
  ctx.font = " 50px Verdana";

  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop('0.5', "blue");
  gradient.addColorStop('1.0', "red");
  ctx.fillStyle = gradient;
  var textGameover = "GAME OVER"
  ctx.textBaseline = "middle";
  ctx.textAlign ="center";
  ctx.fillText(textGameover, (canvas.width / 2), canvas.height /2)
  endSound.play();

  bestScore = Math.max(bestScore, score);
  document.getElementById('best').innerText = bestScore;
}
return gameOver;

}

function increaseScore(){
  ctx.fillStyle = 'white';
  ctx.font ="1rem Verdana ";
  ctx.fillText("score : " + score, 10, 20)
  
}

function clearScreen() {
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function drawSnake() {
  ctx.fillStyle ='blue';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle ='white';
  for(let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
  }

  snakeParts.push(new SnakeBody(headX, headY));
  if(snakeParts.length > tailLength){
    snakeParts.shift();
  }

}


function snakeShift() {
  headX = headX + xShift;
  headY = headY + yShift;
}

function drawApple() {
  ctx.fillStyle='red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
  if(appleX === headX && appleY == headY){
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    speed++;
    gulp.play()
  }
}
document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
  if(e.keyCode == 38) {
    if(yShift == 1)
    return;
    yShift = -1;
    xShift = 0;
  }
  if(e.keyCode == 40) {
    if(yShift == -1)
    return;
    yShift = +1;
    xShift = 0;
  }
  if(e.keyCode == 37) {
    if(xShift == 1)
    return;
    yShift = 0;
    xShift = -1;
  }
  if(e.keyCode == 39) {
    if(xShift == -1)
    return;
    yShift = 0;
    xShift = +1;
  }
  
}

restart.addEventListener('click', () => {
  tailLength = 2;
  score = 0;
  speed = 7;
  snakeParts = [];
  headX = 10;
  headY = 10;
  runGame()

})
runGame();
