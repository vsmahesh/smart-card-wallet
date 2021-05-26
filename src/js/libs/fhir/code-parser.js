export const CodeParser = Object.freeze({
  parse: (code) => {
    if (code.text) return code.text;
    if (code.coding) {
      const firstCoding = code.coding[0];
      if (firstCoding?.display) {
        return firstCoding.display;
      }
      if (firstCoding) {
        return `${firstCoding.code} (${firstCoding.system})`;
      }
    }
    return undefined;
  },
});
