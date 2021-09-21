"use strict";

exports.__esModule = true;
exports.default = getSections;
exports.processSection = processSection;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _requireIt = _interopRequireDefault(require("./requireIt"));

var _getComponentFiles = _interopRequireDefault(require("./getComponentFiles"));

var _getComponents = _interopRequireDefault(require("./getComponents"));

var _slugger = _interopRequireDefault(require("./slugger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This two functions should be in the same file because of cyclic imports
const examplesLoader = _path.default.resolve(__dirname, '../examples-loader.js');

function processSectionContent(section, config) {
  if (!section.content) {
    return undefined;
  }

  const contentRelativePath = section.content;

  if (_lodash.default.isFunction(section.content)) {
    return {
      type: 'markdown',
      content: section.content()
    };
  } // Try to load section content file


  const contentAbsolutePath = _path.default.resolve(config.configDir, contentRelativePath);

  if (!_fs.default.existsSync(contentAbsolutePath)) {
    throw new Error(`Styleguidist: Section content file not found: ${contentAbsolutePath}`);
  }

  return (0, _requireIt.default)(`!!${examplesLoader}!${contentAbsolutePath}`);
}

const getSectionComponents = (section, config) => {
  let ignore = config.ignore ? _lodash.default.castArray(config.ignore) : [];

  if (section.ignore) {
    ignore = ignore.concat(_lodash.default.castArray(section.ignore));
  }

  return (0, _getComponents.default)((0, _getComponentFiles.default)(section.components, config.configDir, ignore), config);
};
/**
 * Return object for one level of sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @param {number} parentDepth
 * @returns {Array}
 */


function getSections(sections, config, parentDepth) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return sections.map(section => processSection(section, config, parentDepth));
}
/**
 * Return an object for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @param {number} parentDepth
 * @returns {object}
 */


function processSection(section, config, parentDepth) {
  const content = processSectionContent(section, config);
  let sectionDepth;

  if (parentDepth === undefined) {
    sectionDepth = section.sectionDepth !== undefined ? section.sectionDepth : 0;
  } else {
    sectionDepth = parentDepth === 0 ? 0 : parentDepth - 1;
  }

  return { ...section,
    exampleMode: section.exampleMode || config.exampleMode,
    usageMode: section.usageMode || config.usageMode,
    sectionDepth,
    slug: `section-${_slugger.default.slug(section.name || 'untitled')}`,
    sections: getSections(section.sections || [], config, sectionDepth),
    href: section.href,
    components: getSectionComponents(section, config),
    content
  };
}