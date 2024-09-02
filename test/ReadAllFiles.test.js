import { fileURLToPath } from "url";
import path from "path";
import { writeFile, readFile, mkdir } from "fs/promises";
import WikiDocParser from "../WikiDocParser.js";
import readAllFiles from "../ReadAllFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("ReadAllFiles.js", () => {
  test("Test read text files in all directories", async () => {
    const directories = ["test/resources/AA", "test/resources/AB"];
    for (let dir of directories) {
      const files = await readAllFiles(dir);
      files.forEach((file) => {
        console.log(`File: ${file.path}\nContent:\n${file.content}\n`);
      });
    }
  });

  test("Test read text files in all directories and create n gram output in separate directories", async () => {
    const directories = ["test/resources/AA", "test/resources/AB"];
    for (let dir of directories) {
      const files = await readAllFiles(dir);
      for (let file of files) {
        const mockData = file.content;
        const results = WikiDocParser.titleAndContent(mockData);
        const resultsContentNotNull = results.filter(
          (wikiData) => wikiData.content !== null
        );
        const uniGram = resultsContentNotNull.map((wikiData) => {
          return WikiDocParser.createWordNGramsWithCount(wikiData.content, 1);
        });
        const mergedUniGram = WikiDocParser.mergeObjectsFromArray(uniGram);
        const json = JSON.stringify(mergedUniGram, null, 2);
        const outFilePath = path.join(
          __dirname,
          "output",
          `test_output_combined_${file.path}.txt`
        );
        await mkdir(path.dirname(outFilePath), { recursive: true });
        await writeFile(outFilePath, json, "utf8");
      }
    }
  });

  test.only("Test read text files in all directories and create n gram", async () => {
    const directories = ["test/resources/AA", "test/resources/AB"];
    let combinedUniGram = {};

    for (let dir of directories) {
      const files = await readAllFiles(dir);
      for (let file of files) {
        const mockData = file.content;
        const results = WikiDocParser.titleAndContent(mockData);
        const resultsContentNotNull = results.filter(
          (wikiData) => wikiData.content !== null
        );
        const uniGram = resultsContentNotNull.map((wikiData) => {
          return WikiDocParser.createWordNGramsWithCount(wikiData.content, 1);
        });
        const mergedUniGram = WikiDocParser.mergeObjectsFromArray(uniGram);

        combinedUniGram = WikiDocParser.mergeObjectsFromArray([
          combinedUniGram,
          mergedUniGram,
        ]);
      }
    }

    const outFilePath = path.join(
      __dirname,
      "output",
      "test_output_combined.txt"
    );
    await mkdir(path.dirname(outFilePath), { recursive: true });
    const json = JSON.stringify(combinedUniGram, null, 2);
    await writeFile(outFilePath, json, "utf8");
  });
});
