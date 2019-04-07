import React from "react"
import { GameLoop, RAFGameLoop } from "./GameLoop"
import { Game } from "./Game"
import { CanvasDisplay } from "./Display"





class Controller
{
	handleKeyDownUp()
	{
	
	}
}


const controller       = new Controller(),
      display          = new CanvasDisplay( document.getElementById( "canvas" )! as HTMLCanvasElement ),
      game             = new Game( display ),
      engine: GameLoop = new RAFGameLoop()

window.addEventListener( "keydown", controller.handleKeyDownUp )
window.addEventListener( "keyup", controller.handleKeyDownUp )


engine.subscribe( () => {
	const events = undefined
	game.update(events)
} )

engine.start()



export default function App( {}: {} ) {
	return <div className="App"/>
}

