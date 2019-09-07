import { DungeonGenerator } from "./DungeonGenerator";

export class CSVRenderer {

	public _generator: DungeonGenerator;


	constructor(generator: DungeonGenerator){
		this._generator = generator;
	}

	public get generator(): DungeonGenerator{ return this._generator; }

	public printCSV(): void{
		
		let data: string[][] = this.generator.generateDungeon();
		let fileName: string = 'export.csv';
		
		let csvStr: string = '';

		for(let i = 0; i < data.length; i ++){

			let row: string = '';
			for(var square in data[i]){
				row += data[i][square];
			}

			row += '\n';
			csvStr += row;
		}

		//let blob: Blob = new Blob(, { type: 'text/csv;charset=utf-8;' });
	}
}