import { useEffect, useState } from "react";
import convertMockDataToSelectOptions from "../utils/convert-mock-data-to-selectable-options";
import { SelectOption } from "../types/select-options";
import validMockData from "../__mock-data__/valid-examples";
import invalidMockData from "../__mock-data__/invalid-examples";
import { MockDataList } from "../types/mock-data";

function useExamplesData(): {
  validMockData: MockDataList;
  invalidMockData: MockDataList;
  validOptions: SelectOption[];
  invalidOptions: SelectOption[];
} {
  const [validOptions, setValidOptions] = useState<SelectOption[]>([]);
  const [invalidOptions, setInvalidOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const validExamples = convertMockDataToSelectOptions(validMockData);
    setValidOptions(validExamples);
    const invalidExamples = convertMockDataToSelectOptions(invalidMockData);
    setInvalidOptions(invalidExamples);
  }, []);

  return {
    validMockData,
    invalidMockData,
    validOptions,
    invalidOptions,
  };
}

export default useExamplesData;
