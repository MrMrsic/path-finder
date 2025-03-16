import { resolvedCoordinates_1 } from "../../__mock-data__/resolved_coordinates";
import uniformizePath from "../../utils/uniformize-path";

describe("uniformizePath", () => {
  it("errors founded", () => {
    const uniformizedResults = uniformizePath(resolvedCoordinates_1);
    const { path } = uniformizedResults;
    expect(path).not.toBe("@---A---+||+---+|+-B-x");
  });
  it("no errors found 1", () => {
    const uniformizedResults = uniformizePath(resolvedCoordinates_1);
    const { path } = uniformizedResults;
    expect(path).toBe("@---A---+|C|+---+|+-B-x");
  });
});
