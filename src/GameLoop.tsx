import React, { Component, ReactNode } from "react"




type listener = () => void
type unsubscribeFn = () => void



interface GameLoop
{
	start: () => void
	stop: () => void
	running: boolean
	subscribe: ( listener: listener ) => unsubscribeFn
}

class RAFGameLoop implements GameLoop
{
	
	private _id: number = 0
	private _subscribers: listener[] = []
	private _running: boolean = false
	
	start = () => {
		this._loop( 0 )
		this._running = true
	}
	
	
	stop = () => {
		window.cancelAnimationFrame( this._id )
		this._running = false
	}
	
	
	get running(): boolean
	{
		return this._running
	}
	
	
	subscribe = ( listener: listener ): unsubscribeFn => {
		
		this._subscribers.push( listener )
		
		return () => {
			this._subscribers = this._subscribers.filter( subscriber => subscriber !== listener )
		}
	}
	
	
	private _loop = ( tframe: DOMHighResTimeStamp ) => {
		this._subscribers.forEach( subscriber => subscriber() )
		
		this._id = window.requestAnimationFrame( this._loop )
	}
}

class IntervalGameLoop implements GameLoop
{
	private _subscribers: listener[] = []
	private _running: boolean = false
	private _intervalId: any = null
	
	
	constructor( private interval: number )
	{
	}
	
	
	get running()
	{
		return this._running
	}
	
	
	start = (): void => {
		this._intervalId = setInterval( () => {
			this._subscribers.forEach( s => s() )
			
		}, this.interval )
		
		this._running = true
	}
	
	stop = (): void => {
		clearInterval( this._intervalId )
		this._running = false
	}
	
	subscribe = ( listener: listener ): unsubscribeFn => {
		this._subscribers.push( listener )
		
		return () => {
			this._subscribers = this._subscribers.filter( subscriber => subscriber !== listener )
		}
	}
}

export class Time extends Component<{ children: () => ReactNode }>
{
	
	loop: GameLoop = new IntervalGameLoop( 100 )
	
	
	componentDidMount(): void
	{
		// this.start()
		
		this.loop.subscribe( () => {
			this.forceUpdate()
		} )
	}
	
	
	componentWillUnmount(): void
	{
		this.stop()
	}
	
	
	start = () => {
		this.loop.stop()
		this.setState( { running: false } )
	}
	
	stop = () => {
		this.loop.start()
		this.setState( { running: true } )
	}
	
	
	render()
	{
		console.log( "<Time/>" )
		
		const { children } = this.props
		
		return (
			<>
				
				{children()}
				
				<div style={{ padding: 10 }}>
					{this.loop.running ?
					 <button onClick={this.start}>Stop</button> :
					 <button onClick={this.stop}>Start</button>
					}
				</div>
			</>)
	}
}