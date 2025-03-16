import invalidMockData from "../../__mock-data__/invalid-examples";
import validMockData from "../../__mock-data__/valid-examples";
import runPathFinder from "../../utils/run-path-finder";

describe("runPathFinder", () => {
  it("broken path founded", () => {
    const characters2dArray: string[][] = invalidMockData["example_5"].characters;
    const pathFinderResults = runPathFinder(characters2dArray);
    const { errors } = pathFinderResults;
    expect(errors).toContain("Broken path!");
  });
  it("no errors found", () => {
    const characters2dArray: string[][] = validMockData["example_3"].characters;
    const pathFinderResults = runPathFinder(characters2dArray);
    const { errors } = pathFinderResults;
    expect(errors.length).toBe(0);
  });
});
