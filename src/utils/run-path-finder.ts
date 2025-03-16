import Coordinate from "../types/coordinate";
import findNextCoordinate from "./find-next-coordinate";
import ResolvedCoordinates from "../types/resolved-coordinates";
import findStartPoint from "./find-start-point";
import validateInputArray from "./validate-path";

/**
 * Initializes path finder
 * @param arr 2D string array
 */
export default function runPathFinder(arr: string[][]): { coordinates: ResolvedCoordinates; errors: string[] } {
  let resolvedCoordinates: ResolvedCoordinates = {};
  const errors: string[] = validateInputArray(arr);
  const startPoint: Coordinate = findStartPoint(arr);
  const resolveCoordinate = function (arr: string[][], coordinate: Coordinate) {
    const nextCoordinateResult = findNextCoordinate(arr, coordinate.x, coordinate.y, resolvedCoordinates);
    const { nextCoordinate, hasBrokenPath } = nextCoordinateResult;
    if (hasBrokenPath) {
      errors.push("Broken path!");
    }
    if (nextCoordinate.x !== coordinate.x || nextCoordinate.y !== coordinate.y) {
      const char: string = arr[coordinate.x][coordinate.y];
      const newKey: string = `${Object.keys(resolvedCoordinates).length + 1}:${coordinate.x}-${coordinate.y}:${
        nextCoordinate.x
      }-${nextCoordinate.y}`;
      resolvedCoordinates = {
        ...resolvedCoordinates,
        [newKey]: `${char}:${arr[nextCoordinate.x][nextCoordinate.y]}`,
      };
      resolveCoordinate(arr, nextCoordinate);
    }
  };
  if (startPoint.x !== -1 && startPoint.y !== -1) {
    resolveCoordinate(arr, startPoint);
  }

  return { coordinates: resolvedCoordinates, errors: errors };
}
