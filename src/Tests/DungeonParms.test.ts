import { DungeonParms } from "../Scripts/DungeonParms";

let testParms: DungeonParms;
beforeAll(() => {
	testParms = new DungeonParms(10, 20, true, 0.73, 0.52);
});

test('Length', () => {
	expect(testParms.length).toBe(10);
});

test('Width', () => {
	expect(testParms.width).toBe(20);
});

test('Arena Boolean', () => {
	expect(testParms.arena).toBe(true);
});

test('Encounter Density', () => {
	expect(testParms.encounterDensity).toBe(0.73);
});

test('Gap Density', () => {
	expect(testParms.gapDensity).toBe(0.52);
});