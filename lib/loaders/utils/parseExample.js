"use strict";

exports.__esModule = true;
exports.default = parseExample;

var _lowercaseKeys = _interopRequireDefault(require("lowercase-keys"));

var _consts = require("../../scripts/consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasStringModifiers = modifiers => !!modifiers.match(/^[ \w]+$/);

/**
 * Split fenced code block header to lang and modifiers, parse modifiers, lowercase modifier keys, etc.
 */
function parseExample(content, lang, modifiers, updateExample = x => x) {
  const example = {
    content,
    lang
  };

  if (modifiers) {
    if (hasStringModifiers(modifiers)) {
      example.settings = modifiers.split(' ').reduce((obj, modifier) => {
        obj[modifier] = true;
        return obj;
      }, {});
    } else {
      try {
        example.settings = JSON.parse(modifiers);
      } catch (err) {
        return {
          error: `Cannot parse modifiers for "${modifiers}". Use space-separated strings or JSON:\n\n${_consts.DOCS_DOCUMENTING}`
        };
      }
    }
  }

  const updatedExample = updateExample(example);
  return { ...updatedExample,
    settings: (0, _lowercaseKeys.default)(updatedExample.settings || {})
  };
}