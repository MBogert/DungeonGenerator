export class Room {

	private _W: number; // Leftmost x-coordinate
	private _E: number; // Rightmost x-coordinate
	private _N: number; // Uppermost y-coordinate
	private _S: number; // Bottom-most y-coordinate

	// Dimmensions
	private _width: number;
	private _height: number;

	// Center Point
	private _center: [number, number];

	constructor(leftMost: number, bottomMost: number, width: number, height: number) {
		this._width = width;
		this._height = height;

		this._W = leftMost;
		this._E = leftMost + width;
		this._S = bottomMost;
		this._N = bottomMost + height;

		this._center = [Math.floor((this._W + this._E) / 2), Math.floor((this._S + this._N) / 2)];
	}

	// Getters
	public get width(): number {return this._width;}
	public get height(): number {return this.height;}
	public get center(): [number, number] {return this._center;}
	public get westCoordinate(): number {return this._W;}
	public get eastCoordinate(): number {return this._E;}
	public get southCoordinate(): number {return this._S;}
	public get northCoordinate(): number {return this._N;}

	// Setters (none atm)
}