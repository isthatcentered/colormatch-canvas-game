import React, { useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { Time } from "./GameLoop"




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



function CanvasTest( { width, height, time }: { width: number, height: number, time: number } )
{
	const canvas = useRef<HTMLCanvasElement | null>( null )
	
	const [ rectanglePos, setRectanglePos ] = useState( {
		x: width / 2,
		y: height / 2,
	} )
	
	useLayoutEffect( () => {
		const context: CanvasRenderingContext2D | null = canvas.current && canvas.current.getContext( "2d" ) ?
		                                                 canvas.current.getContext( "2d" ) :
		                                                 null
		if ( !context )
			return
		
		const rectangle = {
			height: 32,
			width:  32,
		}
		
		// Render canvas background
		// he uses it to erase previous rectangle, but he could do context.clear() no ?
		context.fillStyle = "#202020"
		context.fillRect( 0, 0, width, height )
		
		context.fillStyle = "red"
		context.fillRect( rectanglePos.x, rectanglePos.y, rectangle.width, rectangle.height )
		
		setRectanglePos( pos => ({
			...pos,
			x: pos.x + 1,
		}) )
		
		
	}, [ time ] )
	
	// console.log( "canvas:::", canvas.current )
	return (
		<div>
			<canvas
				ref={canvas}
				width={width}
				height={height}
			/>
		</div>)
}


type FrameProps = {} & size


function Frame( { width, height }: FrameProps )
{
	console.log( "<Frame/>" )
	
	const canvas = useRef<HTMLCanvasElement | null>( null )
	
	useLayoutEffect( () => {
		console.log( "<Frame/>:::useLayoutEffect()" )
		
		const ctx: CanvasRenderingContext2D | null = canvas.current && canvas.current.getContext( "2d" ) ?
		                                                 canvas.current.getContext( "2d" ) :
		                                                 null
		if ( !ctx )
			return
		
		
		ctx.beginPath();
		ctx.rect(20, 40, 50, 50);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(240, 160, 20, 0, Math.PI*2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		// const rectangle = {
		// 	height: 32,
		// 	width:  32,
		// }
		//
		// context.clearRect( 0, 0, width, height )
		//
		// context.fillStyle = "red"
		// context.fillRect( playerPos.x, playerPos.y, rectangle.width, rectangle.height )
	}, [] )
	
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
			
			<Time>
				{() =>
					<Frame
						width={width}
						height={height}
					/>
				}
			</Time>
		</div>)
}


export default App;
