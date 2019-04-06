export interface position
{
	x: number
	y: number
}

interface size
{
	width: number
	height: number
}

export class Collision
{
	private __collider: Rectangle
	private __collidee: Rectangle
	
	
	private constructor( collider: Rectangle, collidee: Rectangle )
	{
		this.__collider = collider
		this.__collidee = collidee
	}
	
	
	// push the calling rectangle out of the callee rectangle on the
	// axis that has the most overlap
	resolve(): boolean
	{
		if ( !this.overlapping() )
			return false
		
		
		var vector_x, vector_y;
		
		// get the distance between center points
		vector_x = this.__collider.centerX - this.__collidee.centerX; // - before center, + after
		vector_y = this.__collider.centerY - this.__collidee.centerY; // - on top, positive on bottom
		
		const isVectorYLongerThanVectorX = vector_y * vector_y > vector_x * vector_x
		if ( isVectorYLongerThanVectorX ) {// square to remove negatives
			
			let isYVectorPassedCenter = vector_y > 0
			if ( isYVectorPassedCenter )
				this.__collider.y = this.__collidee.bottom
			else
				this.__collider.y = this.__collidee.y - this.__collider.height;
		} else { // the x vector is longer than the y vector
			
			// is the x vector pointing right?
			let isVectorXPassedCenter = vector_x > 0
			if ( isVectorXPassedCenter )
				this.__collider.x = this.__collidee.right;
			else  // the x vector is pointing left
				
				this.__collider.x = this.__collidee.x - this.__collider.width;
		}
		
		return true
	}
	
	
	private overlapping(): boolean
	{
		const isInsideXArea = this.__collider.right >= this.__collidee.left && this.__collider.left <= this.__collidee.right,
		      isInsideYArea = this.__collider.bottom >= this.__collidee.top && this.__collider.top <= this.__collidee.bottom
		
		return isInsideXArea && isInsideYArea
	}
	
	
	static for( collider: Rectangle, collidee: Rectangle )
	{
		return new Collision( collider, collidee )
	}
}

export class Rectangle implements position, size
{
	height: number
	width: number
	x: number
	y: number
	color: string
	
	
	constructor( config: position & size & { color: string } )
	{
		this.height = config.height
		this.width = config.width
		this.x = config.x
		this.y = config.y
		this.color = config.color
	}
	
	
	get centerX()
	{
		return this.x + this.width * 0.5;
	}
	
	
	get centerY()
	{
		return this.y + this.height * 0.5;
	}
	
	
	get bottom()
	{
		return this.y + this.height;
	}
	
	
	get left()
	{
		return this.x;
	}
	
	
	get right()
	{
		return this.x + this.width;
	}
	
	
	get top()
	{
		return this.y;
	}
	
	
	testCollision( object: Rectangle ): Collision | false
	{
		const isInsideXArea = object.right >= this.left && object.left <= this.right,
		      isInsideYArea = object.bottom >= this.top && object.top <= this.bottom
		
		return isInsideXArea && isInsideYArea ?
		       Collision.for( this, object ) :
		       false
	}
	
	
	draw( context: CanvasRenderingContext2D )
	{
		context.beginPath();
		context.rect( this.x, this.y, this.width, this.height );
		context.fillStyle = this.color;
		context.fill();
	}
}

