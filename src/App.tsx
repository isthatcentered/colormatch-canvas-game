import React, { Component, ReactNode } from "react";
import "./App.css";
import characters from "./characters.png"




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
			position: "relative",
			width:    map.width,
			height:   map.height,
			border:   "1px solid green",
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
					      resolution={64}>
					
					</Grid>
				
				</header>
			</div>
		);
	}
}

export default App;
