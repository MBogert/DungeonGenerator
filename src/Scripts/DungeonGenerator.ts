import { DungeonParms} from "./DungeonParms";
import { RoomGenerator } from "./RoomGenerator";
import { GapGenerator } from "./GapGenerator";
import { EncounterGenerator } from "./EncounterGenerator";
import { Room } from "./Room";

export class DungeonGenerator extends RoomGenerator{
	public _parameters: DungeonParms;
	public _rooms: Room[];

	constructor(params: DungeonParms){
		super();
		this._parameters = params;
		this._rooms = [];
	}

	public get parameters(): DungeonParms{return this._parameters;}
	public get rooms(): Room[]{return this._rooms;}

	public addRoom(newRoom: Room): void {
		this._rooms.push(newRoom);
	} 

	public generateDungeon(): string[][] {

		if(this.parameters.arena == true){
			return this.buildArena(this.parameters);
		}else{
			return this.buildDungeon(this.parameters)
		}
	}

	public buildDungeon(parameters: DungeonParms): string[][] {

		let initialDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(parameters.length, parameters.width);
		let roomDungeon: string[][] = this.populateDungeonRooms(initialDungeon);
		let gapDungeon: string[][] = this.populateGaps(roomDungeon, parameters.gapDensity);
		let populateEncounters: string[][] = this.populateEncounters(gapDungeon, parameters.encounterDensity);

		return populateEncounters;
	}

	public buildArena(parameters: DungeonParms): string[][] {

		let initialDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(parameters.length, parameters.width);
		let roomDungeon: string[][] = this.populateArenaRoom(initialDungeon);
		let gapDungeon: string[][] = this.populateGaps(roomDungeon, parameters.gapDensity);
		let populateEncounters: string[][] = this.populateEncounters(gapDungeon, parameters.encounterDensity);

		return populateEncounters;
	}

	public static buildEmptyDungeon(length: number, width: number): string[][] {
		
		let newDungeon: string[][] = [];
		for(let i = 0; i < length; i ++){
			newDungeon[i] = [];
			for(let j = 0; j < length; j++){
				newDungeon[i][j] = 'W';
			}
		}
		return newDungeon;
	}

	public populateDungeonRooms(dungeon: string[][]): string[][] {
		let roomCount: number = this.calculateRoomCount();
		let prevRoom: Room = null;
		console.log("Adding " + roomCount + " Rooms");
		for (let i = 0; i < roomCount; i ++){

			let newRoom = this.generateRoom(this.parameters);
			dungeon = this.fillDungeonWithRoom(dungeon, newRoom);
			this.addRoom(newRoom);

			if(prevRoom != null){
				this.connectRooms(dungeon, newRoom, prevRoom);
			}
			prevRoom = newRoom; // Potential issue?
			
		}
		console.log("Rooms added");
		return dungeon;
	}

	public populateArenaRoom(dungeon: string[][]): string[][] {
		let roomCount: number = this.calculateRoomCount();
		return dungeon;
	}

	public populateGaps(dungeon: string[][], gapDensity: number): string[][] {

		return dungeon;
	}

	public populateEncounters(dungeon: string[][], encounterDensity: number) {

		return dungeon;
	}

	// May need to update logic later
	public calculateRoomCount(): number {
		return Math.floor((this.parameters.length * this.parameters.width) / 10);
	}

	public generateRoom(parameters: DungeonParms): Room {

		let width: number = Math.random() * parameters.width;
		let length: number = Math.random() * parameters.length;
		let westMost: number = Math.random() * (parameters.length - length);
		let northMost: number = Math.random() * (parameters.width - width);

		console.log("One Room Built");
		return new Room(westMost, northMost, length, width);
	}

	public fillDungeonWithRoom(dungeon: string[][], room: Room): string[][] {

		console.log("Starting Fill");
		for(let i = room.southCoordinate; i <= room.width; i ++){
			console.log("Row");
			for(let j = room.westCoordinate; j <= room.length; j++){
				console.log("Column");
				console.log(typeof dungeon[i][j]);
				dungeon[i][j] = 'R';
			}
		}
		console.log("Room added to Dungeon");
		return dungeon;
	}

	public buildHorizontalCorridor(dungeon: string[][], x1: number, x2: number, yAxis: number): void {
		for(let i = x1; i <= x2; i ++){
			dungeon[yAxis][i] = "R";
		}
	}

	public buildVerticalCorridor(dungeon: string[][], y1: number, y2: number, xAxis: number): void {
		for(let i = y1; i <= y2; i ++){
			dungeon[i][xAxis] = "R";
		}		
	}

	public connectRooms(dungeon: string[][], room1: Room, room2: Room): void{

		let horizontalParameters: [number, number, number] = this.getHorizontalCorridorConstructionCoordinates(room1, room2);
		let verticalParameters: [number, number, number] = this.getVerticalCorridorConstructionCoordinates(room1, room2);

		if(Math.random() > 0.5){ // Start with Vertical Corridor

			this.buildVerticalCorridor(dungeon, verticalParameters[0], verticalParameters[1], verticalParameters[2]);
			this.buildHorizontalCorridor(dungeon, horizontalParameters[0], horizontalParameters[1], horizontalParameters[2]);

		}else{ // Start with Horizontal Corridor

			this.buildHorizontalCorridor(dungeon, horizontalParameters[0], horizontalParameters[1], horizontalParameters[2]);
			this.buildVerticalCorridor(dungeon, verticalParameters[0], verticalParameters[1], verticalParameters[2]);

		}

	}

	public getHorizontalCorridorConstructionCoordinates(room1: Room, room2: Room): [number, number, number] {

		let coordinates: [number, number, number] = [-1, -1, -1];

		if(room1.centerXCoordinate < room2.centerXCoordinate) {

			coordinates[0] = room1.centerXCoordinate;
			coordinates[1] = room2.centerXCoordinate;
			coordinates[2] = room1.centerYCoordinate;

		}else{

			coordinates[0] = room2.centerXCoordinate;
			coordinates[1] = room1.centerXCoordinate;
			coordinates[2] = room2.centerYCoordinate;

		}

		return coordinates;
	}

	public getVerticalCorridorConstructionCoordinates(room1: Room, room2: Room): [number, number, number] {

		let coordinates: [number, number, number] = [-1, -1, -1];

		if(room1.centerYCoordinate < room2.centerYCoordinate) {

			coordinates[0] = room1.centerYCoordinate;
			coordinates[1] = room2.centerYCoordinate;
			coordinates[2] = room1.centerXCoordinate;

		}else{

			coordinates[0] = room2.centerYCoordinate;
			coordinates[1] = room1.centerYCoordinate;
			coordinates[2] = room2.centerXCoordinate;

		}

		return coordinates;		
	}

}