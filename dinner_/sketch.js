function setup() {
  createCanvas(800,600);
}

function draw() {
  background(186, 145, 20); // wooden table
  ellipse(200, 200, 350, 350); // plate
  ellipse(200, 200, 300, 300);

  noStroke();
  fill(255, 140, 0); // dorito
  triangle(84, 195, 198, 179, 123, 108);

  fill(125, 69, 20); // cake
  rect(136, 204, 150, 81);

  strokeWeight(10); // cake frosting
  stroke(82, 42, 7);
  line(137,222,285,222);
  line(137,246,285,246);
  line(137,269,285,269);
}
