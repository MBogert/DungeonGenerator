import { Room } from '../Scripts/Room';

let testRoom: Room;
beforeAll(() => {
	testRoom = new Room(2, 4, 7, 9);
});

afterAll(() => {
	// Void
});


// Dimensions
test('Length', () => {
	expect(testRoom.length).toBe(7);
});

test('Width', () => {
	expect(testRoom.width).toBe(9);
})


// Coordinates
test('West Coordinate', () => {
	expect(testRoom.westCoordinate).toBe(2);
});

test('East Coordinate', () => {
	expect(testRoom.eastCoordinate).toBe(9);
});

test('South Coordinate', () => {
	expect(testRoom.northCoordinate).toBe(4);
});

test('North Coordinate', () => {
	expect(testRoom.southCoordinate).toBe(13);
});


// Center
test('Center Tuple', () => {
	expect(testRoom.center).toStrictEqual([5,8]);
});

test('Center X-Coordinate', () => {
	expect(testRoom.centerXCoordinate).toBe(5);
});

test('Center Y-Coordinate', () => {
	expect(testRoom.centerYCoordinate).toBe(8);
});