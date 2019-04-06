import React, { useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { Time } from "./GameLoop"




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
	
	console.log( "canvas:::", canvas.current )
	return (
		<div>
			<canvas
				ref={canvas}
				width={width}
				height={height}
			/>
		</div>)
}


function App( { scale, resolution }: { scale: number, resolution: number } )
{
	
	return (
		<div className="App">
			
			<Time>
				{() =>
					<CanvasTest
						width={300}
						height={300}
						time={0}
					/>
				}
			</Time>
		</div>)
}


export default App;
