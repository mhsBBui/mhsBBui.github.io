// create var for size of ellipse
size = 10

function setup() {
  createCanvas(800,600);
}

function draw() {
  background(255,255,255,10);

  // use 2 new vars ---> mouseX/mouseY
  line(400,300,mouseX,mouseY)

  // draw ellipse at mouse location
  if (mouseIsPressed) {
    fill(random(0,255),random(0,255),random(0,255));
    ellipse(mouseX,mouseY,size);
  }
}

// have program react to mouse click
function mousePressed() {
  fill(random(0,255),random(0,255),random(0,255));
  size = size + 20
}

function mouseReleased() {
  size = size - 20
}
