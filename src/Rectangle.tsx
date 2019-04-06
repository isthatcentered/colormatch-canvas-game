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
	
	
	testCollision( object: Rectangle )
	{
		const isInsideXArea = object.right >= this.left && object.left <= this.right,
		      isInsideYArea = object.bottom >= this.top && object.top <= this.bottom
		
		return isInsideXArea && isInsideYArea
	}
	
	
	// push the calling rectangle out of the callee rectangle on the
	// axis that has the most overlap
	resolveCollision( rectangle: Rectangle )
	{
		
		var vector_x, vector_y;
		
		// get the distance between center points
		vector_x = this.centerX - rectangle.centerX; // - before center, + after
		vector_y = this.centerY - rectangle.centerY; // - on top, positive on bottom
		
		const isVectorYLongerThanVectorX = vector_y * vector_y > vector_x * vector_x
		if ( isVectorYLongerThanVectorX ) {// square to remove negatives
			
			let isYVectorPassedCenter = vector_y > 0
			if ( isYVectorPassedCenter )
				this.y = rectangle.bottom
			else
				this.y = rectangle.y - this.height;
		} else { // the x vector is longer than the y vector
			
			// is the x vector pointing right?
			let isVectorXPassedCenter = vector_x > 0
			if ( isVectorXPassedCenter )
				this.x = rectangle.right;
			else  // the x vector is pointing left
				
				this.x = rectangle.x - this.width;
		}
	}
	
	
	draw( context: CanvasRenderingContext2D )
	{
		context.beginPath();
		context.rect( this.x, this.y, this.width, this.height );
		context.fillStyle = this.color;
		context.fill();
	}
}