/**
 * Validates input array (2d array)
 * @param arr 2d array
 * @returns array of strings - error messages
 */
export default function validateInputArray(arr: string[][]): string[] {
  let startPointCounter = 0;
  let endPointCounter = 0;
  let forkInPath = false;
  let multipleStartPaths = false;
  let fakeTurn = false;
  const errors: string[] = [];

  for (let x = 0; x < arr.length; x++) {
    const row = arr[x];
    startPointCounter += row.filter((val: string) => val === "@").length;
    endPointCounter += row.filter((val: string) => val === "x").length;

    for (let y = 0; y < row.length; y++) {
      const col = arr[x][y];
      if (col === "+" && !forkInPath) {
        forkInPath = hasForkInPath(arr, x, y);
      }
      if (col === "+" && !fakeTurn) {
        fakeTurn = hasFakeTurn(arr, x, y);
      }
      if (col === "@" && !multipleStartPaths) {
        multipleStartPaths = hasMultipleStartPaths(arr, x, y);
      }
    }
  }

  if (startPointCounter === 0) {
    errors.push("Missing start character!");
  } else if (startPointCounter > 1) {
    errors.push("Multiple start points!");
  }
  if (endPointCounter === 0) {
    errors.push("Missing end character!");
  }
  if (forkInPath) {
    errors.push("Fork in path!");
  }
  if (multipleStartPaths) {
    errors.push("Multiple starting paths!");
  }
  if (fakeTurn) {
    errors.push("Fake turn!");
  }

  return errors;
}

/**
 * Check if "+" character is sorrounded with more than two valid characters (e.g 3 or 4)
 */
export function hasForkInPath(arr: string[][], x: number, y: number) {
  const goRight: number = y + 1;
  const goDown: number = x + 1;
  const goLeft: number = y - 1;
  const goUp: number = x - 1;
  let charsAroundConuter = 0;

  if (arr[goDown] && arr[goDown][y] && arr[goDown][y] !== " " && arr[goDown][y] !== "-") {
    charsAroundConuter++;
  }
  if (arr[goUp] && arr[goUp][y] && arr[goUp][y] !== " " && arr[goUp][y] !== "-") {
    charsAroundConuter++;
  }
  if (arr[x] && arr[x][goLeft] && arr[x][goLeft] !== " " && arr[x][goLeft] !== "|") {
    charsAroundConuter++;
  }
  if (arr[x] && arr[x][goRight] && arr[x][goRight] !== " " && arr[x][goRight] !== "|") {
    charsAroundConuter++;
  }

  const hasFork: boolean = charsAroundConuter > 2 ? true : false;
  return hasFork;
}

/**
 * Check if "@" character is sorrounded with more than one valid characters (e.g 2)
 */
export function hasMultipleStartPaths(arr: string[][], x: number, y: number) {
  const goRight: number = y + 1;
  const goDown: number = x + 1;
  const goLeft: number = y - 1;
  const goUp: number = x - 1;
  let charsAroundConuter = 0;

  if (arr[goDown] && arr[goDown][y] && arr[goDown][y] !== " ") {
    charsAroundConuter++;
  }
  if (arr[goUp] && arr[goUp][y] && arr[goUp][y] !== " ") {
    charsAroundConuter++;
  }
  if (arr[x] && arr[x][goLeft] && arr[x][goLeft] !== " ") {
    charsAroundConuter++;
  }
  if (arr[x] && arr[x][goRight] && arr[x][goRight] !== " ") {
    charsAroundConuter++;
  }

  const hasMultiplePaths: boolean = charsAroundConuter > 1 ? true : false;
  return hasMultiplePaths;
}

/**
 * Check if "+" character has fake turn - keeps the same direction (e.g -+-)
 */
export function hasFakeTurn(arr: string[][], x: number, y: number) {
  const goRight: number = y + 1;
  const goDown: number = x + 1;
  const goLeft: number = y - 1;
  const goUp: number = x - 1;
  let fakeTurn = false;

  if (
    arr[x] &&
    arr[x][goLeft] &&
    arr[x][goLeft] !== " " &&
    arr[x][goLeft] !== "|" &&
    arr[x] &&
    arr[x][goRight] &&
    arr[x][goRight] !== " " &&
    arr[x][goRight] !== "|"
  ) {
    if (
      !(arr[goUp] && arr[goUp][y] && arr[goUp][y] !== " " && arr[goUp][y] !== "-") &&
      !(arr[goDown] && arr[goDown][y] && arr[goDown][y] !== " " && arr[goDown][y] !== "-")
    ) {
      fakeTurn = true;
    }
  } else if (
    arr[goUp] &&
    arr[goUp][y] &&
    arr[goUp][y] !== " " &&
    arr[goUp][y] !== "-" &&
    arr[goDown] &&
    arr[goDown][y] &&
    arr[goDown][y] !== " " &&
    arr[goDown][y] !== "-"
  ) {
    if (
      !(arr[x] && arr[x][goLeft] && arr[x][goLeft] !== " " && arr[x][goLeft] !== "|") &&
      !(arr[x] && arr[x][goRight] && arr[x][goRight] !== " " && arr[x][goRight] !== "|")
    ) {
      fakeTurn = true;
    }
  }

  return fakeTurn;
}

/**
 * Check if coordinate is dead-end street and is followed with broken path
 */
export function hasBrokenPath(arr: string[][], x: number, y: number, direction: string) {
  let goRight, goDown, goLeft, goUp;
  let brokenPath = false;

  if (direction) {
    if (direction === "R" && !brokenPath) {
      goRight = y + 2;
      if (arr[x] && arr[x][goRight] && arr[x][goRight] !== " " && arr[x][goRight] !== "|") {
        brokenPath = true;
      }
      goRight = y + 1;
      goUp = x - 1;
      if (arr[goUp] && arr[goUp][goRight] && arr[goUp][goRight] !== " " && arr[goUp][goRight] !== "-") {
        brokenPath = true;
      }
      goRight = y + 1;
      goDown = x + 1;
      if (arr[goDown] && arr[goDown][goRight] && arr[goDown][goRight] !== " " && arr[goDown][goRight] !== "-") {
        brokenPath = true;
      }
    } else if (direction === "D" && !brokenPath) {
      goDown = x + 2;
      if (arr[goDown] && arr[goDown][y] && arr[goDown][y] !== " " && arr[goDown][y] !== "-") {
        brokenPath = true;
      }
      goDown = x + 1;
      goRight = y + 1;
      goLeft = y - 1;
      if (arr[goDown] && arr[goDown][goRight] && arr[goDown][goRight] !== " " && arr[goDown][goRight] !== "|") {
        brokenPath = true;
      }
      if (arr[goDown] && arr[goDown][goLeft] && arr[goDown][goLeft] !== " " && arr[goDown][goLeft] !== "|") {
        brokenPath = true;
      }
    } else if (direction === "L" && !brokenPath) {
      goLeft = y - 2;
      if (arr[x] && arr[x][goLeft] && arr[x][goLeft] !== " " && arr[x][goLeft] !== "|") {
        brokenPath = true;
      }
      goLeft = y - 1;
      goUp = x - 1;
      goDown = x + 1;
      if (arr[goUp] && arr[goUp][goLeft] && arr[goUp][goLeft] !== " " && arr[goUp][goLeft] !== "-") {
        brokenPath = true;
      }
      if (arr[goDown] && arr[goDown][goLeft] && arr[goDown][goLeft] !== " " && arr[goDown][goLeft] !== "-") {
        brokenPath = true;
      }
    } else if (direction === "U" && !brokenPath) {
      goUp = x - 2;
      if (arr[goUp] && arr[goUp][y] && arr[goUp][y] !== " " && arr[goUp][y] !== "-") {
        brokenPath = true;
      }
      goUp = x - 1;
      goRight = y + 1;
      goLeft = y - 1;
      if (arr[goUp] && arr[goUp][goRight] && arr[goUp][goRight] !== " " && arr[goUp][goRight] !== "|") {
        brokenPath = true;
      }
      if (arr[goUp] && arr[goUp][goLeft] && arr[goUp][goLeft] !== " " && arr[goUp][goLeft] !== "|") {
        brokenPath = true;
      }
    }
  }

  return brokenPath;
}
