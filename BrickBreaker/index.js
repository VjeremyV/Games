/*variable générales du canvas*/
const canvas = document.getElementById("breakOut");
const ctx = canvas.getContext("2d");
const bg = new Image();
bg.src = "./assets/bg.jpg";
const scoreImg = new Image();
scoreImg.src = "./assets/star.png";
const flag = new Image();
flag.src = './assets/flag.png';
const heart = new Image();
heart.src = "./assets/heart.png"
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
const ballRadius = 8;
const ball = {
  x: canvas.width / 2,
  y: paddle.y - ballRadius,
  radius: ballRadius,
  speed: 3,
  dx: 3,
  dy: -3,
};
/* variables vies / config */
let level = 1;
const maxLevel = 3;
let life = 3;
let score = 0;
const scoreUnit = 10;
let gameOverState = false;
let isLevelDone = true;
/* variables des briques*/
const brick = {
  row: 3,
  column: 5,
  width: 55,
  height: 20,
  offSetLeft: 20,
  offSetTop: 20,
  marginTop: 40,
  fillColor: "black",
  strokeColor: "#fff",
};
let bricks = [];

/* fonction pour les briques*/
function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          r * (brick.offSetTop + brick.height) +
          brick.marginTop +
          brick.offSetTop,
        status: true,
      };
    }
  }
}
createBricks();

function drawBricks() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      if (b.status) {
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(
          bricks[r][c].x,
          bricks[r][c].y,
          brick.width,
          brick.height
        );
      }
    }
  }
}

function brickBallCollision() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      if (b.status) {
        if (
          ball.x + ball.radius > b.x &&
          ball.x - ball.radius < b.x + brick.width &&
          ball.y + ball.radius > b.y &&
          ball.y - ball.radius < b.y + brick.height
        ) {
          b.status = false;
          ball.dy = -ball.dy;
          score += scoreUnit;
        }
      }
    }
  }
}
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
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function ballPaddleCollision() {
  if (
    ball.y > paddle.y &&
    ball.y < paddle.y + paddle.height &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    let collidePoint = ball.x - (paddle.x + paddle.width / 2);
    collidePoint = collidePoint / (paddle.width / 2);
    let angle = (collidePoint * Math.PI) / 3;
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}

function ballWallCollision() {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  } else if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.radius > canvas.height) {
    life--;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = paddle.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}
/* fonction affichage des stats*/
function showStats(text, textX, textY, img, imgX, imgY) {
  ctx.fillStyle = "#fff";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);
  ctx.drawImage(img, imgX, imgY, 25, 25);
}

/* gameover*/
function gameOver() {
  if (life <= 0) {
    gameOverState = true;
  }
}

/* level up*/

function levelUp() {
  let isLevelDone = true;
  for(let r = 0; r < brick.row; r++) {
    for(let c = 0; c < brick.column; c++) {
      isLevelDone = isLevelDone && ! bricks[r][c].status;
    }
  }
  if (isLevelDone) {
    if (level > maxLevel) {
      gameOverState = true;
      return;
    }
    brick.row++;
    createBricks();
    ball.speed += 0.5;
    resetBall();
    level++;
  }
}

/*fonctions générales du jeu*/

function update() {
  levelUp();
  gameOver();
  brickBallCollision();
  ballPaddleCollision();
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
}

function draw() {
  showStats(score, 35, 25, scoreImg, 5, 5);
  showStats(
    life,
    canvas.width - 25,
    canvas.height - 25,
    heart,
    canvas.width - 55,
    canvas.height - 45
  );
  showStats(level, 35, canvas.height - 25, flag, 5, canvas.height - 45);
  drawBall();
  drawPaddle();
  drawBricks();
}

function loop() {
  ctx.drawImage(bg, 0, 0);
  draw();
  update();
  if (!gameOverState) {
    requestAnimationFrame(loop);
  }
}

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
  movePaddle();
});

loop();
