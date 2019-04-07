import { Hue, makeHsl } from "./Hue"
import { ColorMatchGameEvent } from "./App"




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
	
	
	substract( life: Life ): Life
	{
		return new Life( this.unpack() - life.unpack() )
	}
}

export interface GameDisplay<T>
{
	
	render( gameState: T ): void
}


export interface GameEngine
{
	update(): void
}


type unsubscribeFn = () => void

export interface GameController<T>
{
	subscribe( callback: ( event: T ) => void ): unsubscribeFn
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
	
	private _display: GameDisplay<ColorMatchGameState>
	private _controller: GameController<ColorMatchGameEvent>
	
	private _events: { type: ColorMatchGameEvent, payload: Hue }[] = [] // could be done with a map like window events key->payload
	
	
	constructor( display: GameDisplay<ColorMatchGameState>, controller: GameController<ColorMatchGameEvent> )
	{
		this._display = display
		this._controller = controller
		
		this._controller.subscribe( ( e ) => {
			if ( e === "COLOR_CHOSEN" ) {
				this._events.push( { type: e, payload: this._current } )
			}
		} )
	}
	
	
	update()
	{
		this._processEvents()
		
		this._shiftCurrentHue()
		
		// could check if state if different here for some games
		// like, compute physics & stuff, is it different ? nope -> don't do shit : yup -> update
		
		this._display.render( this._renderState() )
	}
	
	
	private _processEvents()
	{
		const pending = [ ...this._events ]
		
		
		// @todo: EventProcessing startegies ?
		// or events process themseleves according to some GameRule ?
		
		pending.forEach( e => {
			if ( e.type === "COLOR_CHOSEN" ) {
				this._life = this._computeScoreForHue( this._current, this._target, this._life )
			}
		} )
		
		
		this._resetEvents()
		
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
	
	
	private _resetEvents(): void
	{
		this._events = []
	}
	
	
	private _computeScoreForHue( submitted: Hue, target: Hue, life: Life )
	{
		return life.substract( new Life( 10 ) )
	}
}