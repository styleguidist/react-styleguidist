'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _theme = require('./theme');

var theme = _interopRequireWildcard(_theme);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _memoize2.default)(function (styles, config, componentName) {
	var mergedTheme = (0, _merge2.default)(theme, config.theme);
	var mergedStyles = (0, _merge2.default)(styles(mergedTheme), config.styles && config.styles[componentName]);
	return _jss2.default.createStyleSheet(mergedStyles, { meta: componentName }).attach().classes;
});