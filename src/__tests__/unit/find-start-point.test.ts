import invalidMockData from "../../__mock-data__/invalid-examples";
import validMockData from "../../__mock-data__/valid-examples";
import findStartPoint from "../../utils/find-start-point";

describe("findStartPoint", () => {
  it("missing start point", () => {
    const missingStartCharacterData: string[][] = invalidMockData["example_1"].characters;
    const startPoint = findStartPoint(missingStartCharacterData);
    expect(startPoint).toEqual({ x: -1, y: -1 });
  });
  it("has start point", () => {
    const startCharacterData: string[][] = validMockData["example_1"].characters;
    const startPoint = findStartPoint(startCharacterData);
    expect(startPoint).not.toEqual({ x: -1, y: -1 });
  });
});
