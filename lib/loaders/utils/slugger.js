"use strict";

exports.__esModule = true;
exports.default = void 0;

var _githubSlugger = _interopRequireDefault(require("github-slugger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export the singleton instance of GithubSlugger
var _default = new _githubSlugger.default();

exports.default = _default;