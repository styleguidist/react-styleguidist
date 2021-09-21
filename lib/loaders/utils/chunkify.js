"use strict";

exports.__esModule = true;
exports.default = chunkify;

var _remark = _interopRequireDefault(require("remark"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _highlightCode = _interopRequireDefault(require("./highlightCode"));

var _parseExample = _interopRequireDefault(require("./parseExample"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLAYGROUND_LANGS = ['javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx'];
const CODE_PLACEHOLDER = '<%{#code#}%>';

function isErrorExample(example) {
  return !!example.error;
}
/**
 * Separate Markdown and code examples that should be rendered as a playground in a style guide.
 *
 * @param {string} markdown
 * @param {Function} updateExample
 * @param {Array<string>} playgroundLangs
 * @returns {Array}
 */


function chunkify(markdown, updateExample, playgroundLangs = PLAYGROUND_LANGS) {
  const codeChunks = [];
  /*
   * - Highlight code in fenced code blocks with defined language (```html).
   * - Extract indented and fenced code blocks with lang javascript|js|jsx or if lang is not defined.
   * - Leave all other Markdown or HTML as is.
   */

  function processCode() {
    return ast => {
      (0, _unistUtilVisit.default)(ast, 'code', node => {
        const example = (0, _parseExample.default)(node.value, node.lang, node.meta, updateExample);

        if (isErrorExample(example)) {
          node.lang = undefined;
          node.value = example.error;
          return;
        }

        const lang = example.lang;
        node.lang = lang;

        if (!lang || playgroundLangs.indexOf(lang) !== -1 && !(example.settings && example.settings.static)) {
          codeChunks.push({
            type: 'code',
            content: example.content,
            settings: example.settings
          });
          node.type = 'html';
          node.value = CODE_PLACEHOLDER;
        } else {
          node.meta = null;
          node.value = (0, _highlightCode.default)(example.content, lang);
        }
      });
    };
  }

  const rendered = (0, _remark.default)().use(processCode).processSync(markdown).toString();
  const chunks = [];
  const textChunks = rendered.split(CODE_PLACEHOLDER);
  textChunks.forEach(chunk => {
    chunk = chunk.trim();

    if (chunk) {
      chunks.push({
        type: 'markdown',
        content: chunk
      });
    }

    const code = codeChunks.shift();

    if (code) {
      chunks.push(code);
    }
  });
  return chunks;
}