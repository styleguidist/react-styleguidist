'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.MethodsRenderer = MethodsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Argument = require('rsg-components/Argument');

var _Argument2 = _interopRequireDefault(_Argument);

var _Arguments = require('rsg-components/Arguments');

var _Arguments2 = _interopRequireDefault(_Arguments);

var _Name = require('rsg-components/Name');

var _Name2 = _interopRequireDefault(_Name);

var _JsDoc = require('rsg-components/JsDoc');

var _JsDoc2 = _interopRequireDefault(_JsDoc);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			width: '70%',
			paddingLeft: space[2],
			paddingRight: 0
		},
		para: {
			marginBottom: space[2],
			fontSize: fontSize.small
		}
	};
};

function MethodsRenderer(_ref2) {
	var classes = _ref2.classes,
	    methods = _ref2.methods;

	function renderRow(method) {
		var name = method.name,
		    description = method.description,
		    returns = method.returns,
		    _method$params = method.params,
		    params = _method$params === undefined ? [] : _method$params,
		    _method$tags = method.tags,
		    tags = _method$tags === undefined ? {} : _method$tags;

		return _react2.default.createElement(
			'tr',
			{ key: name },
			_react2.default.createElement(
				'td',
				{ className: classes.cell },
				_react2.default.createElement(_Name2.default, { name: name + '()', deprecated: tags.deprecated })
			),
			_react2.default.createElement(
				'td',
				{ className: classes.cell },
				_react2.default.createElement(_Arguments2.default, { args: params })
			),
			_react2.default.createElement(
				'td',
				{ className: (0, _classnames2.default)(classes.cell, classes.cellDesc) },
				description && _react2.default.createElement(_Markdown2.default, { text: description }),
				returns && _react2.default.createElement(_Argument2.default, _extends({ className: classes.para, returns: true }, returns)),
				_react2.default.createElement(_JsDoc2.default, tags)
			)
		);
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
					'Parameters'
				),
				_react2.default.createElement(
					'th',
					{ className: (0, _classnames2.default)(classes.cellHeading, classes.cellDesc) },
					'Description'
				)
			)
		),
		_react2.default.createElement(
			'tbody',
			null,
			methods.map(renderRow)
		)
	);
}

MethodsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	methods: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.string.isRequired,
		description: _propTypes2.default.string,
		returns: _propTypes2.default.object,
		params: _propTypes2.default.array,
		tags: _propTypes2.default.object
	})).isRequired
};

exports.default = (0, _Styled2.default)(styles)(MethodsRenderer);