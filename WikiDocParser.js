class WikiDocParser {
  constructor() {}

  static titleAndContent(text) {
    const docRegex = /<doc[^>]*title="([^"]*)">([^<]*)<\/doc>/g;
    const newlineRegex = /\r?\n|\r/g;
    const symbolsRegex = /[\\[\]"',:;~?()…\/*“”‘’]/g;
    const symbolsRegexWithSpace = /[-!|#=+]/g;
    const startWithAndRegex = /&\S+/g;
    const bracketRegex = /\s*\([^)]*\)\s*/g;
    const duplicateWordRegex = /\b(\w+)\1\b/g;
    const laTexRegex = /formula_\d*/g;
    const numberWithoutSpaceRegex = /(\d)to/g;
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
                .replace(symbolsRegex, "")
                .replace(laTexRegex, "")
                .replace(numberWithoutSpaceRegex, `$1 to`)
                .replace(symbolsRegexWithSpace, " ")
                .replace(startWithAndRegex, "")
                .replace("albedowhere", "")
                .replace("AmericA", "America")
                .replace("ActresseS", "Actresses")
                .replace("&amp", "&");
        results.push({ title, content });
      }
      return results;
    } catch (err) {
      console.error("Error reading file:", err.message);
      throw err;
    }
  }

  static addSpaceToCamelCase(str) {
    if (str === "AmericA") return "America";
    if (str === "AndorrA") return "Andorra";
    if (str === "ActresseS") return "Actresses";
    const words = str.split(" ");
    const processedWords = words.map((word) =>
      word.replace(/([a-z])([A-Z])/g, "$1 $2")
    );
    return processedWords.join(" ");
  }

  static createWordNGramsWithCount(text, n) {
    const nGrams = text
      .split(".")
      .flatMap((sentence) => {
        const words = sentence.trim().split(/\s+/).filter(Boolean);
        return Array.from({ length: words.length - n + 1 }, (_, i) =>
          words.slice(i, i + n).join(" ")
        );
      })
      .filter(Boolean)
      .reduce((acc, nGram) => {
        acc[nGram] = (acc[nGram] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(nGrams)
      .filter(([key]) => isNaN(key))
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
  }

  static mergeObjectsFromArray(objectsArray) {
    const mergedObject = objectsArray.reduce((acc, obj) => {
      for (let key in obj) {
        if (acc[key]) {
          acc[key] += obj[key];
        } else {
          acc[key] = obj[key];
        }
      }
      return acc;
    }, {});
    const sortedEntries = Object.entries(mergedObject).sort(
      ([, a], [, b]) => b - a
    );
    const sortedObject = Object.fromEntries(sortedEntries);
    return sortedObject;
  }
}

export default WikiDocParser;
