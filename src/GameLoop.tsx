import React, { Component, ReactNode } from "react"




type listener = () => void
type unsubscribeFn = () => void

class GameLoop
{
	
	private _id: number = 0
	private _subscribers: listener[] = []
	
	start = () => {
		this._loop()
	}
	
	
	stop = () => {
		window.cancelAnimationFrame( this._id )
	}
	
	subscribe = ( listener: listener ): unsubscribeFn => {
		
		this._subscribers.push( listener )
		
		return () => {
			this._subscribers = this._subscribers.filter( subscriber => subscriber !== listener )
		}
	}
	
	
	private _loop = () => {
		this._subscribers.forEach( subscriber => subscriber() )
		
		this._id = window.requestAnimationFrame( this._loop )
	}
}

export class Time extends Component<{ children: ()=> ReactNode }>
{
	loop: GameLoop = new GameLoop()
	
	
	componentDidMount(): void
	{
		this.loop.start()
		
		this.loop.subscribe( () => {
			this.forceUpdate()
		} )
	}
	
	
	componentWillUnmount(): void
	{
		this.loop.stop()
	}
	
	
	handleStop = () => {
		this.loop.stop()
	}
	
	handleStart = () => {
		this.loop.start()
	}
	
	
	render()
	{
		let { children } = this.props
		
		return (
			<>
				
				{children()}
				
				<div style={{ padding: 10 }}>
					<button onClick={this.handleStart}>(re) Start</button>
					<button onClick={this.handleStop}>Stop</button>
				</div>
			</>)
	}
}