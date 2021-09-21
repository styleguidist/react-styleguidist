"use strict";

exports.__esModule = true;
exports.default = highlightCode;

var _glogg = _interopRequireDefault(require("glogg"));

var Prism = _interopRequireWildcard(require("prismjs"));

require("prismjs/components/prism-clike");

require("prismjs/components/prism-markup");

require("prismjs/components/prism-markdown");

require("prismjs/components/prism-css");

require("prismjs/components/prism-css-extras");

require("prismjs/components/prism-scss");

require("prismjs/components/prism-less");

require("prismjs/components/prism-javascript");

require("prismjs/components/prism-flow");

require("prismjs/components/prism-typescript");

require("prismjs/components/prism-jsx");

require("prismjs/components/prism-tsx");

require("prismjs/components/prism-graphql");

require("prismjs/components/prism-json");

require("prismjs/components/prism-bash");

require("prismjs/components/prism-diff");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _glogg.default)('rsg');
const IGNORED_LANGUAGES = ['extend', 'insertBefore', 'DFS'];

const getLanguages = () => Object.keys(Prism.languages).filter(x => !IGNORED_LANGUAGES.includes(x));
/**
 * Highlight code.
 *
 * @param {string} code
 * @param {string} lang
 * @returns {string}
 */


function highlightCode(code, lang) {
  if (!lang) {
    return code;
  }

  const grammar = Prism.languages[lang];

  if (!grammar) {
    logger.warn(`Syntax highlighting for “${lang}” isn’t supported. Supported languages are: ${getLanguages().join(', ')}.`);
    return code;
  }

  return Prism.highlight(code, grammar, lang);
}