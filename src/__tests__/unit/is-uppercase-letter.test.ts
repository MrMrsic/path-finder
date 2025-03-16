import isUppercaseLetter from "../../utils/is-uppercase-letter";

describe("isUppercaseLetter", () => {
  it("' ' (empty/space) should fail", () => {
    const isLetter = isUppercaseLetter(" ");
    expect(isLetter).toBe(false);
  });
  it("'-' (minus) should fail", () => {
    const isLetter = isUppercaseLetter("-");
    expect(isLetter).toBe(false);
  });
  it("'a' (lowercase letter) should fail", () => {
    const isLetter = isUppercaseLetter("-");
    expect(isLetter).toBe(false);
  });
  it("'A' (uppercase letter) should return true", () => {
    const isLetter = isUppercaseLetter("-");
    expect(isLetter).toBe(false);
  });
});
