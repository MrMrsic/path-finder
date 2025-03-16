export interface MockData {
  title: string;
  description: string;
  characters: string[][];
  expected_result?: {
    letters: string;
    path: string;
  };
}

export interface MockDataList {
  [id: string]: MockData;
}
