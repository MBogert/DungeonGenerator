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

		for (let i = 0; i < roomCount; i ++){

			let newRoom = DungeonGenerator.generateRoom(this.parameters);
			dungeon = DungeonGenerator.fillDungeonWithRoom(dungeon, newRoom);
			this.addRoom(newRoom);

			if(prevRoom != null){
				dungeon = DungeonGenerator.connectRooms(dungeon, newRoom, prevRoom);
			}
			prevRoom = newRoom; // Potential issue?
			
		}

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

	public static generateRoom(parameters: DungeonParms): Room {

		let width: number = Math.floor(Math.random() * parameters.width);
		let length: number = Math.floor(Math.random() * parameters.length);
		let westMost: number = Math.floor(Math.random() * (parameters.length - length));
		let northMost: number = Math.floor(Math.random() * (parameters.width - width));

		return new Room(westMost, northMost, length, width);
	}

	public static fillDungeonWithRoom(dungeon: string[][], room: Room): string[][] {

		for(let i = room.northCoordinate; i <= room.width + room.northCoordinate; i ++){
			for(let j = room.westCoordinate; j <= room.length + room.westCoordinate; j++){
				dungeon[i][j] = 'R';
			}
		}

		return dungeon;
	}

	public static buildHorizontalCorridor(dungeon: string[][], x1: number, x2: number, yAxis: number): string[][] {
		for(let i = x1; i <= x2; i ++){
			dungeon[yAxis][i] = "R";
		}
		return dungeon;
	}

	public static buildVerticalCorridor(dungeon: string[][], y1: number, y2: number, xAxis: number): string[][] {
		for(let i = y1; i <= y2; i ++){
			dungeon[i][xAxis] = "R";
		}	
		return dungeon;	
	}

	public static connectRooms(dungeon: string[][], room1: Room, room2: Room): string[][]{

		let horizontalParameters: [number, number, number] = DungeonGenerator.getHorizontalCorridorConstructionCoordinates(room1, room2);
		let verticalParameters: [number, number, number] = DungeonGenerator.getVerticalCorridorConstructionCoordinates(room1, room2);

		if(Math.random() > 0.5){ // Start with Vertical Corridor

			dungeon = DungeonGenerator.buildVerticalCorridor(dungeon, verticalParameters[0], verticalParameters[1], verticalParameters[2]);
			dungeon = DungeonGenerator.buildHorizontalCorridor(dungeon, horizontalParameters[0], horizontalParameters[1], horizontalParameters[2]);

		}else{ // Start with Horizontal Corridor

			dungeon = DungeonGenerator.buildHorizontalCorridor(dungeon, horizontalParameters[0], horizontalParameters[1], horizontalParameters[2]);
			dungeon = DungeonGenerator.buildVerticalCorridor(dungeon, verticalParameters[0], verticalParameters[1], verticalParameters[2]);

		}

		return dungeon;
	}

	public static getHorizontalCorridorConstructionCoordinates(room1: Room, room2: Room): [number, number, number] {

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

	public static getVerticalCorridorConstructionCoordinates(room1: Room, room2: Room): [number, number, number] {

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