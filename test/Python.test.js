import Python from "../Python.js";

describe("Python.js", () => {
  test.only("Test to check Python version 3.7", async () => {
    const requiredVersion = 3.7;
    const result = await Python.isPythonVersionInstalled(requiredVersion);
    if (result) {
      console.log(`Python version ${requiredVersion} is installed.`);
    } else {
      console.log(`Python version ${requiredVersion} is not installed.`);
    }
  });
});
