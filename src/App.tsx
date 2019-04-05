import React, { ReactNode, useEffect, useState } from "react";
import "./App.css";
import characters from "./characters.png"




interface Positionable
{
	size: number,
	x: number,
	y: number
}


function GridItem( { size, x, y }: {} & Positionable )
{
	return <div style={{
		position:  "absolute",
		top:       size * y,
		left:      size * x,
		boxShadow: "0 0 0 1px red inset",
		width:     size,
		height:    size,
	}}/>
}


function Player( { size, x, y, sprite }: { sprite: string } & Positionable )
{
	return (
		<div
			className="Player"
			style={{
				position:            "absolute",
				top:                 size * y,
				left:                size * x,
				boxShadow:           "0 0 0 1px red inset",
				width:               size,
				height:              size,
				backgroundImage:     `url(${sprite})`,
				backgroundSize:      `${736 * 2}px ${128 * 2}px`,
				backgroundPositionX: 0,
				backgroundPositionY: -(32 * 2),
			}}/>)
}


function Tile( { size, x, y }: {} & Positionable )
{
	return <div style={{
		position:  "absolute",
		top:       size * y,
		left:      size * x,
		boxShadow: "0 0 0 1px red inset",
		width:     size,
		height:    size,
	}}/>
}


class TileMap
{
	
	constructor( private _map: Array<number[]> )
	{
	}
	
	
	get width(): number
	{
		return this.rows[ 0 ].length
	}
	
	
	get height(): number
	{
		return this.rows.length
	}
	
	
	private get rows()
	{
		return this._map
	}
	
	
	render( renderTile: ( renderParams: { rowIndex: number, tileIndex: number } ) => any )
	{
		return this.rows
			.map( ( tiles, rowIndex ) =>
				tiles.map( ( tile, tileIndex ) =>
					renderTile( { rowIndex, tileIndex } ),
				) )
	}
}


function Grid( { resolution, map, children }: { resolution: number, map: TileMap, children: ReactNode } )
{
	
	return (
		<div style={{
			position:  "relative",
			width:     map.width * resolution,
			height:    map.height * resolution,
			boxShadow: "0 0 0 2px green",
		}}>
			{
				map.render( ( { rowIndex, tileIndex } ) =>
					<Tile
						size={resolution}
						x={tileIndex}
						y={rowIndex}
						key={`${rowIndex}-${tileIndex}`}
					/> )
			}
			{children}
		</div>)
}



let map = new TileMap( [
	[ 1, 3, 3, 3, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 2 ],
	[ 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 2, 1, 1 ],
	[ 1, 1, 1, 1, 2, 1 ],
] )


function useWindowEvent<T extends keyof WindowEventMap>( event: T, callback: ( e: WindowEventMap[T] ) => void )
{
	useEffect( () => {
		
		function handleEvent( e: WindowEventMap[T] ): void
		{
			callback( e )
		}
		
		
		window.addEventListener( event, handleEvent )
		
		return () => window.removeEventListener( event, handleEvent )
	}, [] )
}


function App( { scale, resolution }: { scale: number, resolution: number } )
{
	
	const tileSize = resolution * scale
	
	const [ playerPos, setPlayerPos ] = useState<{ x: number, y: number }>( { x: 0, y: 0 } )
	
	useWindowEvent( "keydown", e => {
		type directionkey = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"
		
		const key: directionkey = e.key as any
		console.log( key )
		switch ( key ) {
			case "ArrowLeft":
				setPlayerPos( pos => ({ ...pos, x: pos.x - 1 }) )
				break;
			
			case "ArrowRight":
				setPlayerPos( pos => ({ ...pos, x: pos.x + 1 }) )
				break;
			
			case "ArrowDown":
				setPlayerPos( pos => ({ ...pos, y: pos.y + 1 }) )
				break;
			
			case "ArrowUp":
				setPlayerPos( pos => ({ ...pos, y: pos.y - 1 }) )
				break;
			
			default:
				const shouldNotBeReached: never = key
				break;
		}
	} )
	
	return (
		<div className="App">
			<Grid map={map}
			      resolution={tileSize}>
				<Player
					sprite={characters}
					size={tileSize}
					x={playerPos.x}
					y={playerPos.y}
				/>
			</Grid>
		</div>
	)
}


export default App;
