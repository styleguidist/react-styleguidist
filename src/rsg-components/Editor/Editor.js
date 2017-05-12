import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
require('!!../../../loaders/style-loader!../../../loaders/css-loader!codemirror/lib/codemirror.css');
require('!!../../../loaders/style-loader!../../../loaders/css-loader!rsg-codemirror-theme.css');

const codemirrorOptions = {
	mode: 'jsx',
	lineNumbers: false,
	lineWrapping: true,
	smartIndent: false,
	matchBrackets: true,
	viewportMargin: Infinity,
};

const UPDATE_DELAY = 10;

export default class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
	};

	constructor() {
		super();
		this.handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	shouldComponentUpdate() {
		return false;
	}

	handleChange(newCode) {
		this.props.onChange(newCode);
	}

	render() {
		const { code } = this.props;
		const { highlightTheme } = this.context.config;
		const options = {
			...codemirrorOptions,
			theme: highlightTheme,
		};
		return <Codemirror value={code} onChange={this.handleChange} options={options} />;
	}
}
