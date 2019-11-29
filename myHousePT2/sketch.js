
function setup() {
  createCanvas(800,600, WEBGL); // also enables 3D primitives (z)
  strokeWeight(3);
}

function draw() {
  background(199, 218, 240);

  rotateX(100); // rotates EVERYTHING vertically, Y = horizontal
  rotateY(frameCount * .01); // continuously rotates EVERYTHING.

  // enter house code here
  drawNeighbourhood(150,100,0,0);

  push();
  translate(-500,-200,-500);
  noStroke();
  fill(255, 217, 0);
  sphere(20); // sun
  pop();

  push(); // always be last
  translate(0,400,0);
  setAttributes('antialias', true);
  noStroke();
  fill(121, 214, 13);
  box(6000,500,6000); // ground
}

function drawHouse(houseW, houseH, x, z) {

  push();
  translate((abs(houseW) - 30) + x,18,z + 36);
  stroke(0,0,0);
  fill(255,255,255);
  box(houseW / 2.5,1,houseW - 150);
  box(1, houseH / 3,houseW - 150);
  box(houseW / 2.5,houseH / 3,houseW - 150); // window
  pop();

  push();
  translate(x + 10,15,z + houseW / 2);
  fill(0,0,0);
  sphere(4); // doorknob
  pop();

  push();
  translate(x,15,z + 77);
  stroke(252,252,252);
  fill(242, 242, 242);
  box(houseW / 4,houseH - 30,houseW - 150); // door
  pop();

  push();
  translate(x,0,z);
  stroke(160, 160, 160);
  fill(181, 181, 181);
  box(houseW,houseH,houseW); // middle box
  pop();

  push();
  translate((abs(houseW) - 30) + x,18,z);
  stroke(160, 160, 160);
  fill(181, 181, 181);
  box(houseW - 62,houseH - 30,houseW - 80); // box side
  pop();

  push();
  translate(x,abs(houseH) * -1,z);
  rotateX(600.045);
  rotateY(0.78125);
  stroke(145, 122, 115);
  fill(161, 135, 127);
  cone(houseW - 30,houseH,4,0); // roof
  pop();
}

function drawBlock(houseW, houseH, x, z) {
  drawHouse(houseW, houseH, x, z);
  drawHouse(houseW, houseH, x + 300, z);
  drawHouse(houseW, houseH, x - 300, z);
  drawHouse(houseW, houseH, x + 300, z);
}

function drawNeighbourhood(houseW, houseH, x, z) {
  drawBlock(houseW, houseH, x, z);
  drawBlock(houseW, houseH, x + 300, z + 300);
  drawBlock(houseW, houseH, x, z + 600);
  drawBlock(houseW, houseH, x - 300, z + 900);
  drawBlock(houseW, houseH, x - 300, z - 300);
  drawBlock(houseW, houseH, x, z - 600);
}
