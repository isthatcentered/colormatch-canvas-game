import { ColorMatchGameState, GameDisplay } from "./Game"




export class CanvasDisplay implements GameDisplay<ColorMatchGameState>
{
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	buffer = document.createElement( "canvas" ).getContext( "2d" )!
	
	
	constructor( canvas: HTMLCanvasElement )
	{
		this.canvas = canvas
		this.context = this.canvas.getContext( "2d" )!
	}
	
	
	renderColor( color: string )
	{
		this.buffer.fillStyle = color
		this.buffer.fillRect( 0, 0, this.buffer.canvas.width, this.buffer.canvas.height )
	}
	
	
	render( gameState: ColorMatchGameState )
	{
		this.renderColor( gameState.color )
		
		this.context
			.drawImage(
				this.buffer.canvas,
				0,
				0,
				this.buffer.canvas.width,
				this.buffer.canvas.height,
				0,
				0,
				this.context.canvas.width,
				this.context.canvas.height,
			)
	}
}