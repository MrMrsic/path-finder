import { resolvedCoordinates_1, resolvedCoordinates_2 } from "../../__mock-data__/resolved_coordinates";
import getPreviousPoint from "../../utils/get-previous-point";

describe("getPreviousPoint", () => {
  it("finds previous point correctly 1", () => {
    const resolvedCoordinates = getPreviousPoint(resolvedCoordinates_1);
    expect(resolvedCoordinates).toBe("2-3");
  });
  it("finds previous point correctly 2", () => {
    const resolvedCoordinates = getPreviousPoint(resolvedCoordinates_2);
    expect(resolvedCoordinates).toBe("3-5");
  });
});
