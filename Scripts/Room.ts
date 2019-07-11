export class Room {

	private _W: number; // Leftmost x-coordinate
	private _E: number; // Rightmost x-coordinate
	private _N: number; // Uppermost y-coordinate
	private _S: number; // Bottom-most y-coordinate

	// Dimmensions
	private _length: number;
	private _width: number;

	// Center Point
	private _center: [number, number];

	constructor(leftMost: number, bottomMost: number, length: number, width: number) {
		this._length = length;
		this._width = width;

		this._W = leftMost;
		this._E = leftMost + length;
		this._S = bottomMost;
		this._N = bottomMost + width;

		this._center = [Math.floor((this._W + this._E) / 2), Math.floor((this._S + this._N) / 2)];
	}

	// Getters
	public get length(): number {return this._length;}
	public get width(): number {return this.width;}
	public get center(): [number, number] {return this._center;}
	public get westCoordinate(): number {return this._W;}
	public get eastCoordinate(): number {return this._E;}
	public get southCoordinate(): number {return this._S;}
	public get northCoordinate(): number {return this._N;}

	// Setters (none atm)
}