import ResolvedCoordinates from "../types/resolved-coordinates";

/**
 * Get previous point
 * @param resolvedCoordinates already resolved-checked coordinates
 * @returns previous coordinate point as a string e.g "x-y", "0-2"
 */
export default function getPreviousPoint(resolvedCoordinates: ResolvedCoordinates) {
  let prevPoint = "";
  if (resolvedCoordinates && Object.keys(resolvedCoordinates).length > 0) {
    const tempArr = Object.keys(resolvedCoordinates);
    const tempPrevPoint = tempArr[tempArr.length - 1];
    if (tempPrevPoint) {
      const tempPrevPointArr = tempPrevPoint.split(":");
      prevPoint = tempPrevPointArr[1];
    }
  }
  return prevPoint;
}
