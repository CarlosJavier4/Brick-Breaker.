var randomMove = [[2, -2], [4, -3], [-2, -3], [-4, 5], [4, -7], [3, 2]];
var colorRandom = ["crimson", "lime", "steelblue", "black", "white"];

var color = "steelblue";
var pos = 0; // Movimiento random;

var canvas=document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
var ballRadius=10;
//to move

var x=canvas.width/2, y=canvas.height-30;
var pos = Math.floor(Math.random() * 5);
var dx = randomMove[0][0], dy = randomMove[0][1];

// Barra inferior

var paddleHeight=10;
var paddleWidth=100;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

// Ladrillos

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Score, level and life
var score = 0;
var level = 1;
var life = 3;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

var bricks = [];
function clearStatusBrick() {
    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
             bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function keyDownHandler(e){
	if(e.keyCode == 39){
		    rightPressed=true;
	}
	else if(e.keyCode == 37){
		    leftPressed=true;
	}	
}
	
function keyUpHandler(e){
	
	if(e.keyCode == 39){	
		rightPressed=false;
	}
	else if(e.keyCode == 37){
	    leftPressed=false;	
	}
}

/// Dibujar

// Textos
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Lv: " + level, 400, 20);
}

function drawLife() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Live: " + life, 8, canvas.height-5);
}

//Pelota

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillstyle = color;
	ctx.fillStroke = color;
	ctx.Stroke="10";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillstyle = color;
	ctx.fill();
	ctx.closePath();
}

/// Ladrillos.

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

var flagLvFinished = false;

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    ++score;
                    if(score == brickRowCount * brickColumnCount) {
                        pos = Math.floor(Math.random() * 6);
                        color = colorRandom[Math.floor(Math.random() * 5)];
                        dx = randomMove[pos][0];
                        dy = randomMove[pos][1];
                        ++level;
                    }
                }
            }
        }
    }
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
    drawBricks();
	drawBall();
	drawPaddle();
    drawScore();
    drawLevel();
    drawLife();

	collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y = y-paddleHeight){
                dy = -dy  ;
                if(score == brickRowCount * brickColumnCount) {
                    clearStatusBrick();
                    drawBricks();
                    score = 0;
                }
			 }
        }
        else {
            life--;
            if(!life) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
	if(rightPressed && paddleX<canvas.width-paddleWidth){
		
		paddleX += 9;
	}
	else if(leftPressed && paddleX>0 ){
		paddleX -= 9; 
	}
		 
	x += dx;
	y += dy;
}

clearStatusBrick();

setInterval(draw,10);
