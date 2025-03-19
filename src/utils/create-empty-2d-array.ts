function createEmpty2dArray() {
  const emptyArray: string[][] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (!emptyArray[i]) {
        emptyArray[i] = [];
      }
      emptyArray[i][j] = "";
    }
  }

  return emptyArray;
}

export default createEmpty2dArray;
