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
	
	
	draw( context: CanvasRenderingContext2D )
	{
		context.beginPath();
		context.rect( this.x, this.y, this.width, this.height );
		context.fillStyle = this.color;
		context.fill();
	}
}