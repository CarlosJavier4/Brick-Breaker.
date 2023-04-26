let canvas = document.getElementById("myCanvas");
let curr = canvas.getContext("2d");

let radius = 5;

let x = canvas.width/2;
let y = canvas.height/2;

let dx = 2;
let dy = -2;

function drawBall(color) {
	curr.beginPath();
	curr.arc(x, y, radius, 0, Math.PI*2);
	curr.fillStyle = color;
	curr.fill();
	curr.closePath();
}

function moveAndDraw() {
	curr.clearRect(0, 0, canvas.width, canvas.height);
	drawBall("steelblue");

	if(x + dx > canvas.width-radius || x + dx < radius) {
      dx = -dx;
  }
  if(y + dy > canvas.height-radius || y + dy < radius) {
      dy = -dy;
  }

	x += dx;
	y += dy;
}

setInterval(moveAndDraw, 10);
