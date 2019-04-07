import { hsl, Hue, makeHsl } from "./Hue"




export interface GameDisplay<T>
{
	
	render( gameState: T ): void
}

export interface ColorMatchGameState
{
	color: string
}

export class Game
{
	color!: hsl
	private _hue: Hue = Hue.Random()
	private __display: GameDisplay<ColorMatchGameState>
	
	
	constructor( display: GameDisplay<ColorMatchGameState> )
	{
		this.__display = display
		this.update()
	}
	
	
	update( events?: any )
	{
		this._updateColor()
		
		// could check if state if different here for some games
		// like, compute physics & stuff, is it different ? nope -> don't do shit : yup -> update
		
		this.__display.render( { color: this.color } )
	}
	
	
	private _updateColor()
	{
		this._shiftHue()
		
		this.color = makeHsl( { hue: this._hue.unpack(), saturation: 60, lightness: 45 } )
	}
	
	
	private _shiftHue(): void
	{
		this._hue = this._hue.shift()
	}
}