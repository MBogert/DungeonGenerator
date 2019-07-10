import { DungeonParms} from "./DungeonParms";
import { RoomGenerator } from "./RoomGenerator";
import { GapGenerator } from "./GapGenerator";
import { EncounterGenerator } from "./EncounterGenerator";

class DungeonGenerator extends RoomGenerator{
	private _parameters: DungeonParms;

	constructor(params: DungeonParms){
		super();
		this._parameters = params;
	}

	public get parameters(): DungeonParms{ return this._parameters;}

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
				newDungeon[i][j] = "x";
			}
		}
		return newDungeon;
	}

	private populateDungeonRooms(dungeon: string[][]): string[][] {

		return null;
	}

	private populateArenaRoom(dungeon: string[][]): string[][] {

		return null;
	}

	private connectRooms(dungeon: string[][]): string[][] {

		return null;
	}

	private populateGaps(dungeon: string[][], gapDensity: number): string[][] {

		return null;
	}

	private populateEncounters(duneon: string[][], encounterDensity: number) {

		return null;
	}

}