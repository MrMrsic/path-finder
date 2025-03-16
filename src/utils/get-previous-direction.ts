import ResolvedCoordinates from "../types/resolved-coordinates";

/**
 * Determine direction inside coordinate system based on already resolved-checked coordinates
 * @param resolvedCoordinates
 * @returns direction: R (right) | D (down) | L (left) | U (up) or empty string if direction not found
 */
export default function getPreviousDirection(resolvedCoordinates: ResolvedCoordinates) {
  let prevDirection = "";
  if (resolvedCoordinates && Object.keys(resolvedCoordinates).length > 0) {
    const tempArr = Object.keys(resolvedCoordinates);
    const tempPrevPoint = tempArr[tempArr.length - 1];
    if (tempPrevPoint) {
      const tempPrevPointArr: string[] = tempPrevPoint.split(":");
      const sourceX = parseInt(tempPrevPointArr[1].split("-")[0]);
      const sourceY = parseInt(tempPrevPointArr[1].split("-")[1]);
      const targetX = parseInt(tempPrevPointArr[2].split("-")[0]);
      const targetY = parseInt(tempPrevPointArr[2].split("-")[1]);

      if (targetX > sourceX) {
        prevDirection = "D";
      } else if (targetX < sourceX) {
        prevDirection = "U";
      } else if (sourceX === targetX) {
        if (targetY > sourceY) {
          prevDirection = "R";
        } else if (targetY < sourceY) {
          prevDirection = "L";
        }
      }
    }
  }
  return prevDirection;
}
