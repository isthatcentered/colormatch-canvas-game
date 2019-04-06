import React, { useLayoutEffect, useRef, useState } from "react"
import "./App.css"
import { IntervalGameLoop } from "./GameLoop"




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


let ball: position & circle & any = {
	radius:    10,
	x:         canvas.width / 2,
	y:         canvas.height - 30,
	nextStepX: 2,
	nextStepY: 2,
}

let paddle: size & position = {
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
}


function updatePaddlePosition()
{
	if ( keyPressed.right )
		paddle.x += 7
	else if ( keyPressed.left )
		paddle.x -= 7;
}


function updateBallPosition()
{
	if ( isTouchingXSides() ) {
		reverseXDirection()
	}
	
	if ( isTouchingYSides() ) {
		reverseYDirection()
	}
	
	ball.x += ball.nextStepX;
	ball.y += ball.nextStepY;
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


function reverseXDirection()
{
	ball.nextStepX = -ball.nextStepX
}


function reverseYDirection()
{
	ball.nextStepY = -ball.nextStepY
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


interface circle
{
	radius: number
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


type FrameProps = {} & size


function Frame( { width, height }: FrameProps )
{
	console.log( "<Frame/>" )
	const canvas            = useRef<HTMLCanvasElement | null>( null ),
	      [ ball, setBall ] = useState<position>( { x: width / 2, y: height - 30 } )
	
	var dx = 2
	var dy = -2
	
	useLayoutEffect( () => {
		console.log( "<Frame/>:::useLayoutEffect()" )
		
		const ctx: CanvasRenderingContext2D | null = canvas.current && canvas.current.getContext( "2d" ) ?
		                                             canvas.current.getContext( "2d" ) :
		                                             null
		if ( !ctx )
			return
		
		ctx.beginPath()
		ctx.arc( ball.x, ball.y, 10, 0, Math.PI * 2 )
		ctx.fillStyle = "#0095DD"
		ctx.fill()
		ctx.closePath()
		
		setBall( ball => ({ ...ball, x: ball.x + dx, y: ball.y + dy }) )
	} )
	
	return (
		<div>
			<canvas
				style={{ backgroundColor: "#202020" }}
				ref={canvas}
				width={width}
				height={height}
			/>
		</div>)
}


interface gameState
{
	playerPos: position
}


function App( {}: {} )
{
	console.log( "<App/>" )
	
	const width  = 480,
	      height = 320
	
	return (
		<div className="App">
			
			{/*<Time loop={new IntervalGameLoop( 1000 )}>*/}
			{/*{() =>*/}
			{/*<Frame*/}
			{/*width={width}*/}
			{/*height={height}*/}
			{/*/>*/}
			{/*}*/}
			{/*</Time>*/}
		</div>)
}


export default App
