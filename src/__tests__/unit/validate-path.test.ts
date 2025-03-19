import invalidMockData from "../../__mock-data__/invalid-examples";
import validMockData from "../../__mock-data__/valid-examples";
import validateInputArray from "../../utils/validate-path";

describe("validateInputArray", () => {
  it("errors founded", () => {
    const characters2dArray: string[][] = invalidMockData["invalid_example_1"].characters;
    const errors = validateInputArray(characters2dArray);
    expect(errors.length).toBeGreaterThan(0);
  });
  it("no errors found", () => {
    const characters2dArray: string[][] = validMockData["valid_example_1"].characters;
    const errors = validateInputArray(characters2dArray);
    expect(errors.length).toBe(0);
  });
});
