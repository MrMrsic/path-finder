import Coordinate from "../types/coordinate";

/**
 * Find starting point inside 2d array
 * @param arr 2d array
 * @returns starting point - coordinate (x, y)
 */
export default function findStartPoint(arr: string[][]): Coordinate {
  let startPoint: Coordinate = { x: -1, y: -1 };
  for (let x = 0; x < arr.length; x++) {
    const row = arr[x];
    if (row.indexOf("@") !== -1) {
      startPoint = { x: x, y: row.indexOf("@") };
    }
  }
  return startPoint;
}
