var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var PaddleHeight=10;
var PaddleWidth=75;
var PaddleX=(canvas.width-PaddleWidth)/2;

var rightPressed=false;
var leftPressed=false;

var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=10;
var ballColour="#0095DD";
//settingup bricks
var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
//setting up a score counter
var score=0;
//game sounds
var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');
//adding lives
var lives = 3;
//hold the bricks in place(rows and columns)
var bricks = [];
for(c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}

//function to keep score
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}

//this function adds lives
function drawLives(){
	ctx.font ="16px Arial";
	ctx.fillStyle ="#0095DD"
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML ="Lives: " + lives;
}

//this function draws bricks
function drawBricks(){
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status == 1){
			var brickX= (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY= (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle="#0095DD";
			ctx.fill();
			ctx.closePath();
			}
		}
	}
}
		
	

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(PaddleX, canvas.height-PaddleHeight, PaddleWidth, PaddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawBricks();
	drawLives();
	//bouncing the ball of 3 walls
	
	if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
		dx=-dx;
	
	}
		if(y+dy<ballRadius){
		dy=-dy;
	} else if(y+dy>canvas.height-ballRadius){
		//check if ball is hitting paddle
		if(x>PaddleX && x <PaddleX+PaddleWidth){
			dy=-dy;
		}
		else{
			lives--;
			if(!lives){
			GAMEOVER_SOUND.play();
		alert("GAME OVER");
		document.location.reload();
		}
		else{
		x = canvas.width/2;
		y = canvas.height-30;
		dx = 2;
		dy = -2;
		paddleX = (canvas.width-paddleWidth)/2;
		}
	}
}

	x += dx;
	y += dy;
	
	if(rightPressed && PaddleX<canvas.width-PaddleWidth){
	PaddleX+=7;
}
else if(leftPressed && PaddleX>0){
	PaddleX-=7;
}
	
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth/2;
	}
}

function keyDownHandler(e){
	if(e.keyCode==39){
		rightPressed=true;
	}
	else if(e.keyCode==37){
		leftPressed=true;
	}
}

function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
	}
}

//collision detection
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					SCORE_SOUND.play();
					if(score == brickRowCount*brickColumnCount){
						alert("YOU WIN, CONGRATS!!");
						document.location.reload();
					}
				}
			}
		}
	}
}	


setInterval(draw, 10);

