import React, { Component, ReactNode } from "react"




export class GameLoop extends Component<{ children: ( frame: number ) => ReactNode }>
{
	frame = 0
	
	loop = ( time: number ) => {
		this.forceUpdate()
		
		this.frame = window.requestAnimationFrame( this.loop )
	}
	
	
	componentDidMount(): void
	{
		
		this.loop( this.frame )
	}
	
	
	componentWillUnmount(): void
	{
		window.cancelAnimationFrame( this.frame )
	}
	
	
	handleStop = () => {
		window.cancelAnimationFrame( this.frame )
	}
	
	handleStart = () => {
		window.requestAnimationFrame( this.loop )
	}
	
	
	render()
	{
		let { children } = this.props
		
		console.log( "Rendered", this.frame )
		
		return (
			<>
				{children( this.frame )}
				
				<button onClick={this.handleStart}>(re) Start</button>
				<button onClick={this.handleStop}>Stop</button>
			</>)
	}
}