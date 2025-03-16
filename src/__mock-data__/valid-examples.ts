import { MockDataList } from "../types/mock-data";

const validMockData: MockDataList = {
    example_1: {
        title: "A basic example",
        description: "",
        characters: [
            [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
            [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C"],
            [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+"],
        ],
        expected_result: {
            letters: "ACB",
            path: "@---A---+|C|+---+|+-B-x",
        },
    },
    example_2: {
        title: "Go straight through intersections",
        description: "",
        characters: [
            [" ", " ", "@"],
            [" ", " ", "|", " ", "+", "-", "C", "-", "-", "+"],
            [" ", " ", "A", " ", "|", " ", " ", " ", " ", "|"],
            [" ", " ", "+", "-", "-", "-", "B", "-", "-", "+"],
            [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
            [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
            [" ", " ", " ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
        ],
        expected_result: {
            letters: "ABCD",
            path: "@|A+---B--+|+--C-+|-||+---D--+|x",
        },
    },
    example_3: {
        title: "Letters may be found on turns",
        description: "",
        characters: [
            [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
            [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "C"],
        ],
        expected_result: {
            letters: "ACB",
            path: "@---A---+|||C---+|+-B-x",
        },
    },
    example_4: {
        title: "Do not collect a letter from the same location twice",
        description: "",
        characters: [
            [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
            [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
            [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
            [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
            [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
        ],
        expected_result: {
            letters: "GOONIES",
            path: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
        },
    },
    example_5: {
        title: "Keep direction, even in a compact space",
        description: "",
        characters: [
            [" ", "+", "-", "L", "-", "+"],
            [" ", "|", " ", " ", "+", "A", "-", "+"],
            ["@", "B", "+", " ", "+", "+", " ", "H"],
            [" ", "+", "+", " ", " ", " ", " ", "x"],
        ],
        expected_result: {
            letters: "BLAH",
            path: "@B+++B|+-L-+A+++A-+Hx",
        },
    },
    example_6: {
        title: "Ignore stuff after end of path",
        description: "",
        characters: [
            [" ", " ", "@", "-", "A", "-", "-", "+"],
            [" ", " ", " ", " ", " ", " ", " ", "|"],
            [" ", " ", " ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
        ],
        expected_result: {
            letters: "AB",
            path: "@-A--+|+-B--x",
        },
    },
};

export default validMockData;
