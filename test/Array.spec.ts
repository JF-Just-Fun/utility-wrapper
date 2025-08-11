import { flatMap } from "../src/Array";

describe("flatMap", () => {
  it("should flatten the nested objects based on the specified key", () => {
    const resource = [
      {
        id: 1,
        name: "Item 1",
        children: [
          {
            id: 2,
            name: "Item 1.1",
            children: [],
          },
          {
            id: 3,
            name: "Item 1.2",
            children: [
              {
                id: 4,
                name: "Item 1.2.1",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Item 2",
        children: [],
      },
    ];

    const expectedOutput = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 1.1" },
      { id: 3, name: "Item 1.2" },
      { id: 4, name: "Item 1.2.1" },
      { id: 5, name: "Item 2" },
    ];

    expect(flatMap(resource, "children")).toEqual(expectedOutput);
  });

  it("should handle empty arrays gracefully", () => {
    const resource = [];

    const expectedOutput = [];

    expect(flatMap(resource, "children")).toEqual(expectedOutput);
  });

  it("should remove the specified key from the output objects", () => {
    const resource = [
      {
        id: 1,
        name: "Item 1",
        children: [{ id: 2, name: "Item 1.1", children: [] }],
      },
    ];

    const expectedOutput = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 1.1" },
    ];

    expect(flatMap(resource, "children")).toEqual(expectedOutput);
  });

  it("should work with different keys", () => {
    const resource = [
      {
        id: 1,
        name: "Item 1",
        nodes: [{ id: 2, name: "Item 1.1", nodes: [] }],
      },
    ];

    const expectedOutput = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 1.1" },
    ];

    expect(flatMap(resource, "nodes")).toEqual(expectedOutput);
  });

  it("should handle non-array values for the specified key correctly", () => {
    const resource = [
      { id: 1, name: "Item 1", children: null },
      { id: 2, name: "Item 2", children: undefined },
      { id: 3, name: "Item 3", children: "not an array" },
    ];

    const expectedOutput = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    expect(flatMap(resource, "children")).toEqual(expectedOutput);
  });
});
