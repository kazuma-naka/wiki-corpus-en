class WikiDocParser {
  constructor() {}

  static titleAndContent(text) {
    const regex = /<doc[^>]*title="([^"]*)">([^<]*)<\/doc>/g;
    try {
      const results = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        const title = match[1];
        const content = match[2];
        results.push({ title, content });
      }
      return results;
    } catch (err) {
      console.error("Error reading file:", err.message);
      throw err;
    }
  }
}

export default WikiDocParser;
