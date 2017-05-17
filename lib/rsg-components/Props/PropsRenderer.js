'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PropsRenderer = PropsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGroup = require('react-group');

var _reactGroup2 = _interopRequireDefault(_reactGroup);

var _Arguments = require('rsg-components/Arguments');

var _Arguments2 = _interopRequireDefault(_Arguments);

var _Code = require('rsg-components/Code');

var _Code2 = _interopRequireDefault(_Code);

var _JsDoc = require('rsg-components/JsDoc');

var _JsDoc2 = _interopRequireDefault(_JsDoc);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Name = require('rsg-components/Name');

var _Name2 = _interopRequireDefault(_Name);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize;
	return {
		table: {
			width: '100%',
			borderCollapse: 'collapse'
		},
		tableHead: {
			borderBottom: [[1, color.border, 'solid']]
		},
		cell: {
			color: color.base,
			paddingRight: space[2],
			paddingTop: space[1],
			verticalAlign: 'top',
			fontFamily: fontFamily.base,
			fontSize: fontSize.small
		},
		cellHeading: {
			color: color.base,
			paddingRight: space[2],
			paddingBottom: space[1],
			textAlign: 'left',
			fontFamily: fontFamily.base,
			fontWeight: 'bold',
			fontSize: fontSize.small
		},
		cellDesc: {
			color: color.base,
			width: '99%',
			paddingLeft: space[2],
			paddingRight: 0
		},
		required: {
			fontFamily: fontFamily.base,
			fontSize: fontSize.small,
			color: color.light
		},
		name: {
			fontSize: fontSize.small,
			color: color.name
		},
		type: {
			fontSize: fontSize.small,
			color: color.type
		},
		function: {
			fontFamily: fontFamily.base,
			fontSize: fontSize.small,
			color: color.light,
			borderBottom: [[1, 'dotted', color.lightest]]
		},
		heading: {
			marginBottom: 3,
			fontWeight: 'bold',
			fontSize: 13
		},
		para: {
			marginBottom: 15,
			fontSize: 13
		}
	};
};

function renderType(type) {
	if (!type) {
		return 'unknown';
	}

	var name = type.name;


	switch (name) {
		case 'arrayOf':
			return type.value.name + '[]';
		case 'objectOf':
			return '{' + renderType(type.value) + '}';
		case 'instanceOf':
			return type.value;
		default:
			return name;
	}
}

function renderEnum(prop) {
	if (!Array.isArray((0, _util.getType)(prop).value)) {
		return _react2.default.createElement(
			'span',
			null,
			(0, _util.getType)(prop).value
		);
	}

	var values = (0, _util.getType)(prop).value.map(function (_ref2) {
		var value = _ref2.value;
		return _react2.default.createElement(
			_Code2.default,
			{ key: value },
			(0, _util.showSpaces)((0, _util.unquote)(value))
		);
	});
	return _react2.default.createElement(
		'span',
		null,
		'One of: ',
		_react2.default.createElement(
			_reactGroup2.default,
			{ separator: ', ', inline: true },
			values
		)
	);
}

function PropsRenderer(_ref3) {
	var classes = _ref3.classes,
	    props = _ref3.props;

	function renderRow(prop, name) {
		var deprecated = !!(prop.tags && prop.tags.deprecated);
		return _react2.default.createElement(
			'tr',
			{ key: name },
			_react2.default.createElement(
				'td',
				{ className: classes.cell },
				_react2.default.createElement(_Name2.default, { name: name, deprecated: deprecated })
			),
			_react2.default.createElement(
				'td',
				{ className: classes.cell },
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.type },
					renderType((0, _util.getType)(prop))
				)
			),
			_react2.default.createElement(
				'td',
				{ className: classes.cell },
				renderDefault(prop)
			),
			_react2.default.createElement(
				'td',
				{ className: classes.cell + ' ' + classes.cellDesc },
				renderDescription(prop)
			)
		);
	}

	function renderDefault(prop) {
		if (prop.required) {
			return _react2.default.createElement(
				'span',
				{ className: classes.required },
				'Required'
			);
		} else if (prop.defaultValue) {
			if (prop.type && prop.type.name === 'func') {
				return _react2.default.createElement(
					'span',
					{ className: classes.function, title: (0, _util.showSpaces)((0, _util.unquote)(prop.defaultValue.value)) },
					'Function'
				);
			}

			return _react2.default.createElement(
				_Code2.default,
				null,
				(0, _util.showSpaces)((0, _util.unquote)(prop.defaultValue.value))
			);
		}
		return '';
	}

	function renderDescription(prop) {
		var description = prop.description,
		    _prop$tags = prop.tags,
		    tags = _prop$tags === undefined ? {} : _prop$tags;

		var extra = renderExtra(prop);
		var args = [].concat(_toConsumableArray(tags.arg || []), _toConsumableArray(tags.argument || []), _toConsumableArray(tags.param || []));
		return _react2.default.createElement(
			'div',
			null,
			description && _react2.default.createElement(_Markdown2.default, { text: description }),
			extra && _react2.default.createElement(
				'div',
				{ className: classes.para },
				extra
			),
			_react2.default.createElement(_JsDoc2.default, tags),
			args.length > 0 && _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					{ className: classes.heading },
					'Arguments'
				),
				_react2.default.createElement(_Arguments2.default, { args: args })
			)
		);
	}

	function renderExtra(prop) {
		var type = (0, _util.getType)(prop);

		if (!type) {
			return null;
		}
		switch (type.name) {
			case 'enum':
				return renderEnum(prop);
			case 'union':
				return renderUnion(prop);
			case 'shape':
				return renderShape(prop.type.value);
			case 'arrayOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			case 'objectOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			default:
				return null;
		}
	}

	function renderUnion(prop) {
		if (!Array.isArray((0, _util.getType)(prop).value)) {
			return _react2.default.createElement(
				'span',
				null,
				(0, _util.getType)(prop).value
			);
		}

		var values = (0, _util.getType)(prop).value.map(function (value) {
			return _react2.default.createElement(
				_Code2.default,
				{ key: value.name, className: classes.type },
				renderType(value)
			);
		});
		return _react2.default.createElement(
			'span',
			null,
			'One of type: ',
			_react2.default.createElement(
				_reactGroup2.default,
				{ separator: ', ', inline: true },
				values
			)
		);
	}

	function renderShape(props) {
		var rows = [];
		for (var name in props) {
			var prop = props[name];
			var defaultValue = renderDefault(prop);
			var description = prop.description;
			rows.push(_react2.default.createElement(
				'div',
				{ key: name },
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.name },
					name
				),
				': ',
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.type },
					renderType(prop)
				),
				defaultValue && ' — ',
				defaultValue,
				description && ' — ',
				description && _react2.default.createElement(_Markdown2.default, { text: description, inline: true })
			));
		}
		return rows;
	}

	return _react2.default.createElement(
		'table',
		{ className: classes.table },
		_react2.default.createElement(
			'thead',
			{ className: classes.tableHead },
			_react2.default.createElement(
				'tr',
				null,
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Name'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Type'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Default'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading + ' ' + classes.cellDesc },
					'Description'
				)
			)
		),
		_react2.default.createElement(
			'tbody',
			null,
			(0, _map2.default)(props, renderRow)
		)
	);
}

PropsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	props: _propTypes2.default.object.isRequired
};

exports.default = (0, _Styled2.default)(styles)(PropsRenderer);