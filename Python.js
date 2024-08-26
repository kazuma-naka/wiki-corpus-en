import { exec } from "child_process";

class Python {
  static isPythonVersionInstalled(versionToCheck) {
    return new Promise((resolve, reject) => {
      exec("python3 --version", (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Error executing python3: ${error.message}`));
          return;
        }

        const versionOutput = stdout || stderr;
        const match = versionOutput.match(/Python (\d+\.\d+\.\d+)/);

        if (match) {
          const installedVersion = Python.extractMajorMinor(match[1]);
          resolve(installedVersion.toString() === versionToCheck.toString());
        } else {
          reject(new Error("Could not parse Python version."));
        }
      });
    });
  }

  static extractMajorMinor(versionString) {
    const parts = versionString.split(".");
    return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : versionString;
  }
}

export default Python;
