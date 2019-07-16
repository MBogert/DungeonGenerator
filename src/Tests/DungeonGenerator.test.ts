import { DungeonGenerator } from '../Scripts/DungeonGenerator';
import { DungeonParms } from '../Scripts/DungeonParms';
import { Room } from '../Scripts/Room';

test('Empty Dungeon Generation', () => {

	let emptyDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(5, 5);
	for(let i = 0; i < 5; i ++){
		for(let j = 0; j < 5; j ++){
			expect(emptyDungeon[i][j]).toBe('W');
		}
	}

});

test('Random Room Creation', () => {

	let testParms = new DungeonParms(10, 20, true, 0.73, 0.52);
	let gen: DungeonGenerator = new DungeonGenerator(testParms);
	let randomRoom: Room = DungeonGenerator.generateRoom(testParms);

	expect(Room.length <= testParms.length).toBe(true);
	expect(Room.width <= testParms.width).toBe(true);

	expect(Room.westCoordinate >= 0 && Room.westCoordinate < (parameters.length - length)).toBe(true);
	expect(Room.eastCoordinate == (Room.westCordinate + testParms.length)).toBe(true);

	expect(Room.northCoordinate >= 0 && Room.northCoordinate < (parameters.width - width)).toBe(true);
	expect(Room.southCoordinate == (Room.northCordinate + testParms.width)).toBe(true);
});