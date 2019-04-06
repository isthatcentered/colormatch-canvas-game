import React, { Component, ReactNode } from "react"




export class GameLoop extends Component<{ children: ( frame: number ) => ReactNode }>
{
	frame = 0
	
	
	componentDidMount(): void
	{
		const loop = ( time: number ) => {
			this.forceUpdate()
			
			this.frame = window.requestAnimationFrame( loop )
		}
		
		loop( this.frame )
	}
	
	
	componentWillUnmount(): void
	{
		window.cancelAnimationFrame( this.frame )
	}
	
	
	handleStop = () => {
		window.cancelAnimationFrame( this.frame )
	}
	
	
	render()
	{
		let { children } = this.props
		
		console.log( "Rendered", this.frame )
		
		return (
			<>
				{children( this.frame )}
				
				<button onClick={this.handleStop}>Stop</button>
			</>)
	}
}