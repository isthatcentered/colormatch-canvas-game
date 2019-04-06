import { BoudingBox, boundingBoxConfig } from "./BoundingBox"




describe( `overlapsY()`, () => {
	// box & & 2
	// is on top
	// is under
	// is over left
	// is over right
	test( `Right side of main touches left side of collider`, () => {
		const main     = make20by20Box( { x: 20 } ),
		      collider = make20by20Box( { x: 40 } )
		
		expect( main.overlaps( collider ) ).toBe( true )
	} )
	
	test( `Left side of main touches right side of collider`, () => {
		const main     = make20by20Box( { x: 40 } ),
		      collider = make20by20Box( { x: 20 } )
		
		expect( main.overlaps( collider ) ).toBe( true )
	} )
	
	test( `Top side of main touches bottom side of collider`, () => {
		const main     = make20by20Box( { y: 40 } ),
		      collider = make20by20Box( { y: 20 } )
		
		expect( main.overlaps( collider ) ).toBe( true )
	} )
	
	test( `Bottom side of main touches top side of collider`, () => {
		const main     = make20by20Box( { y: 20 } ),
		      collider = make20by20Box( { y: 40 } )
		
		expect( main.overlaps( collider ) ).toBe( true )
	} )
	
	
	test( `Collider inside x area only`, () => {
		const main     = make20by20Box( { x: 20, y: 20 } ),
		      collider = make20by20Box( { x: 0, y: 41 } )
		
		expect( main.overlaps( collider ) ).toBe( false )
	} )
	
	
	test( `Collider inside y area only`, () => {
		const main     = make20by20Box( { x: 0, y: 0 } ),
		      collider = make20by20Box( { x: 21, y: 10 } )
		
		expect( main.overlaps( collider ) ).toBe( false )
	} )
	
	
	function make20by20Box( config: Partial<boundingBoxConfig> )
	{
		return new BoudingBox( {
			x:      0,
			y:      0,
			...config,
			width:  20,
			height: 20,
		} )
	}
} )

export default undefined