import { DungeonParms} from "./DungeonParms";
import { RoomGenerator } from "./RoomGenerator";
import { GapGenerator } from "./GapGenerator";
import { EncounterGenerator } from "./EncounterGenerator";
import { Room } from "./Room";

class DungeonGenerator extends RoomGenerator{
	private _parameters: DungeonParms;
	private _rooms: Room[];

	constructor(params: DungeonParms){
		super();
		this._parameters = params;
		this._rooms = new Room[];
	}

	public get parameters(): DungeonParms{return this._parameters;}
	private get rooms(): Room[]{return this._rooms;}

	private addRoom(newRoom: Room): void {
		this._rooms.push(newRoom);
	} 

	public generateDungeon(): string[][] {

		if(this.parameters.arena == true){
			return this.buildArena(this.parameters);
		}else{
			return this.buildDungeon(this.parameters)
		}
	}

	private buildDungeon(parameters: DungeonParms): string[][] {

		let initialDungeon: string[][] = this.buildEmptyDungeon(parameters.length, parameters.width);
		let roomDungeon: string[][] = this.populateDungeonRooms(initialDungeon);
		let connectedDungeon: string[][] = this.connectRooms(roomDungeon);
		let gapDungeon: string[][] = this.populateGaps(connectedDungeon, parameters.gapDensity);
		let populateEncounters: string[][] = this.populateEncounters(gapDungeon, parameters.encounterDensity);

		return populateEncounters;
	}

	private buildArena(parameters: DungeonParms): string[][] {

		let initialDungeon: string[][] = this.buildEmptyDungeon(parameters.length, parameters.width);
		let roomDungeon: string[][] = this.populateArenaRoom(initialDungeon);
		let gapDungeon: string[][] = this.populateGaps(roomDungeon, parameters.gapDensity);
		let populateEncounters: string[][] = this.populateEncounters(gapDungeon, parameters.encounterDensity);

		return populateEncounters;
	}

	private buildEmptyDungeon(length: number, width: number): string[][] {
		
		let newDungeon: string[][];
		for(let i = 0; i < length; i ++){
			newDungeon[i] = [];
			for(let j = 0; j < length; j++){
				newDungeon[i][j] = "W";
			}
		}
		return newDungeon;
	}

	private populateDungeonRooms(dungeon: string[][]): string[][] {
		let roomCount: number = this.calculateRoomCount();

		for (let i = 0; i < roomCount; i ++){

			let newRoom = this.generateRoom();
			dungeon = this.fillDungeonWithRoom(dungeon, newRoom);
			this.addRoom(newRoom);
			
		}
		return dungeon;
	}

	private populateArenaRoom(dungeon: string[][]): string[][] {
		let roomCount: number = this.calculateRoomCount();
		return dungeon;
	}

	private connectRooms(dungeon: string[][]): string[][] {

		return dungeon;
	}

	private populateGaps(dungeon: string[][], gapDensity: number): string[][] {

		return dungeon;
	}

	private populateEncounters(dungeon: string[][], encounterDensity: number) {

		return dungeon;
	}

	// May need to update logic later
	private calculateRoomCount(): number {
		return Math.floor((this.parameters.length * this.parameters.width) / 10);
	}

	private generateRoom(): Room {

		let width: number = Math.random() * this.parameters.width;
		let length: number = Math.random() * this.parameters.length;
		let westMost: number = Math.random() * (this.parameters.length - length);
		let southMost: number = Math.random() * (this.parameters.width - width);

		return new Room(westMost, southMost, length, width);
	}

	private fillDungeonWithRoom(dungeon: string[][], room: Room): string[][] {

		for(let i = room.southCoordinate; i <= room.width; i ++){
			for(let j = room.westCoordinate; j <= room.length; j++){
				dungeon[i][j] = "R";
			}
		}

		return dungeon;
	}

}