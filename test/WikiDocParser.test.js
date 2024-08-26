import { fileURLToPath } from "url";
import path from "path";
import { writeFile, readFile, mkdir } from "fs/promises";
import WikiDocParser from "../WikiDocParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("WikiDocParser", () => {
  test.only("Test titleAndContent", () => {
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

  test.only("Test titles from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[0].title).toEqual("Accessible Computing");
    expect(results[1].title).toEqual("Anarchism");
    expect(results[10].title).toEqual("Amoeboid Taxa");
    expect(results[17].title).toEqual("Albedo");
    expect(results[58].title).toEqual("A");
  });

  test("Test contents from file", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[0].content).toEqual(null);
    const contents = results.filter((wikiData) => wikiData.content !== null);
    console.log(`length of results: ${results.length}`);
    console.log(`length of contents not null: ${contents.length}`);
  });

  test("Test content[1] Anarchism that has content", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[1].content).not.toBeNull();
    console.log(`Content of Anarchism:\n`, results[1].content);
  });

  test("Test content[17] Albedo that has content", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[17].content).not.toBeNull();
    console.log(`Content of Albedo:\n`, results[17].content);
  });

  test("Test content[47] Albedo that has content", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[47].content).not.toBeNull();
    console.log(`Content of Albedo:\n`, results[47].content);
  });

  test("Test content[58] A that has content", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    expect(results[58].content).not.toBeNull();
    console.log(`Content of A:\n`, results[58].content);
  });

  test("Test uni-gram from content[1] Anarchism", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const uniGram = WikiDocParser.createWordNGramsWithCount(testContent, 1);
    console.log("uni-gram content[1]:", uniGram);
    console.log("uni-gram size:", Object.keys(uniGram).length);
  });

  test("Test bi-gram from content[1] Anarchism", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const biGram = WikiDocParser.createWordNGramsWithCount(testContent, 2);
    console.log("bi-gram content[1]:", biGram);
    console.log("bi-gram size:", Object.keys(biGram).length);
  });

  test("Test tri-gram from content[1] Anarchism", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[1].content;
    const triGram = WikiDocParser.createWordNGramsWithCount(testContent, 3);
    console.log("tri-gram content[1]:", triGram);
    console.log("tri-gram size:", Object.keys(triGram).length);
  });

  test("Test uni-gram from content[17] Albedo", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[17].content;
    const uniGram = WikiDocParser.createWordNGramsWithCount(testContent, 1);
    console.log("uni-gram content[17]:", uniGram);
    console.log("uni-gram size:", Object.keys(uniGram).length);
  });

  test("Test bi-gram from content[17] Albedo", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[17].content;
    const biGram = WikiDocParser.createWordNGramsWithCount(testContent, 2);
    console.log("bi-gram content[17]:", biGram);
    console.log("bi-gram size:", Object.keys(biGram).length);
  });

  test("Test tri-gram from content[17] Albedo", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[17].content;
    const triGram = WikiDocParser.createWordNGramsWithCount(testContent, 3);
    console.log("tri-gram content[17]:", triGram);
    console.log("tri-gram size:", Object.keys(triGram).length);
  });

  test("Test uni-gram from content[58] A", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[58].content;
    const uniGram = WikiDocParser.createWordNGramsWithCount(testContent, 1);
    console.log("uni-gram content[58]:", uniGram);
    console.log("uni-gram size:", Object.keys(uniGram).length);
  });

  test("Test bi-gram from content[58] A", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[58].content;
    const biGram = WikiDocParser.createWordNGramsWithCount(testContent, 2);
    console.log("bi-gram content[58]:", biGram);
    console.log("bi-gram size:", Object.keys(biGram).length);
  });

  test("Test tri-gram from content[58] A", async () => {
    const filePath = path.join(__dirname, "resources", "wiki-doc-test.txt");
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const testContent = results[58].content;
    const triGram = WikiDocParser.createWordNGramsWithCount(testContent, 3);
    console.log("tri-gram content[58]:", triGram);
    console.log("tri-gram size:", Object.keys(triGram).length);
  });

  test("Test creating uni-gram from small test data and write it", async () => {
    const filePath = path.join(
      __dirname,
      "resources",
      "wiki-doc-test-small.txt"
    );
    const mockData = await readFile(filePath, "utf8");
    const results = WikiDocParser.titleAndContent(mockData);
    const resultsContentNotNull = results.filter(
      (wikiData) => wikiData.content !== null
    );
    const uniGram = resultsContentNotNull.map((wikiData) => {
      return WikiDocParser.createWordNGramsWithCount(wikiData.content, 1);
    });
    const mergedUniGram = WikiDocParser.mergeObjectsFromArray(uniGram);
    const json = JSON.stringify(mergedUniGram, null, 2);
    const outFilePath = path.join(__dirname, "output", "test_output_small.txt");
    await mkdir(path.dirname(outFilePath), { recursive: true });
    await writeFile(outFilePath, json, "utf8");
  });
});
