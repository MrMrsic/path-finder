import isUppercaseLetter from "./is-uppercase-letter";

export const validSymbols: string[] = ["@", "-", "|", "+", "x"];
export function validateInput(value: unknown) {
  return (value && value && validSymbols.includes(value as string)) || isUppercaseLetter(value as string);
}
