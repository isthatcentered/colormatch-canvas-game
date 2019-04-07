import { ColorMatchGameState, GameDisplay } from "./ColorMatchGame"




export class CanvasDisplay implements GameDisplay<ColorMatchGameState>
{
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	
	
	constructor( canvas: HTMLCanvasElement )
	{
		this.canvas = canvas
		this.context = this.canvas.getContext( "2d" )!
	}
	
	
	render( gameState: ColorMatchGameState )
	{
		const canvasMiddle = this.context.canvas.height / 2
		
		
		// target
		this.context.fillStyle = gameState.target
		this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height / 2 )
		
		// current hue
		this.context.fillStyle = gameState.current
		this.context.fillRect( 0, canvasMiddle, this.canvas.width, this.canvas.height / 2 )
	}
}