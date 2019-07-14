import { DungeonGenerator } from '../Scripts/DungeonGenerator';
import { DungeonParms } from '../Scripts/DungeonParms';

test('Will this work?', () => {
	expect(Math.max(1,2)).toBe(2);
});

test('DummyDungeon', () => {

	let parms: DungeonParms = new DungeonParms(10, 10, false, 0, 0);
	let generator: DungeonGenerator = new DungeonGenerator(parms);
	let dungeon: string[][] = generator.generateDungeon();


});