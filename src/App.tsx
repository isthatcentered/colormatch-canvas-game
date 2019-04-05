import React, { Component, ReactNode } from "react";
import "./App.css";
import characters from "./characters.png"
import tileset from "./tileset.png"




function Sprite()
{
	const resize = 3
	
	return <div style={{
		border:              "1px solid red",
		width:               32 * resize,
		height:              32 * resize,
		backgroundSize:      `${736 * resize}px ${128 * resize}px`,
		backgroundPositionX: 0,
		backgroundPositionY: -32 * resize,
		backgroundImage:     `url(${characters})`,
	}}/>
}


function Tile( { size, x, y }: { size: number, x: number, y: number } )
{
	return <div style={{
		position: "absolute",
		top:      size * y,
		left:     size * x,
		border:   "1px solid red",
		width:    size,
		height:   size,
	}}/>
}


class TileMap
{
	
	constructor( private _map: Array<number[]> )
	{
	}
	
	
	rows(): Array<number[]>
	{
		return this._map
	}
	
	
	columns( rowIndex: number ): number[]
	{
		return this.rows()[ rowIndex ]
	}
}


function Grid( { tileSize, map, children }: { tileSize: number, map: TileMap, children: ReactNode } )
{
	
	return (
		<div style={{
			position: "relative",
			width:    tileSize * map.rows().length,
			height:   tileSize * map.columns( 0 ).length,
			border:   "1px solid green",
		}}>
			{
				map.rows()
					.map( ( tiles, rowIndex ) =>
						tiles.map( ( tile, tileIndex ) =>
							<Tile size={tileSize}
							      x={tileIndex}
							      y={rowIndex}
							      key={`${rowIndex}-${tileIndex}`}
							/> ) )
			}
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

class App extends Component
{
	
	render()
	{
		return (
			<div className="App">
				<header className="App-header">
					<Sprite/>
					
					<Grid map={map}
					      tileSize={64}>
					
					</Grid>
				
				</header>
			</div>
		);
	}
}

export default App;
