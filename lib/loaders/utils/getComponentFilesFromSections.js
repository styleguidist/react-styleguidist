"use strict";

exports.__esModule = true;
exports.default = getComponentFilesFromSections;

var _getComponentFiles = _interopRequireDefault(require("./getComponentFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return absolute paths of all components in sections.
 *
 * @param {Array} sections
 * @param {string} rootDir
 * @param {Array} [ignore] Glob patterns to ignore.
 * @returns {Array}
 */
function getComponentFilesFromSections(sections, rootDir, ignore) {
  return sections.reduce((components, section) => {
    if (section.components) {
      return components.concat((0, _getComponentFiles.default)(section.components, rootDir, ignore));
    }

    if (section.sections) {
      return components.concat(getComponentFilesFromSections(section.sections, rootDir, ignore));
    }

    return components;
  }, []);
}