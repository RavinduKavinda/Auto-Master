const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const sanitize = (string) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(string);
};

module.exports = sanitize;
