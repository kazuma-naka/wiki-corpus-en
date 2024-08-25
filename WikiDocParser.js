class WikiDocParser {
  constructor() {}

  static titleAndContent(text) {
    const docRegex = /<doc[^>]*title="([^"]*)">([^<]*)<\/doc>/g;
    const newlineRegex = /\r?\n|\r/g;
    const symbolsRegex = /["',:]/g;
    const bracketRegex = /\s*\([^)]*\)\s*/g;
    const duplicateWordRegex = /\b(\w+)\1\b/g;
    try {
      const results = [];
      let match;
      while ((match = docRegex.exec(text)) !== null) {
        const title = WikiDocParser.addSpaceToCamelCase(match[1]);
        const content =
          match[1] === match[2].trim()
            ? null
            : match[2]
                .replace(newlineRegex, "")
                .replace(duplicateWordRegex, "$1")
                .replace(bracketRegex, "")
                .replace(symbolsRegex, "");
        results.push({ title, content });
      }
      return results;
    } catch (err) {
      console.error("Error reading file:", err.message);
      throw err;
    }
  }

  static addSpaceToCamelCase(str) {
    const words = str.split(" ");
    const processedWords = words.map((word) =>
      word.replace(/([a-z])([A-Z])/g, "$1 $2")
    );
    return processedWords.join(" ");
  }

  static createWordNGramsWithCount(text, n) {
    const sentences = text
      .split(".")
      .filter((sentence) => sentence.trim() !== "");
    let nGrams = {};
    sentences.forEach((sentence) => {
      const words = sentence
        .trim()
        .split(" ")
        .filter((word) => word.trim() !== "");
      for (let i = 0; i <= words.length - n; i++) {
        const nGram = words.slice(i, i + n).join(" ");
        if (nGrams[nGram]) {
          nGrams[nGram]++;
        } else {
          nGrams[nGram] = 1;
        }
      }
    });
    const sortedNGrams = Object.entries(nGrams)
      .filter(([key]) => isNaN(key))
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    return sortedNGrams;
  }
}

export default WikiDocParser;
