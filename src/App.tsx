import React from "react"
import "./App.css"
import { IntervalGameLoop } from "./GameLoop"




interface circle extends position
{
	radius: number
}

interface rectangle extends position, size
{

}

export interface position
{
	x: number,
	y: number
}

export interface size
{
	width: number
	height: number
}



const canvas: HTMLCanvasElement = document.getElementById( "canvas" ) as HTMLCanvasElement,
      ctx                       = canvas.getContext( "2d" )!

const loop = new IntervalGameLoop( 10 )

loop.subscribe( render )


loop.start()

let keyPressed = {
	left:  false,
	right: false,
}

document.addEventListener( "keydown", keyDownHandler, false );
document.addEventListener( "keyup", keyUpHandler, false );


let ball: circle & any = {
	radius:    10,
	x:         canvas.width / 2,
	y:         canvas.height - 30,
	nextStepX: 2,
	nextStepY: -2,
}

let paddle: rectangle = {
	height: 10,
	width:  75,
	x:      (canvas.width / 2) - (75 / 2),
	y:      canvas.height - 10,
}


function render()
{
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	
	drawBall()
	
	drawPaddle()
	
	updateBallPosition()
	
	updatePaddlePosition()
	
	// console.log( keyPressed )
}


function updateBallPosition()
{
	if ( isTouchingXSides() )
		reverseXDirection()
	
	if ( isTouchingTop() )
		reverseYDirection()
	
	if ( isTouchingPaddleTop() )
		reverseYDirection()
	
	if ( isTouchingBottom() ) {
		loop.stop()
		console.log( "Ye failed ☠️" )
	}
	
	
	ball.x += ball.nextStepX;
	ball.y += ball.nextStepY;
}


function updatePaddlePosition()
{
	if ( keyPressed.right && paddle.x < canvas.width - paddle.width )
		paddle.x += 7
	else if ( keyPressed.left && paddle.x > 0 )
		paddle.x -= 7;
}



function reverseXDirection()
{
	ball.nextStepX = -ball.nextStepX
}


function reverseYDirection()
{
	ball.nextStepY = -ball.nextStepY
}


function isTouchingPaddleTop(): boolean
{
	const paddleLeft  = paddle.x, // 202
	      paddleRight = paddle.x + paddle.width, // 277
	      paddleTop   = paddle.y // 310
	
	
	const ballLeft   = ball.x - (ball.radius / 2), // 235
	      ballRight  = ball.x + (ball.radius / 2), // 245
	      ballBottom = ball.y + (ball.radius / 2) // 295
	
	
	const matchesPaddleTop  = ballBottom + ball.nextStepY > paddleTop,
	      matchesPaddleArea = ballLeft >= paddleLeft && ballLeft < paddleRight
	
	return matchesPaddleTop && matchesPaddleArea
}


function isTouchingXSides()
{
	return isTouchingRight() || isTouchingLeft()
}


function isTouchingYSides()
{
	return isTouchingTop() || isTouchingBottom()
}


function isTouchingTop(): boolean
{
	return ball.y + ball.nextStepY < ball.radius
}


function isTouchingBottom(): boolean
{
	return ball.y + ball.nextStepY > canvas.height - ball.radius
}


function isTouchingLeft(): boolean
{
	return ball.x + ball.nextStepX < ball.radius
}


function isTouchingRight(): boolean
{
	return ball.x + ball.nextStepX > canvas.width - ball.radius
}


function drawBall()
{
	ctx.beginPath()
	ctx.arc( ball.x, ball.y, ball.radius, 0, Math.PI * 2 )
	ctx.fillStyle = "#0095DD"
	ctx.fill()
	ctx.closePath()
}


function drawPaddle()
{
	ctx.beginPath();
	ctx.rect( paddle.x, paddle.y, paddle.width, paddle.height );
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}


function keyDownHandler( e: KeyboardEvent )
{
	if ( e.key == "Right" || e.key == "ArrowRight" ) {
		keyPressed.right = true;
	} else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
		keyPressed.left = true;
	}
}


function keyUpHandler( e: KeyboardEvent )
{
	if ( e.key == "Right" || e.key == "ArrowRight" ) {
		keyPressed.right = false;
	} else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
		keyPressed.left = false;
	}
}


function App( {}: {} )
{
	console.log( "<App/>" )
	
	const width  = 480,
	      height = 320
	
	return (
		<div className="App">
		</div>)
}


export default App
