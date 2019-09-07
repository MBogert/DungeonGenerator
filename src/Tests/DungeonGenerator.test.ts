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

	let testParms = new DungeonParms(10, 10, false, 0, 0);
	let randomRoom: Room = DungeonGenerator.generateRoom(testParms);

	expect(randomRoom.length <= testParms.length).toBe(true);
	expect(randomRoom.width <= testParms.width).toBe(true);

	expect(randomRoom.westCoordinate >= 0 && randomRoom.westCoordinate < (testParms.length - randomRoom.length)).toBe(true);
	expect(randomRoom.eastCoordinate == (randomRoom.westCoordinate + randomRoom.length)).toBe(true);


	expect(randomRoom.northCoordinate >= 0 && randomRoom.northCoordinate < (testParms.width - randomRoom.width)).toBe(true);
	expect(randomRoom.southCoordinate == (randomRoom.northCoordinate + randomRoom.width)).toBe(true);
});

test('Add One Room to Dungeon', () => {

	let testParms: DungeonParms = new DungeonParms(10, 10, false, 0.73, 0.52);
	let emptyDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(testParms.length, testParms.width);
	let testRoom: Room = DungeonGenerator.generateRoom(testParms);
	let dungeonWithRoom: string[][] = DungeonGenerator.fillDungeonWithRoom(emptyDungeon, testRoom);

	for(let i = testRoom.northCoordinate; i <= testRoom.southCoordinate; i ++){
		for(let j = testRoom.westCoordinate; j <= testRoom.eastCoordinate; j ++){

			expect(dungeonWithRoom[i][j]).toBe('R');

		}
	}
});

test('Build Horizontal Cooridor', () => {

	let testParms: DungeonParms = new DungeonParms(10, 10, false, 0.73, 0.52);
	let emptyDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(testParms.length, testParms.width);
	let dungeonWithHorizontalCorridor = DungeonGenerator.buildHorizontalCorridor(emptyDungeon, 2, 6, 5);

	for(let i = 2; i <= 6; i++){
		expect(dungeonWithHorizontalCorridor[5][i]).toBe('R');
	}
});

test('Build Vertical Cooridor', () => {

	let testParms: DungeonParms = new DungeonParms(10, 10, false, 0.73, 0.52);
	let emptyDungeon: string[][] = DungeonGenerator.buildEmptyDungeon(testParms.length, testParms.width);
	let dungeonWithVerticalCorridor = DungeonGenerator.buildVerticalCorridor(emptyDungeon, 2, 6, 5);

	for(let i = 2; i <= 6; i++){
		expect(dungeonWithVerticalCorridor[i][5]).toBe('R');
	}
});

test('Horizontal Corridor Construction Coordinates', () => {

	let room1: Room = new Room(1, 2, 3, 4);
	let room2: Room = new Room(5, 6, 7, 8);
	let coordinates: [number, number, number] = DungeonGenerator.getHorizontalCorridorConstructionCoordinates(room1, room2);

	expect(coordinates[0]).toBe(room1.centerXCoordinate);
	expect(coordinates[1]).toBe(room2.centerXCoordinate);
	expect(coordinates[2]).toBe(room1.centerYCoordinate);
});

test('Vertical Corridor Construction Coordinates', () => {

	let room1: Room = new Room(1, 2, 3, 4);
	let room2: Room = new Room(5, 6, 7, 8);
	let coordinates: [number, number, number] = DungeonGenerator.getVerticalCorridorConstructionCoordinates(room1, room2);

	expect(coordinates[0]).toBe(room1.centerYCoordinate);
	expect(coordinates[1]).toBe(room2.centerYCoordinate);
	expect(coordinates[2]).toBe(room1.centerXCoordinate);
});

test('Get Parameters', () => {
	let parms: DungeonParms = new DungeonParms(10, 10, false, 0.73, 0.52);
	let generator: DungeonGenerator = new DungeonGenerator(parms);
	expect(generator.parameters).toBe(parms);
});

test('Add Room', () => {
	let parms: DungeonParms = new DungeonParms(10, 10, false, 0.73, 0.52);
	let generator: DungeonGenerator = new DungeonGenerator(parms);
	let room: Room = new Room(1, 2, 3, 4);

	generator.addRoom(room);
	expect(generator.rooms[0]).toBe(room);
});

// TODO Finalize test
test('Dummy Dungeon', () => {

	let parms: DungeonParms = new DungeonParms(50, 50, false, 0.73, 0.52);
	let generator: DungeonGenerator = new DungeonGenerator(parms);
	let dungeon: string[][] = generator.generateDungeon();

	for(let i = 0; i < 50; i ++){
		for(let j = 0; j < 50; j++){
			console.log(dungeon[i][j]);
		}
	}

});

