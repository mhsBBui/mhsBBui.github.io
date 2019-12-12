// making pong...

// global vars
// ball vars
var ballX = 405
var ballY = 300
var ballSize = 15
// ball movement
var xSpeed = 3
var ySpeed = 3
// paddle vars (could add x, height, width for extra features)
var p1Y = 300
var p2Y = 300
// easing for movement of paddle
var easing = .05
// collision
var p1hit = false
var p2hit = false
// keyboard action vars
var p1targetY = 300
var p2targetY = 300
// score vars
var p1score = 0
var p2score = 0
// height var
var h = 70
// start text lol
var startTextY = 340

function setup() {
  createCanvas(800,600);
}

function draw() {
  background(0);
  pongScore();
  moveBall();
  bounce();
  drawBall();
  playerPaddles();
  hitPaddle();
  movePaddle();
}

function playerPaddles() {
  strokeWeight(2);
  stroke(237, 108, 85);
  rect(16,p1Y,6,h);
  stroke(108, 180, 240);
  rect(774,p2Y,6,h);
}

function moveBall() {
  strokeWeight(10);
  stroke(0);
  fill(255);
  textSize(15);
  text('Press any KEY to start', 330, startTextY);

  if (keyCode) {
    ballX = ballX + xSpeed
    ballY = ballY + ySpeed
    startTextY = 1000
  }
  print(startTextY);
}

function bounce() {
  if (ballX >= 792.5 || ballX <= 7.5 || keyCode === 82) {
    ballX = 405
    ballY = 300
    randomXspeed = [3,-3] // choose between 3 and -3
    xSpeed = random(randomXspeed);
    ySpeed = 3
    h = 70
  } // end if (x)
  if (ballY >= 592.5 || ballY <= 7.5) {
    ySpeed = -ySpeed
  } // end if (y)
}

function drawBall() {
  strokeWeight(2);
  if (ballX >= 400) {
    stroke(108, 180, 240);
  }
  else {
    stroke(237, 108, 85);
  }
  fill(0);
  ellipse(ballX,ballY,ballSize);
}

function hitPaddle() {
  // if ball hit paddle, bounce
  p1hit = collideRectCircle(16,p1Y,6,h,ballX,ballY,ballSize);
  p2hit = collideRectCircle(774,p2Y,6,h,ballX,ballY,ballSize);

  if (p1hit === true || p2hit === true) {
    xSpeed = -xSpeed
    xSpeed = xSpeed * 1.05
    ySpeed = ySpeed * 1.05
    h = h / 1.05
  }
}

function movePaddle() {
  // player 1
  if (keyIsDown(83) && p1Y <= 600) {
    p1targetY = p1targetY + 10
  }
  else if (keyIsDown(87) && p1Y >= 0) {
    p1targetY = p1targetY - 10
  }
  var p1dx = p1targetY - p1Y
  p1Y += p1dx * easing

  // player 2
  if (keyIsDown(DOWN_ARROW) && p2Y <= 600) {
    p2targetY = p2targetY + 10
  }
  else if (keyIsDown(UP_ARROW) && p2Y >= 0) {
    p2targetY = p2targetY - 10
  }
  var p2dx = p2targetY - p2Y
  p2Y += p2dx * easing
}

function pongScore() {
  if (ballX > 789) {
    p1score = p1score + 1
  }
  else if (ballX < 11) {
    p2score = p2score + 1
  }

  // score display
  fill(0);
  textSize(20);

  stroke(108, 180, 240); // bleu
  rect(408,0,1,600);
  fill(134, 192, 240);
  text(p2score,430,40);

  stroke(237, 108, 85); // red
  rect(403.5,0,1,600);
  fill(230, 122, 103);
  text(p1score,370,40);

  stroke(0); // noir
  rect(405,0,2,600);
}
