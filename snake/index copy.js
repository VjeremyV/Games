const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
// const img = new Image();
// img.src = "./assets/grass.png";
let speed = 7;
let tileCount = 20;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock -2;
// let tileCount = 20;
// let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;
let xMove = 0;
let yMove = 0;
let appleX = 5;
let appleY = 5;
// console.log(appleX);
function runGame(){
  clearScreen();
  changePosition();
  checkAppleCollision();
  drawApple();
  drawSnake();
  setTimeout(runGame, 1000/speed);
};

function clearScreen() {
// ctx.drawImage(
//     img,
//     0,
//     0,
//     canvas.width,
//     canvas.height,
//     0,
//     0,
//     canvas.width,
//     canvas.height
//   );
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function drawSnake() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(headX * tileBlock, headY * tileBlock, tileSize, tileSize)
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX* tileBlock, appleX * tileBlock, tileSize, tileSize)
}

function changePosition() {
  headX = headX + xMove;
  headY = headY + yMove;
}


function checkAppleCollision() {
  if(appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
// console.log(appleX);
  }
}




function keyDown(e) {
  // console.log(headX);

// switch(e.code){
//   case'ArrowUp' :
//   xMove = 0;
//   yMove = -1;
//   break;
//   case'ArrowDown' :
//   xMove = 0;
//   yMove = +1;
//   break;
//   case'ArrowLeft' :
//   xMove = -1;
//   yMove = 0;
//   break;
//   case'ArrowRight' :
//   xMove = +1;
//   yMove = 0;
//   break;
//   default:
//   console.log('err');
// }
  if(e.keyCode == 38){
    if(yMove == 1)
    return;
    xMove = 0;
    yMove = -1;
  } 
  if(e.keyCode == 40){
    if(yMove == -1)
    return;
    xMove = 0;
    yMove = +1;
  }
  if(e.keyCode == 37){
    if(xMove == 1)
    return;
    xMove = -1;
    yMove = 0;
  }
  if(e.keyCode == 39){
    if(xMove == -1)
    return;
    xMove = +1;
    yMove = 0;
  }
//ArrowUp/ArrowDown/ArrowLeft/ArrowRight
}

document.body.addEventListener('keydown', keyDown)
runGame();
