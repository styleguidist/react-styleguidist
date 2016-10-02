// CodeMirror
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import Codemirror from 'react-codemirror';
import EditorRenderer from 'rsg-components/Editor/EditorRenderer';

const codemirrorOptions = {
	mode: 'jsx',
	lineNumbers: false,
	lineWrapping: true,
	smartIndent: false,
	matchBrackets: true,
	viewportMargin: Infinity,
};

const cssRequire = require.context('codemirror/theme/', false, /^\.\/.*\.css$/);

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

	componentWillMount() {
		const { highlightTheme } = this.context.config;
		cssRequire(`./${highlightTheme}.css`);
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
		return (
			<EditorRenderer>
				<Codemirror value={code} onChange={this.handleChange} options={options} />
			</EditorRenderer>
		);
	}
}
