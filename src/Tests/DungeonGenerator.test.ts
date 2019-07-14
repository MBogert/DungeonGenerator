import { DungeonGenerator } from '../Scripts/DungeonGenerator';
import { DungeonParms } from '../Scripts/DungeonParms';
import { Room } from '../Scripts/Room';

// test('Will this work?', () => {
// 	expect(Math.max(1,2)).toBe(2);
// });

// test('DummyDungeon', () => {

// 	let parms: DungeonParms = new DungeonParms(10, 10, false, 0, 0);
// 	let generator: DungeonGenerator = new DungeonGenerator(parms);
// 	let dungeon: string[][] = generator.generateDungeon();


// });

test('RoomLength', () => {
	let room: Room = new Room(7, 4, 10, 11);
	expect(room.length).toBe(10);
});

test('RoomWidth', () => {
	let room: Room = new Room(7, 4, 10, 11);
	expect(room.width).toBe(11);
});