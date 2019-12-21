/*
We will initially set the level variable to 0
Level 0 --> Instructions
Level 1 --> Game
Level 2 --> Win Screen
*/
var level = 0

//Create the x and y variables for our character
var x
var y

//Create a variable that will store our image
var img

// gravity + velocity in y
var velocity = 0
var gravity = .2
// vars below are meant to be collision w/ ground
var groundHit = false
// bounce check
var bounceCount = 0
// cancels continuous jump, instead limited jump
var singleTickJump = 0

// cancels continuous dash, you get the gist (oh yeah im making a dash)
var singleTickDash = 0
var easing = .1
var targetX = 400
// cancels all actions until dash is done
var keyCancel = false
var dashCooldown = 0
// idk why but space continues to be true when released. var to cancel after cooldown
var spaceCancel = false
var spaceCancelCooldown = 0

// hit vars for obstacles
var hit1Rect1 = false
var hit2Rect1 = false
var hit1Rect2 = false
var hit2Rect2 = false

function preload() {
  //Assign the image file to the variable
  img = loadImage('deadMeme.jpg');
}

function setup() {
  // put setup code here
  //Create the canvas
  createCanvas(800,600);

  //Assign the initial values for x and y
  x = 100;
  y = height/2;

  textFont('Georgia',20);

}

function draw() {
  // put drawing code here


/*--------------------INSTRUCTIONS--------------------*/
  if (level ===0) {
    //Show the instructions to the user
    noStroke();
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('SPEEDRUN', width/2, height/2);
    textSize(16);
    text('You are being chased by the IRS. \nSprint to the end as fast as you can, before you are captured.', width/2, height/2+50);
    fill(255,0,0);
    text('PRESS ENTER TO CONTINUE', width/2, height/2+100);

    //If they press enter, move to the next level (game)
    if (keyIsDown(ENTER)) {
      level+=1;
    }
  }
  /*--------------------END INSTRUCTIONS--------------------*/


  /*--------------------GAME--------------------*/
  else if (level ===1) {

    hit1Rect1 = collideRectRect(x,y,30,30,400,500,10,100);
    hit1Rect2 = collideRectRect(x,y,30,30,400,0,10,400);
    gamer();

    // obstacles
    fill(0);
    stroke(224, 58, 58);
    rect(400,500,10,100);
    rect(400,0,10,400);
  }

  else if (level ===2) {
    hit1Rect1 = collideRectRect(x,y,30,30,400,-190,10,600);
    hit1Rect2 = collideRectRect(x,y,30,30,400,465,10,600);
    gamer();

    // obstacles
    fill(0);
    stroke(224, 58, 58);
    rect(400,-190,10,600);
    rect(400,465,10,600);
  }
  /*--------------------END GAME--------------------*/

  /*--------------------WIN SCREEN--------------------*/
  else if (level===3) {
    //Change the backround and inform the user that they won
    background(255);
    noStroke();
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('You escaped the IRS! For now.', width/2, height/2);
    textSize(16);
    text('Press enter to play again', width/2, height/2+50);
    image(img,295,390);

    //If the user presses enter, reset the x and y value and reset the level to level 1 (game)
    if (keyIsDown(ENTER)) {
      x=100
      y=height/2;
      level=1;
    }
  }
  /*--------------------END WIN SCREEN--------------------*/
}

function gamer() {
  // collision check
  groundHit = collideRectRect(x,y,30,30,-1,550,802,600);

  // adding the ground as to stop character from falling
  fill(0);
  background(0);
  noStroke();
  rect(-1,550,802,600);
  // false ground, making it look like player isn't inside the ground.
  stroke(83, 183, 237);
  rect(-1,554,802,600);
  // destination of cube after dash
  noStroke();
  ellipse(targetX,y + 13,8,8);

  //Change the background and add the character
  stroke(255);
  rect(x,y,30,30);

  // adding gravity and velocity to the character
  if (groundHit === true) {
    if (bounceCount < 5) {
     velocity=-velocity
     velocity/=2
     y-=velocity
     bounceCount+=1
     singleTickJump = 0
    }
    else {
      velocity = 0
    }
  }
  else {
    velocity-=gravity
    y-=velocity
  }

  //Move the character based on input from the user (arrow keys)
  if (keyCancel === true) {
    // cooldown
    dashCooldown+=1
    if (dashCooldown >= 29) {
      keyCancel = false
      spaceCancel = true
      dashCooldown = 0
    } // end if
  } // end if

  else {
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      x+=9
      targetX = x + 180
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      x-=9
      targetX = x - 180
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87) && singleTickJump === 0) {
      bounceCount = 0
      velocity=6
      y-=velocity
      singleTickJump+=1
    }
  }

  // going to add a dash feature
  var dashDX = targetX - x
    if (keyCode === 32 && spaceCancel === false) {
        keyCancel = true
        x += dashDX * easing
    }
  // differetnt timer for da space cancel lol
  if (spaceCancel === true) {
    spaceCancelCooldown+=1
    if (spaceCancelCooldown >= 10) {
      spaceCancel = false
      spaceCancelCooldown = 0
    }
  }

  //If the user leaves the screen, they win so move on to the next level (win)
  if (x>width) {
    x = 100
    level+=1
  }
  // canoot go through left side tho
  if (x<0) {
    x+=9
  }
  // also death = restart
  if (hit1Rect1 === true || hit1Rect2 === true || hit2Rect1 === true || hit2Rect2 === true) {
    x = 100
  }

  print('cooldown', dashCooldown);
  print('key cancel', keyCancel, 'space cancel', spaceCancel);

  // instructions
  noStroke();
  fill(255);
  text('WASD or ARROW KEYS to move', 200, height/2)
  text('SPACE to dash', 600, height/2)

}
