import validMockData from "../../__mock-data__/valid-examples";
import getPointWithPersistedDirection from "../../utils/get-point-with-persisted-direction";

describe("getPointWithPersistedDirection", () => {
  it("finds point", () => {
    const characters2dArray: string[][] = validMockData["example_1"].characters;
    const prevDirectionResult = getPointWithPersistedDirection(characters2dArray, 0, 5, "R");
    const { coordinate } = prevDirectionResult;
    expect(coordinate).toEqual({ x: 0, y: 6 });
  });
  it("fails to find point", () => {
    const characters2dArray: string[][] = validMockData["example_1"].characters;
    const prevDirectionResult = getPointWithPersistedDirection(characters2dArray, 0, 5, "D");
    const { coordinateFound } = prevDirectionResult;
    expect(coordinateFound).toBe(false);
  });
});
