"use strict";

exports.__esModule = true;
exports.default = highlightCodeInMarkdown;

var _remark = _interopRequireDefault(require("remark"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _highlightCode = _interopRequireDefault(require("./highlightCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function highlight() {
  return ast => {
    (0, _unistUtilVisit.default)(ast, 'code', node => {
      node.value = (0, _highlightCode.default)(node.value, node.lang);
    });
  };
}
/**
 * Highlight code in code snippets in Markdown.
 *
 * @param {string} markdown
 * @returns {string}
 */


function highlightCodeInMarkdown(markdown) {
  return (0, _remark.default)().use(highlight).processSync(markdown).toString();
}