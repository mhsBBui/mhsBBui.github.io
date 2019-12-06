/* this will generate 4 rectangulars that'll continuously
scroll downward. once near the hitbox, if a specific key
is pressed or if it reaches the bottom, it'll reset its
position to 0. like a rhythym game. i am too addicted to
this genre */

// global vars for scrolling each rectangular
var y = 20
var y2 = 20
var y3 = 20
var y4 = 20
var timer = 0

function setup() {
  createCanvas(800,600);
}

function draw() {
  background(0);

  // text format
  textSize(10);

  // stationary hitboxes? yes
  // first hitbox
  noStroke();
  fill(20);
  rectangular(310,240,500);
  fill(0);
  stroke(247, 62, 62);
  rectangular(310,500,10);
  text('D',310,520);
  // second hitbox
  noStroke();
  fill(20);
  rectangular(370,240,500);
  fill(0);
  stroke(252, 186, 3);
  rectangular(370,500,10);
  text('F',370,520);
  // third hitbox
  noStroke();
  fill(20);
  rectangular(430,240,500);
  fill(0);
  stroke(12, 129, 245);
  rectangular(430,500,10);
  text('J',430,520);
  // fourth hitbox
  noStroke();
  fill(20);
  rectangular(490,240,500);
  fill(0);
  stroke(55, 222, 89);
  rectangular(490,500,10);
  text('K',490,520);

  // executes loopy loop
  scrollLoop(random(1,4));

  // shows timer on console
  print('timer:', timer);
}

function rectangular(x,y,height) {
  rectMode(CENTER);
  rect(x,y,50,height);
}

function scrollLoop(randomNUM) {
  // scrolling rectangulars
  noStroke();
  fill(247, 62, 62);
  rectangular(310,y,10);
  fill(252, 186, 3);
  rectangular(370,y2,10);
  fill(12, 129, 245);
  rectangular(430,y3,10);
  fill(55, 222, 89);
  rectangular(490,y4,10);

  // scroll speed
  if (randomNUM = 1) {
    y = y + 5
  } // end if
  if (randomNUM = 2) {
    y2 = y2 + 5
  } // end if
  if (randomNUM = 3) {
    y3 = y3 + 5
  } // end if
  if (randomNUM = 4) {
    y4 = y4 + 5
  } // end if

  // reset position
  if (y > 600) {
    y = 0
  } // end if
  if (y2 > 600) {
    y2 = 0
  } // end if
  if (y3 > 600) {
    y3 = 0
  } // end if
  if (y4 > 600) {
    y4 = 0
  } // end if

  // spawn per designated time (once i figure out how to delay stuff)
  timer = timer + 1
  if (timer > 100) {
    timer = 0
  }
}

function keyPressed() {
  // first rectangular (d key)
  if (y >= 485) {
    if (keyCode === 68) {
      y = 0
    }
  } // end if
  // second rectangular (f key)
  if (y2 >= 485) {
    if (keyCode === 70) {
      y2 = 0
    }
  } // end if
  // third rectangular (j key)
  if (y3 >= 485) {
    if (keyCode === 74) {
      y3 = 0
    }
  } // end if
  // fourth rectangular (k key)
  if (y4 >= 485) {
    if (keyCode === 75) {
      y4 = 0
    }
  } // end if
}
