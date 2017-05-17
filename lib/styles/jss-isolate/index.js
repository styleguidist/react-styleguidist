'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable */

exports.default = jssIsolate;

var _inherited = require('./inherited');

var _inherited2 = _interopRequireDefault(_inherited);

var _noninherited = require('./noninherited');

var _noninherited2 = _interopRequireDefault(_noninherited);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounce = function debounce(fn) {
	var timeoutId = void 0;
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		clearTimeout(timeoutId);
		timeoutId = setTimeout(function () {
			return fn.apply(undefined, args);
		});
	};
};

var setSelector = debounce(function (rule, selectors) {
	rule.selector = selectors.join(',\n');
});

var getReset = function getReset() {
	var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'inherited';

	switch (option) {
		case 'inherited':
			return _inherited2.default;
		case 'nonInherited':
			return _noninherited2.default;
		case 'all':
			return _extends({}, _inherited2.default, _noninherited2.default);
		default:
			// If option is an object, merge it with the `inherited` props.
			return _extends({}, _inherited2.default, option);
	}
};

function jssIsolate() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var globalIsolate = options.isolate == null ? true : options.isolate;
	var selectors = [];
	var resetSheet = null;
	var resetRule = void 0;

	function onProcessRule(rule, sheet) {
		if (rule.type !== 'regular' || !sheet || sheet === resetSheet || !rule.style) {
			return;
		}

		var parent = rule.options.parent;

		if (parent && (parent.type === 'keyframe' || parent.type === 'conditional')) {
			return;
		}

		var isolate = globalIsolate;
		if (sheet.options.isolate != null) {
			isolate = sheet.options.isolate;
		}
		if (rule.style.isolate != null) {
			isolate = rule.style.isolate;
			delete rule.style.isolate;
		}

		if (isolate === false) {
			return;
		}

		// Option `isolate` may be for e.g. `{isolate: 'root'}`.
		// In this case it must match the rule name in order to isolate it.
		if (isolate !== rule.name && typeof isolate === 'string') {
			return;
		}

		// Create a separate style sheet once and use it for all rules.
		if (!resetSheet && rule.options.jss) {
			resetSheet = rule.options.jss.createStyleSheet({}, {
				link: true,
				meta: 'jss-isolate',
				// Lets make it always the first one in sheets for testing
				// and specificity.
				index: -Infinity
			});
			resetRule = resetSheet.addRule('reset', getReset(options.reset));
			resetSheet.attach();
		}
		if (selectors.indexOf(rule.selector) === -1) {
			selectors.push(rule.selector);
		}
		setSelector(resetRule, selectors);
	};

	return { onProcessRule: onProcessRule };
}