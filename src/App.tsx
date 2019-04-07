import React from "react"
import { GameLoop, RAFGameLoop } from "./GameLoop"
import { ColorMatchGame, ColorMatchGameState, GameController, GameDisplay, GameEngine } from "./ColorMatchGame"
import { CanvasDisplay } from "./Display"




export type ColorMatchGameEvent = "COLOR_CHOSEN"

class CanvasEventFeed implements GameController<ColorMatchGameEvent>
{
	private _canvas: HTMLCanvasElement
	private _subscribers: (( event: ColorMatchGameEvent ) => void)[] = []
	
	
	constructor( canvas: HTMLCanvasElement )
	{
		this._canvas = canvas
		
		this._canvas.addEventListener( "mousedown", ( e: MouseEvent ) => {
			this._notify( "COLOR_CHOSEN" )
		} )
	}
	
	
	subscribe( listener: ( event: ColorMatchGameEvent ) => void )
	{
		this._subscribers.push( listener )
		
		return () => {
			this._subscribers = this._subscribers.filter( l => l !== listener )
		}
	}
	
	
	private _notify( event: ColorMatchGameEvent )
	{
		this._subscribers.forEach( s => s( event ) )
	}
}

// @todo: WindowEventFeed + have game take a GameController[]


const canvas: HTMLCanvasElement = document.getElementById( "canvas" )! as any

const controller                                = new CanvasEventFeed( canvas ),
      display: GameDisplay<ColorMatchGameState> = new CanvasDisplay( canvas ),
      game: GameEngine                          = new ColorMatchGame( display, controller ),
      engine: GameLoop                          = new RAFGameLoop()



engine.subscribe( () => {
	game.update()
} )

engine.start()



export default function App( {}: {} ) {
	return <div className="App"/>
}

