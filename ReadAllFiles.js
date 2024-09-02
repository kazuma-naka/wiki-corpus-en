import { promises as fs } from "fs";
import path from "path";

export default async function readAllFiles(dir) {
  let files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (let item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const subDirFiles = await readAllFiles(fullPath);
      files = files.concat(subDirFiles);
    } else if (item.isFile()) {
      const content = await fs.readFile(fullPath, "utf-8");
      files.push({ path: fullPath, content });
    }
  }
  return files;
}
