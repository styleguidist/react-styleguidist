'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// XXX: Waiting for release:
// https://github.com/cssinjs/jss-isolate/commit/c09c9355dfa02374971b8d929d13e651ac301990
// https://github.com/cssinjs/jss-isolate/pull/9


var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssIsolate = require('./jss-isolate');

var _jssIsolate2 = _interopRequireDefault(_jssIsolate);

var _noninherited = require('./jss-isolate/noninherited');

var _noninherited2 = _interopRequireDefault(_noninherited);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssDefaultUnit = require('jss-default-unit');

var _jssDefaultUnit2 = _interopRequireDefault(_jssDefaultUnit);

var _jssCompose = require('jss-compose');

var _jssCompose2 = _interopRequireDefault(_jssCompose);

var _jssGlobal = require('jss-global');

var _jssGlobal2 = _interopRequireDefault(_jssGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss2.default.setup({
	plugins: [(0, _jssGlobal2.default)(), (0, _jssIsolate2.default)({
		reset: _extends({}, _noninherited2.default, {

			// “Global” styles for all components
			boxSizing: 'border-box',

			// Allow inheritance because it may be set on body and should be available for user components
			fontFamily: 'inherit'
		})
	}), (0, _jssNested2.default)(), (0, _jssCamelCase2.default)(), (0, _jssDefaultUnit2.default)(), (0, _jssCompose2.default)()]
});