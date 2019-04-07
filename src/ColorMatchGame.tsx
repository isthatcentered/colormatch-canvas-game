import { Hue, makeHsl } from "./Hue"




export interface GameDisplay<T>
{
	
	render( gameState: T ): void
}

export interface GameEngine
{
	update( events?: any ): void
}


class Life
{
	private readonly value: number
	
	
	constructor( value: number )
	{
		this.value = value
		
	}
	
	
	unpack(): number
	{
		return this.value
	}
	
}

export interface ColorMatchGameState
{
	target: string
	current: string
	life: number
}

export class ColorMatchGame implements GameEngine
{
	private _target: Hue = Hue.Random()
	private _current: Hue = Hue.Random()
	private _life: Life = new Life( 100 )
	
	private __display: GameDisplay<ColorMatchGameState>
	
	
	constructor( display: GameDisplay<ColorMatchGameState> )
	{
		this.__display = display
	}
	
	
	update( events?: any )
	{
		this._shiftCurrentHue()
		
		// could check if state if different here for some games
		// like, compute physics & stuff, is it different ? nope -> don't do shit : yup -> update
		
		this.__display.render( this._renderState() )
	}
	
	
	private _shiftCurrentHue()
	{
		this._current = this._current.shift()
	}
	
	
	private _renderState(): ColorMatchGameState
	{
		return {
			target:  makeHsl( { hue: this._target.unpack(), saturation: 60, lightness: 45 } ),
			current: makeHsl( { hue: this._current.unpack(), saturation: 60, lightness: 45 } ),
			life:    this._life.unpack(),
		}
	}
}