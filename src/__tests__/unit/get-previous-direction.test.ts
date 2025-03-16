import { resolvedCoordinates_1, resolvedCoordinates_2 } from "../../__mock-data__/resolved_coordinates";
import getPreviousDirection from "../../utils/get-previous-direction";

describe("getPreviousDirection", () => {
  it("finds previous direction correctly 1", () => {
    const resolvedCoordinates = getPreviousDirection(resolvedCoordinates_1);
    expect(resolvedCoordinates).toBe("L");
  });
  it("finds previous direction correctly 2", () => {
    const resolvedCoordinates = getPreviousDirection(resolvedCoordinates_2);
    expect(resolvedCoordinates).toBe("R");
  });
});
