import React from "react"
import { GameLoop, RAFGameLoop } from "./GameLoop"
import { ColorMatchGame, ColorMatchGameState, GameDisplay, GameEngine } from "./ColorMatchGame"
import { CanvasDisplay } from "./Display"




class Controller
{
	handleKeyDownUp()
	{
	
	}
}


const controller                                = new Controller(),
      display: GameDisplay<ColorMatchGameState> = new CanvasDisplay( document.getElementById( "canvas" )! as HTMLCanvasElement ),
      game: GameEngine                          = new ColorMatchGame( display ),
      engine: GameLoop                          = new RAFGameLoop()

window.addEventListener( "keydown", controller.handleKeyDownUp )
window.addEventListener( "keyup", controller.handleKeyDownUp )


engine.subscribe( () => {
	const events = undefined
	game.update( events )
} )

engine.start()



export default function App( {}: {} ) {
	return <div className="App"/>
}

