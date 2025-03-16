import Coordinate from "../types/coordinate";

/**
 * Try to get valid next coordinate point (x, y) based on direction (right, down, left, up)
 * @param arr 2d array
 * @param x current coordinate x
 * @param y current coordinate y
 * @param direction direction (based on previous coordinate)
 * @returns coordinateFound (boolean) and coordinate (x, y)
 */
export default function getPointWithPersistedDirection(
  arr: string[][],
  x: number,
  y: number,
  direction: string
): { coordinateFound: boolean; coordinate: Coordinate } {
  const goRight: number = y + 1;
  const goDown: number = x + 1;
  const goLeft: number = y - 1;
  const goUp: number = x - 1;
  const nextPoint: Coordinate = { x: x, y: y };
  let coordinateFound = false;

  if (direction) {
    if (direction === "R") {
      if (arr[x] && arr[x][goRight] && arr[x][goRight] !== " ") {
        // check right
        nextPoint.x = x;
        nextPoint.y = goRight;
        coordinateFound = true;
      }
    } else if (direction === "D") {
      if (arr[goDown] && arr[goDown][y] && arr[goDown][y] !== " " && arr[x][y] !== "|" && arr[goUp][y] !== "-") {
        // check down
        nextPoint.x = goDown;
        nextPoint.y = y;
        coordinateFound = true;
      }
    } else if (direction === "L") {
      if (arr[x] && arr[x][goLeft] && arr[x][goLeft] !== " ") {
        // check left
        nextPoint.x = x;
        nextPoint.y = goLeft;
        coordinateFound = true;
      }
    } else if (direction === "U") {
      if (arr[goUp] && arr[goUp][y] && arr[goUp][y] !== " " && arr[x][y] !== "|" && arr[goUp][y] !== "-") {
        // check up
        nextPoint.x = goUp;
        nextPoint.y = y;
        coordinateFound = true;
      }
    }
  }

  return { coordinateFound: coordinateFound, coordinate: nextPoint };
}
