let canvas = document.getElementById("myCanvas");
let curr = canvas.getContext("2d");
let radius = 6;

/*Step*/
let x = canvas.width/2;
let y = canvas.height/2;
let dx = 2, dy = -2;


let color = ["lime", "darkcyan"];

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawPaddle(selectColor) {
    curr.beginPath();
    curr.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    curr.fillStyle = selectColor;
    curr.fill();
    curr.closePath();
}

function drawBall(selectColor) {
	curr.beginPath();
	curr.arc(x, y, radius, 0, Math.PI*2);
	curr.fillStyle = selectColor;
	curr.fill();
	curr.closePath();
}

function moveAndDraw() {
	curr.clearRect(0, 0, canvas.width, canvas.height);
	drawPaddle();
	drawBall();

	if(x + dx > canvas.width-radius || x + dx < radius) {
        dx = -dx;
        
    }
    if(y + dy > canvas.height-radius || y + dy < radius) {
        dy = -dy;
        pos = Math.floor(Math.random()*3);
        drawBall(color[pos]);
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

	x += dx;
	y += dy;
}

drawBall("steelblue");
setInterval(moveAndDraw, 10);
