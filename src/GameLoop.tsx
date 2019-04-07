import React, { Component, ReactNode } from "react"




type listener = () => void
type unsubscribeFn = () => void

interface Subscribable
{
	subscribe: ( listener: listener ) => unsubscribeFn
}

export interface GameLoop extends Subscribable
{
	start: () => void
	stop: () => void
	running: boolean
}

class Subject implements Subscribable
{
	private _subscribers: listener[] = []
	
	notify = () => {
		this._subscribers.forEach( subscribers => subscribers() )
	}
	
	subscribe = ( listener: listener ): unsubscribeFn => {
		
		this._subscribers.push( listener )
		
		return () => {
			this._subscribers = this._subscribers.filter( subscriber => subscriber !== listener )
		}
	}
}

export class RAFGameLoop implements GameLoop
{
	private _id: number = 0
	private _subject = new Subject()
	private _running: boolean = false
	
	
	get running(): boolean
	{
		return this._running
	}
	
	
	start = () => {
		this._loop( 0 )
		this._running = true
	}
	
	
	stop = () => {
		window.cancelAnimationFrame( this._id )
		this._running = false
	}
	
	
	subscribe = ( listener: listener ): unsubscribeFn =>
		this._subject.subscribe( listener )
	
	
	private _loop = ( tframe: DOMHighResTimeStamp ) => {
		this._subject.notify()
		
		this._id = window.requestAnimationFrame( this._loop )
	}
}

export class IntervalGameLoop implements GameLoop
{
	private _running: boolean = false
	private _intervalId: any = null
	private _subject = new Subject()
	
	
	constructor( private interval: number )
	{
	}
	
	
	get running()
	{
		return this._running
	}
	
	
	start = (): void => {
		this._intervalId = setInterval( () => {
			this._subject.notify()
			
		}, this.interval )
		
		this._running = true
	}
	
	stop = (): void => {
		clearInterval( this._intervalId )
		this._running = false
	}
	
	subscribe = ( listener: listener ): unsubscribeFn =>
		this._subject.subscribe( listener )
}

export class Time extends Component<{ loop: GameLoop, children: () => ReactNode }>
{
	
	
	
	componentDidMount(): void
	{
		// this.start()
		
		this.props.loop.subscribe( () => {
			this.forceUpdate()
		} )
	}
	
	
	componentWillUnmount(): void
	{
		this.stop()
	}
	
	
	start = () => {
		this.props.loop.stop()
		this.setState( { running: false } )
	}
	
	stop = () => {
		this.props.loop.start()
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
					{this.props.loop.running ?
					 <button onClick={this.start}>Stop</button> :
					 <button onClick={this.stop}>Start</button>
					}
				</div>
			</>)
	}
}