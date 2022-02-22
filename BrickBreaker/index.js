/*variable générales du canvas*/
const canvas = document.getElementById("breakOut");
const ctx = canvas.getContext("2d");
const bg = new Image();
bg.src = "./assets/bg.jpg";

/* variable de la raquette*/
const paddleWidth = 100;
const paddleHeight = 20;
const paddleMarginBottom = 50;
const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight - paddleMarginBottom,
  width: paddleWidth,
  height: paddleHeight,
  dx: 5,
};

/* variables de déplacement de la raquette*/
let leftArrow = false;
let rightArrow = false;

/*variables de la balle */
const ballRadius= 8;
const ball = {
    x : canvas.width/2,
    y : paddle.y - ballRadius,
    radius : ballRadius,
    speed : 3,
    dx: 3,
    dy: -3,
}
/* variables vies / config */

let life = 3;

/* fonctions liées à la raquette*/
function drawPaddle() {
  ctx.fillStyle = "blue";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = "#4352f4cc";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function movePaddle() {
  if (rightArrow && paddle.x + paddle.width < canvas.width) {
    paddle.x += paddle.dx;
  } else if (leftArrow && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

/*fonctions de la balle */
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.strokeStyle = "#2e3548"
    ctx.stroke();
    ctx.closePath();
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}


function ballWallCollision(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    } else if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    } else if(ball.y + ball.radius > canvas.height) {
        life--;
        resetBall()
    }
}

function resetBall(){
    ball.x = canvas.width /2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random()* 2 - 1)
    ball.dy = -3;
}


function update() {
    moveBall()
    ballWallCollision()
}

function loop() {
  ctx.drawImage(bg, 0, 0);
  drawBall()
  drawPaddle();
  update();
  requestAnimationFrame(loop);
}
loop();

/*événements au keypress de la raquette*/
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    leftArrow = true;
  } else if (e.keyCode == 39) {
    rightArrow = true;
  }
  movePaddle();
});
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    leftArrow = false;
  } else if (e.keyCode == 39) {
    rightArrow = false;
  }
});
