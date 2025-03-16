import Coordinate from "../types/coordinate";
import ResolvedCoordinates from "../types/resolved-coordinates";
import getPointWithPersistedDirection from "./get-point-with-persisted-direction";
import getPreviousDirection from "./get-previous-direction";
import getPreviousPoint from "./get-previous-point";
import { hasBrokenPath } from "./validate-path";

/**
 * Checks for first-next valid coordinate with value
 * @param arr 2D array
 * @param x x coordinate
 * @param y y coordinate
 * @param resolvedCoordinates already resolved coordinates
 * @returns nextCoordinate (x, y) and hasBrokenPath (boolean)
 */
export default function findNextCoordinate(
  arr: string[][],
  x: number,
  y: number,
  resolvedCoordinates: ResolvedCoordinates
): { nextCoordinate: Coordinate; hasBrokenPath: boolean } {
  let nextPoint: Coordinate = { x: x, y: y };
  const prevPoint = getPreviousPoint(resolvedCoordinates);
  const prevDirection = getPreviousDirection(resolvedCoordinates);
  const persistedDirectionPoint = getPointWithPersistedDirection(arr, x, y, prevDirection);
  let followedWithBrokenPath = false;

  let coordinateFound = false;
  if (persistedDirectionPoint.coordinateFound) {
    nextPoint = persistedDirectionPoint.coordinate;
    coordinateFound = true;
  } else {
    for (const m1 of [0, 1, -1]) {
      const newRow: number = x + m1;
      for (const m2 of [0, 1, -1]) {
        const newCol: number = y + m2;
        const newVal: string = arr[newRow] && arr[newRow][newCol] ? arr[newRow][newCol] : "";
        if (
          newVal &&
          newVal !== " " &&
          (newRow === x || newCol === y) &&
          !(newRow === x && newCol === y) &&
          !(newRow - x === 0 && newCol - y === 0) &&
          !Object.keys(resolvedCoordinates).includes(`${x}-${y}:${newRow}-${newCol}`) &&
          prevPoint !== `${newRow}-${newCol}` &&
          !Object.keys(resolvedCoordinates).includes(`${newRow}-${newCol}:${x}-${y}`)
        ) {
          coordinateFound = true;
          nextPoint.x = newRow;
          nextPoint.y = newCol;
          break;
        }
      }
      if (coordinateFound) {
        break;
      }
    }
  }

  if (!coordinateFound) {
    followedWithBrokenPath = hasBrokenPath(arr, x, y, prevDirection);
  }

  return { nextCoordinate: nextPoint, hasBrokenPath: followedWithBrokenPath };
}
