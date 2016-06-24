// CodeMirror
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import Codemirror from 'react-codemirror';

import s from './Editor.css';

const codemirrorOptions = {
	mode: 'jsx',
	lineNumbers: false,
	lineWrapping: true,
	smartIndent: false,
	matchBrackets: true,
	viewportMargin: Infinity,
};

const cssRequire = require.context('codemirror/theme/', false, /^\.\/.*\.css$/);

let UPDATE_DELAY = 10;

export default class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		highlightTheme: PropTypes.string.isRequired,
		onChange: PropTypes.func,
	};

	constructor() {
		super();
		this.handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	componentWillMount() {
		let { highlightTheme } = this.props;

		cssRequire(`./${highlightTheme}.css`);
	}

	shouldComponentUpdate() {
		return false;
	}

	handleChange(newCode) {
		let { onChange } = this.props;
		if (onChange) {
			onChange(newCode);
		}
	}

	render() {
		let { highlightTheme } = this.props;
		let options = merge({}, codemirrorOptions, { theme: highlightTheme });

		return (
			<div className={s.root}>
				<Codemirror value={this.props.code} onChange={this.handleChange} options={options} />
			</div>
		);
	}
}
