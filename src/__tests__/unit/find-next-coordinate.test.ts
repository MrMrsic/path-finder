import invalidMockData from "../../__mock-data__/invalid-examples";
import { resolvedCoordinates_1, resolvedCoordinates_3 } from "../../__mock-data__/resolved_coordinates";
import validMockData from "../../__mock-data__/valid-examples";
import findNextCoordinate from "../../utils/find-next-coordinate";

describe("findNextCoordinate", () => {
  it("has broken path", () => {
    const charracters2dArray: string[][] = invalidMockData["invalid_example_5"].characters;
    const nextPointResult = findNextCoordinate(charracters2dArray, 1, 8, resolvedCoordinates_3);
    const { hasBrokenPath } = nextPointResult;
    expect(hasBrokenPath).toBe(true);
  });
  it("find next coordinate", () => {
    const charracters2dArray: string[][] = validMockData["valid_example_1"].characters;
    const nextPointResult = findNextCoordinate(charracters2dArray, 1, 10, resolvedCoordinates_1);
    const { nextCoordinate } = nextPointResult;
    expect(nextCoordinate).toEqual({ x: 2, y: 10 });
  });
});
