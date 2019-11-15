
function setup() {
  createCanvas(800,600, WEBGL); // also enables 3D primitives (z)
  strokeWeight(3);
  slider = createSlider(170,400,200);
  slider.position(620,10);
  slider.size(140);
}

function draw() {
  var houseH = slider.value() - 100; // height
  var houseW = slider.value(); // width
  var houseD = slider.value(); // depth

  // in all honesty, the slider ruins the scaling.
  // just change the code for better effect

  background(199, 218, 240);
  rotateX(100); // rotates vertically, Y = horizontal
  rotateY(frameCount * .01); // continuously rotates EVERYTHING.

  push();
  translate(abs(houseW) - 40,18,36);
  stroke(0,0,0);
  fill(255,255,255);
  box(houseW / 2.5,1,houseD - 150);
  box(1, houseH / 3,houseD - 150);
  box(houseW / 2.5,houseH / 3,houseD - 150); // window
  pop();

  push();
  translate(10,15,houseD / 2);
  fill(0,0,0);
  sphere(4); // doorknob
  pop();

  push();
  translate(0,15,77);
  stroke(252,252,252);
  fill(242, 242, 242);
  box(houseW / 4,houseH - 30,houseD - 150); // door
  pop();

  stroke(160, 160, 160);
  fill(181, 181, 181);
  box(houseW,houseH,houseD); // middle box

  push();
  translate(abs(houseW) - 40,18,0);
  box(houseW - 80,houseH - 30,houseD - 80); // box side
  pop();

  push();
  translate(0,abs(houseH) * -1,0);
  rotateX(600.045);
  rotateY(0.78125);
  stroke(145, 122, 115);
  fill(161, 135, 127);
  cone(houseW - 30,houseH,4,0); // roof
  pop();

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
