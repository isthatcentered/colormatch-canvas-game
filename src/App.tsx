import React, { Component } from "react";
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


function Map()
{
	const resize = 3
	
	return <div style={{
		border:              "1px solid red",
		width:               32 * 7 * resize,
		height:              32 * 4 * resize,
		backgroundSize:      `${272 * resize}px ${392 * resize}px`,
		backgroundPositionX: -32 * 5,
		backgroundPositionY: -16,
		backgroundImage:     `url(${tileset})`,
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



function makeRange( total: number ): number[]
{
	return [ ...Array( total ) ].map( ( i, ind ) => ind )
}



function Grid( { tileSize, map }: { tileSize: number, map: Array<number[]> } )
{
	
	function rowz(): Array<number[]>
	{
		return map
	}
	
	
	function colz( row: number ): number[]
	{
		return rowz()[ row ]
	}
	
	
	return (
		<div style={{
			position: "relative",
			width:    tileSize * rowz().length,
			height:   tileSize * colz( 0 ).length,
			border:   "1px solid green",
		}}>
			{
				rowz().map( ( tiles, rowIndex ) =>
					tiles.map( ( tile, tileIndex ) =>
						<Tile size={tileSize}
						      x={tileIndex}
						      y={rowIndex}
						      key={`${rowIndex}-${tileIndex}`}
						/> ) )
			}
		</div>)
}


let map = {
	tileSize: 32 * 2,
	map:      [
		[ 1, 3, 3, 3, 1, 1 ],
		[ 1, 1, 1, 1, 1, 1 ],
		[ 1, 1, 1, 1, 1, 2 ],
		[ 1, 1, 1, 1, 1, 1 ],
		[ 1, 1, 1, 2, 1, 1 ],
		[ 1, 1, 1, 1, 2, 1 ],
	],
	get rowz(): Array<number[]>
	{
		return this.map
	},
}

class App extends Component
{
	
	render()
	{
		return (
			<div className="App">
				<header className="App-header">
					<Sprite/>
					
					<Grid {...map}>
					
					</Grid>
				
				</header>
			</div>
		);
	}
}

export default App;
