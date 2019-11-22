// making parallax effect
var x = 0
var x2 = 0
var speed = -10

function setup() {
  createCanvas(800,600);
  noStroke();
}

function draw() {
  background(245, 235, 149);

  fill(255, 219, 77);
  ellipse(x2,450,500,300); // hill 1 layer 2
  ellipse(x2 + 400,450,500,300); // hill 2 layer 2
  ellipse(x2 + 800,450,500,300); // hill 3 layer 2

  ellipse(x2 + 800,450,500,300); // hill duplicate 1 layer 2
  ellipse(x2 + 1200,450,500,300); // hill duplicate 2 layer 2
  ellipse(x2 + 1600,450,500,300); // hill duplicate 3 layer 2

  x2 = x2 + speed * 2

  fill(252, 186, 3);
  ellipse(x,550,500,300); // hill 1
  ellipse(x + 400,550,500,300); // hill 2
  ellipse(x + 800,550,500,300); // hill 3

  ellipse(x + 800,550,500,300); // hill duplicate 1
  ellipse(x + 1200,550,500,300); // hill duplicate 2
  ellipse(x + 1600,550,500,300); // hill duplicate 3

  x = x + speed

  if (x && x2 <= -800){
    x = 0
    x2 = 0
  } // end if
}
