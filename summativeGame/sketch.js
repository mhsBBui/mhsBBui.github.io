// final task. good luck
// vars regarding how a stage will work
var stage = 0
var stageX
var stageY
// general vars for da player
var x
var y
// extra var for door scrolling.
// declare door x and y values (from order of 1 - 5, referring to doorNum)
var doorScrollX = [548,302]
var doorScrollY = [286,230]
// le obstacles have arrived
var obstacles = []
var obstacleX
var obstacleY
// electric box that's needed to end the game
var powerBox
// fun timer time
var seconds = 0
// music + sounds (btw start music can also be pause)
var stageMainMusic
var gameLogo

/*
function preload() {
  stageMainMusic = loadSound('music/stageMain.mp3');
  gameLogo = loadImage('logo.png');
}
*/

function setup() {
  createCanvas(800,600);
  textFont('Georgia', 20);
  x = width / 2
  y = height / 2

  // going to further complicate things w/ arrays, etc
  for (let i=0; i<30; i++) {
    obstacles.push(new obstacle(random(302,1102), random(230,830)));
  }

  powerBox = new elecBox(50,50);
}

function draw() {
  /* ----- START MENU ----- */
  background(0);
  // ignore stage 0 after enter is pressed
  if (stage === 0) {
    textAlign(CENTER,CENTER);
    fill(255);
    // imageMode(CENTER);
    // image(gameLogo,400,300,500,200);
    text('press ENTER to begin',400,400);

    if (keyIsPressed && keyCode === 13) {
      stage = 1
      fill(255);
      text(seconds,10,10,20,20);
    }
  }

  /* ----- STAGE 1 ----- */
  if (stage === 1) {
    // stage 1 size and display
    fill(102,102,102);
    rectMode(CENTER);
    rect(width/2,height/2,450,350);

    // display left door hitbox
    door(177,287,10,50,1);
    // display right door hitbox
    door(623,287,10,50,2);
    // display elevator hitbox
    door(381,127,60,10,3);
  }

  /* ----- STAGE 2 ----- */
  if (stage === 2) {
    // stage 2 size and display (scrolling !!!)
    fill(102,102,102);
    rectMode(CENTER);
    rect(stageX,stageY,300,850);

    // display the only door
    door(doorScrollX[0],doorScrollY[0],10,50,5);
  }

  /* ----- STAGE 3 ----- */
  if (stage === 3) {
    // stage 3 size and display (big boy stage)
    fill(102,102,102);
    rectMode(CENTER);
    rect(stageX,stageY,800,600);

    // display the only door
    door(doorScrollX[1],doorScrollY[1],10,50,4);

    for (let i=0; i < obstacles.length; i++) {
      obstacles[i].show();
      obstacles[i].move();
    }
  }

  /* ----- MAIN CHARACTER ----- */
  if (stage != 0) {
    // display protagonist hitbox
    fill(255);
    noStroke();
    rect(x,y,20,20);
    controls();

    timer();
    text(seconds,20,20)

    // if you reach the end, player go bye bye
    if (stage === 4) {
      background(0);
    }
    /*
    // le song has arrived
    if (stageMainMusic.isPlaying()) {
      stageMainMusic.stop
    } // end if
    else {
      stageMainMusic.play();
    }
    */

    print('stage pos:', stageX, stageY, 'player pos:', x, y);
  }

  /* ----- END SCREEN ----- */
  if (stage === 4) {
    background(95, 217, 65);
    text('On to the next floor... \n\nThanks for playing! \n Press ENTER to play again',400,300);

    // restart
    if (keyIsPressed && keyCode === 13) {
      x = width/2
      y = height/2
      stage = 1
      seconds = 0
    }
  }

  /* ----- PAUSE MENU ----- */
  if (stage === 5) {

  }

  /* ----- GAME OVER ----- */
  if (stage === 6) {

  }
}

function timer() {
  if (frameCount%60 === 0) {
    seconds+=1
  } // end if
}

// going to implement all of the movements, attacks, etc.
// ***REMINDER*** : print all of the Xs and Ys to find out about the collision
function controls() {
  // slowed movement if shift is pressed; crouch
  if (keyIsDown(16)) {
    // up slowness
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      y+=2.5
    } // end if
    // left slowness
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      x+=2.5
    } // end if
    // right slowness
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      x-=2.5
    } // end if
    // down slowness
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      y-=2.5
    } // end if
  }

  // this gon be da scrolling stage code
  // right
  if (stage != 1) {
    if (x >= 600) {
      x-=5
      // check whether or not to scroll objects of stage 2 or 3
      if (stage === 2) {
        stageX-=5
        doorScrollX[0]-=5
      }
      else if (stage === 3 && stageX >= 210) {
        stageX-=5
        doorScrollX[1]-=5
      }
    } // end if
    // bottom
    if (y >= 400) {
      y-=5
      if (stage === 2 && stageY >= -19) {
        stageY-=5
        doorScrollY[0]-=5
      }
      else if (stage === 3 && stageY >= 110) {
        stageY-=5
        doorScrollY[1]-=5
      }
    } // end if
    // left
    if (x <= 200) {
      x+=5
      if (stage === 2) {
        stageX+=5
        doorScrollX[0]+=5
      }
      else if (stage === 3 && stageX <= 590) {
        stageX+=5
        doorScrollX[1]+=5
      }
    } // end if
    // top
    if (y <= 200) {
      y+=5
      if (stage === 2 && stageY <= 615) {
        stageY+=5
        doorScrollY[0]+=5
      }
      else if (stage === 3 && stageY <= 490) {
        stageY+=5
        doorScrollY[1]+=5
      }
    } // end if
  }

  // trial n error type thing below (w/ the wasd/arrow controls)
  if (stage === 1) {
  // all stage 1 below
    // moving up, top wall collision
    wasd(1, 132, UP_ARROW, 87);
    // moving left
    wasd(1, 184, LEFT_ARROW, 65);
    // moving right
    wasd(1, 618, RIGHT_ARROW, 68);
    // moving down
    wasd(1, 468, DOWN_ARROW, 83);
  } // end if
  if (stage === 2) {
  // all stage 2 below
    //top wall collision
    wasd(2, 147, UP_ARROW, 87);
    // moving left
    wasd(2, 258, LEFT_ARROW, 65);
    // moving right
    wasd(2, 541, RIGHT_ARROW, 68);
    // moving down
    wasd(2, 418, DOWN_ARROW, 83);
  } // end if
  if (stage === 3) {
  /* all stage 3 below (since there is no side that's stationary,
  have to code it out w/ the stageX instead of this) */
    //top wall collision
    wasd(3, 0, UP_ARROW, 87); // 215
    // moving left
    wasd(3, 0, LEFT_ARROW, 65); // 312
    // moving right
    wasd(3, 800, RIGHT_ARROW, 68); // 580
    // moving down
    wasd(3, 600, DOWN_ARROW, 83); // 382
  } // end if
}

// meant to be a template for the different types of stages
function wasd(stageNum, collideLimit, Direction, DirectionV2) {
  if (keyIsDown(Direction) || keyIsDown(DirectionV2)) {
    // checks whether or not to subtract or add into the y or x
    if (Direction === DOWN_ARROW) {
      y+=5
      // stage collision
      if (stage === stageNum && y >= collideLimit) {
        y-=5
      } // end if
    } // end if

    if (Direction === RIGHT_ARROW) {
      x+=5
      // stage collision
      if (stage === stageNum && x >= collideLimit) {
        x-=5
      } // end if
    } // end if

    if (Direction === LEFT_ARROW) {
      x-=5
      // stage collision
      if (stage === stageNum && x <= collideLimit) {
        x+=5
      } // end if
    } // end if

    if (Direction === UP_ARROW) {
      y-=5
      // stage collision
      if (stage === stageNum && y <= collideLimit) {
        y+=5
      } // end if
    } // end if
  } // end if
}

function nextStage(doorNum) {
  /* ok actually check which room, then which door, etc
  (position is wack, it's dispositioned) */
  // left
  if (doorNum === 1) {
    stage = 2
    x = 500
    y = height/2
    stageX = 400
    stageY = 0
  }

  // right
  if (doorNum === 2) {
    stage = 3
    x = 350
    y = 245
    stageX = 700
    stageY = 500
  }

  // up (end)
  if (doorNum === 3) {
    stage = 4
  }

  // left (stage 3)
  if (doorNum === 4) {
    stage = 1
    x = 590
    y = height / 2
    doorScrollY[1] = 230
    doorScrollX[1] = 302
  }

  // left (stage 2)
  if (doorNum === 5) {
    stage = 1
    x = 215
    y = height / 2
    doorScrollY[0] = 286
  }
}

// x, y, width, height for a door
function door(xDoor, yDoor, wDoor, hDoor, doorNum) {
  // note: you can't have a class to door this, because I need to transfer specific door data

  // door collision setup w/ avaliable dimensions
  var trigger = false
  trigger = collideRectRect(x,y,20,20,xDoor,yDoor,wDoor,hDoor);

  // display door
  fill(0,255,0);
  /* since the hitbox is off by a little (and i can't change it for some reason),
  i drew the hitbox where it's supposed to be */
  if (doorNum === 1 || doorNum === 2) {
    rect(xDoor, yDoor + 13, wDoor, hDoor);
  }
  if (doorNum === 3) {
    rect(xDoor + 19, yDoor, wDoor, hDoor);
  }
  if (doorNum === 4 || doorNum === 5) {
    rect(xDoor, yDoor + 15, wDoor, hDoor);
  }

  // if collision occurs, activate next stage
  if (trigger === true) {
    nextStage(doorNum);
  }
}

// this will construct and display the electric box needed to activate the end
function elecBox(boxX, boxY) {
  rect(boxX,boxY,40,40);
  if (stage === 2) {
    fill()
    rect()
  }
  if (stage === 3) {

  }
}

// obs refers to obstacles
class obstacle {
  constructor(obsX, obsY) {
    this.x = obsX
    this.y = obsY
    this.size = random(10,25);
  }

  /* y'know what? since i have almost no time left, i'm gonna make the obstacles a bunch of enemies
  blocking your path to the goal, with a set timer and maybe health */
  move() {
    if (stage != 1) {
      if (x >= 600) {
        // check whether or not to scroll objects of stage 2 or 3
        if (stage === 2) {
          this.x-=5
        }
        else if (stage === 3 && stageX >= 210) {
          this.x-=5
        }
      } // end if
      // bottom
      if (y >= 400) {
        if (stage === 2 && stageY >= -19) {
          this.y-=5
        }
        else if (stage === 3 && stageY >= 110) {
          this.y-=5
        }
      } // end if
      // left
      if (x <= 200) {
        if (stage === 2) {
          this.x+=5
        }
        else if (stage === 3 && stageX <= 590) {
          this.x+=5
        }
      } // end if
      // top
      if (y <= 200) {
        if (stage === 2 && stageY <= 615) {
          this.y+=5
        }
        else if (stage === 3 && stageY <= 490) {
          this.y+=5
        }
      } // end if
    } // end if
  }

  show() {
    strokeWeight(3);
    stroke(179, 37, 37);
    fill(207, 50, 50);
    ellipse(this.x, this.y, this.size);
  }
}
