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
	//bouncing the ball of 3 walls
	
	if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
		dx=-dx;
	
	}
	x += dx;
	y += dy;

	if(y+dy<ballRadius){
		dy=-dy;
	} else if(y+dy>canvas.height-ballRadius){
		//check if ball is hitting paddle
		if(x>PaddleX && x <PaddleX+PaddleWidth){
			dy=-dy;
		}
		else{
		alert("GAME OVER");
		x=canvas.width/2;
		y=canvas.height-30;
		document.location.reload();
	}
	}
	if(rightPressed && PaddleX<canvas.width-PaddleWidth){
	PaddleX+=7;
}
else if(leftPressed && PaddleX>0){
	PaddleX-=7;
}
	
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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


setInterval(draw, 10);

