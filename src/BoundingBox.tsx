// export interface position
// // {
// // 	x: number
// // 	y: number
// // }
// //
// // export interface size
// // {
// // 	width: number
// // 	height: number
// // }
// //
// // export interface collidable
// // {
// // 	left: number
// // 	right: number
// // 	top: number
// // 	bottom: number
// //
// // 	overlaps( object: collidable ): boolean
// //
// // 	update( position: position ): collidable
// // }
// //
// // export type boundingBoxConfig = position & size
// //
// // export class BoudingBox implements collidable
// // {
// // 	private __config: boundingBoxConfig
// //
// //
// // 	constructor( config: boundingBoxConfig )
// // 	{
// // 		this.__config = config
// // 	}
// //
// //
// // 	get top(): number
// // 	{
// // 		return this.__config.y
// // 	}
// //
// //
// // 	get bottom(): number
// // 	{
// // 		return this.__config.y + this.__config.width
// // 	}
// //
// //
// // 	get left(): number
// // 	{
// // 		return this.__config.x
// // 	}
// //
// //
// // 	get right(): number
// // 	{
// // 		return this.__config.x + this.__config.width
// // 	}
// //
// //
// // 	update( position: position ): BoudingBox
// // 	{
// // 		return new BoudingBox( {
// // 			...this.__config,
// // 			...position,
// // 		} )
// // 	}
// //
// //
// // 	overlaps( object: BoudingBox )
// // 	{
// // 		const isInsideXArea = object.right >= this.left && object.left <= this.right
// // 		const isInsideYArea = object.bottom >= this.top && object.top <= this.bottom
// //
// // 		return isInsideXArea && isInsideYArea
// // 	}
// // }

export default undefined