import { fileURLToPath } from "url";
import path from "path";
import { readFile } from "fs/promises";
import WikiDocParser from "../WikiDocParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  });

  test("Test titles from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[0].title).toEqual("Accessible Computing");
  });

  test("Test contents from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    //console.log(`content content[1]: ${results[1].content}`);
    expect(results[0].content).toEqual(null);
  });

  test("Test uni-gram from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const uniGram = WikiDocParser.createWordNGramsWithCount(testContent, 1);
    console.log("uni-gram content[1]:", uniGram, Object.keys(uniGram).length);
  });

  test("Test bi-gram from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const biGram = WikiDocParser.createWordNGramsWithCount(testContent, 2);
    console.log("bi-gram content[1]:", biGram, Object.keys(biGram).length);
  });

  test("Test tri-gram from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const triGram = WikiDocParser.createWordNGramsWithCount(testContent, 3);
    console.log("tri-gram content[1]:", triGram);
  });
});
