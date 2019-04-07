import { Brand } from "utility-types"




export type hsl = Brand<string, "hsl">


export function makeHsl( { hue, saturation, lightness }: { hue: number, saturation: number, lightness: number } ): hsl
{
	return `hsl(${hue}, ${saturation}%, ${lightness}%)` as hsl
}


export class Hue
{
	
	constructor( private value: number )
	{
	}
	
	
	shift(): Hue
	{
		const _value = this.value >= 360 ?
		               0 :
		               this.value + 1
		
		return new Hue( _value )
	}
	
	
	unpack(): number
	{
		return this.value
	}
	
	
	static Random(): Hue
	{
		function getRandomIntInclusive( min: number, max: number ): number
		{
			min = Math.ceil( min );
			max = Math.floor( max );
			return Math.floor( Math.random() * (max - min + 1) ) + min; //The maximum is inclusive and the minimum is inclusive
		}
		
		
		return new Hue( getRandomIntInclusive( 0, 255 ) )
	}
}