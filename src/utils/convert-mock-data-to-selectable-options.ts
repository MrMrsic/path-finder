import { MockDataList } from "../types/mock-data";

function convertMockDataToSelectOptions(mockData: MockDataList) {
  const options = [];
  for (const mockId in mockData) {
    const selectOption = {
      value: mockId,
      label: mockData[mockId].title,
    };
    options.push(selectOption);
  }

  return options;
}

export default convertMockDataToSelectOptions;
