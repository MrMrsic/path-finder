import invalidMockData from "../../__mock-data__/invalid-examples";
import validMockData from "../../__mock-data__/valid-examples";
import validateInputArray from "../../utils/validate-path";

describe("validateInputArray", () => {
  it("errors founded", () => {
    const characters2dArray: string[][] = invalidMockData["example_1"].characters;
    const errors = validateInputArray(characters2dArray);
    expect(errors.length).toBeGreaterThan(0);
  });
  it("no errors found", () => {
    const characters2dArray: string[][] = validMockData["example_1"].characters;
    const errors = validateInputArray(characters2dArray);
    expect(errors.length).toBe(0);
  });
});
