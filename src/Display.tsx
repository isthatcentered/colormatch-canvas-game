import { ColorMatchGameState, GameDisplay } from "./ColorMatchGame"




export class CanvasDisplay implements GameDisplay<ColorMatchGameState>
{
	private canvas: HTMLCanvasElement
	private context: CanvasRenderingContext2D
	
	
	constructor( canvas: HTMLCanvasElement )
	{
		this.canvas = canvas
		this.context = this.canvas.getContext( "2d" )!
		
		
	}
	
	
	render( state: ColorMatchGameState )
	{
		const canvasMiddle = this.context.canvas.height / 2
		
		const _width                     = this.canvas.width * state.life / 100,
		      sideMarginRequiredToCenter = (this.canvas.width - _width) / 2
		
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height )
		
		// target
		this.context.fillStyle = state.target
		this.context.fillRect( sideMarginRequiredToCenter, 0, _width, this.canvas.height / 2 )
		
		// current hue
		this.context.fillStyle = state.current
		this.context.fillRect( sideMarginRequiredToCenter, canvasMiddle, _width, this.canvas.height / 2 )
		
		// pint life
		this.context.font = "28px sans-serif";
		this.context.fillStyle = "white"
		this.context.fillText( state.life.toString(), 10, this.canvas.height - 10 );
	}
}

