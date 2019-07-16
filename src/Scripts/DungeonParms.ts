export class DungeonParms {

	private _length: number;
	private _width: number;
	private _arena: boolean;
	private _type: string; // May eventually become its own class ClassName extends AnotherClass {
	private _encounterDensity: number;
	private _gapDensity: number;

	constructor(length: number, width: number, arena: boolean, encounterDensity: number, gapDensity: number) {
		this._length = length;
		this._width = width;
		this._arena = arena;
		this._gapDensity = gapDensity;
		this._encounterDensity = encounterDensity;
	}

	// Getters
	public get length(): number {return this._length;}
	public get width(): number {return this._width;}
	public get arena(): boolean {return this._arena;}
	// public get type(): string {return this._type} Pending support for dungeon types
	public get encounterDensity(): number {return this._encounterDensity}
	public get gapDensity(): number {return this._gapDensity;}

	// Setters (none atm for current needs)

}
