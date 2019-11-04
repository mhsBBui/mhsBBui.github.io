function setup() {
createCanvas(400,400,)
}

function draw() {
  rect(0,360,400,50); // ground
  ellipse(200, 300, 150, 150); // head
  ellipse(200, 200, 100, 100); // body
  ellipse(200, 120, 75, 75); // bottom
  line(160,190,60,60); // left arm
  line(240,190,360,60); // right arm
}
