let canvas = document.getElementById("myCanvas");
let curr = canvas.getContext("2d");
let radius = 6;

/*Step*/
let x = canvas.width/2;
let y = canvas.height/2;
let dx = 2, dy = -2;


let color = ["tomato", "steelblue", "firebrick", "darkcyan"];

function drawBall(selectColor) {
	curr.beginPath();
	curr.arc(x, y, radius, 0, Math.PI*2);
	
	curr.fillStyle = selectColor;

	curr.fill();
	curr.closePath();
}

function moveAndDraw() {
	curr.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();

	if(x + dx > canvas.width-radius || x + dx < radius) {
        dx = -dx;
        pos = Math.floor(Math.random()*3);
        drawBall(color[pos]);
    }
    if(y + dy > canvas.height-radius || y + dy < radius) {
        dy = -dy;
        pos = Math.floor(Math.random()*3);
        drawBall(color[pos]);
    }

	x += dx;
	y += dy;
}

drawBall("steelblue");
setInterval(moveAndDraw, 10);
