import LettersList from "../types/letterst-list";
import ResolvedCoordinates from "../types/resolved-coordinates";
import isUppercaseLetter from "./is-uppercase-letter";

/**
 * Loops through resolved-checked coordinates and constructs final letters and path
 * @param resolvedCoordinates
 * @returns letters: string, path: string
 */
function uniformizePath(resolvedCoordinates: ResolvedCoordinates): {
  letters: string;
  path: string;
} {
  let validPath = "";
  let letters: LettersList = {};
  let loopCounter = 0;
  if (resolvedCoordinates && Object.keys(resolvedCoordinates)) {
    for (const key in resolvedCoordinates) {
      const keyArray: string[] = key.split(":");
      const tempValue: string = resolvedCoordinates[key];
      const valueArray: string[] = tempValue.split(":");
      if (loopCounter === 0) {
        if (valueArray[0] === "@") {
          validPath += "@";
        }
      }
      if (!letters[keyArray[2]] && isUppercaseLetter(valueArray[1]) && !validPath.includes("x")) {
        letters = {
          ...letters,
          [keyArray[2]]: valueArray[1],
        };
      }
      if (!validPath.includes("x")) {
        validPath += valueArray[1];
        loopCounter++;
      }
    }
  }

  return { letters: Object.values(letters).join(""), path: validPath };
}

export default uniformizePath;
