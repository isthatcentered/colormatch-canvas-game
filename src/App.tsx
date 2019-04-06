import React from "react"
import "./App.css"
import { IntervalGameLoop } from "./GameLoop"
import { position, Rectangle } from "./Rectangle"




const canvas: HTMLCanvasElement = document.getElementById( "canvas" ) as HTMLCanvasElement,
      context                   = canvas.getContext( "2d" )!,
      loop                      = new IntervalGameLoop( 10 )

let pointer: position      = {
	    x: 0,
	    y: 0,
    },
    canvasCenter: position = {
	    x: canvas.width / 2,
	    y: canvas.height / 2,
    },
    red                    = new Rectangle( { x: 0, y: 0, width: 64, height: 64, color: "red" } ),
    white                  = new Rectangle( { x: canvasCenter.x - (64 / 2), y: canvasCenter.y - (64 / 2), width: 64, height: 64, color: "lightgray" } )



loop.subscribe( () => {
	red.x = pointer.x - 32;
	red.y = pointer.y - 32;
	
	context.fillStyle = "#303840";
	context.fillRect( 0, 0, context.canvas.width, context.canvas.height );
	
	white.draw( context );
	red.draw( context );
	
	if ( red.testCollision( white ) ) {
		context.beginPath();
		context.rect( red.x, red.y, red.width, red.height );
		context.rect( white.x, white.y, white.width, white.height );
		context.strokeStyle = "#ffffff";
		context.stroke();
		context.closePath()
	}
} )


canvas.addEventListener( "mousemove", ( { clientX, clientY }: MouseEvent ) => {
	const { left, top } = context.canvas.getBoundingClientRect()
	pointer = {
		x: clientX - left,
		y: clientY - top,
	}
} )


loop.start()


export default function App( {}: {} ) {
	return <div className="App"/>
}

