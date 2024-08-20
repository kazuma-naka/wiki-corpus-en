import { fileURLToPath } from "url";
import path from "path";
import { readFile } from "fs/promises";
import { jest } from "@jest/globals";
import WikiDocParser from "../WikiDocParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

jest.mock("fs/promises");

describe("WikiDocParser", () => {
  test("Test titleAndContent", () => {
    const mockData = `
      <doc title="Sample Title 1">Sample content 1</doc>
      <doc title="Sample Title 2">Sample content 2</doc>
    `;
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results).toEqual([
      { title: "Sample Title 1", content: "Sample content 1" },
      { title: "Sample Title 2", content: "Sample content 2" },
    ]);
  });

  test("Test titleAndContent from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results.length).toEqual(7021);
    expect(results[0].title).toEqual("AccessibleComputing");
  });
});
