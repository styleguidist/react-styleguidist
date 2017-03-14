// CodeMirror
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'rsg-codemirror-theme.css';

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

const UPDATE_DELAY = 10;

export default class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onCodeTyping: PropTypes.func.isRequired,
		isCodeValid: PropTypes.bool.isRequired,
		isCodeTyping: PropTypes.bool.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
	};

	constructor() {
		super();
		this.handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	shouldComponentUpdate(nextProps) {
		return (
			this.props.isCodeValid !== nextProps.isCodeValid ||
			this.props.isCodeTyping !== nextProps.isCodeTyping
		);
	}

	handleChange(newCode) {
		this.props.onChange(newCode);
	}

	render() {
		const { code, onCodeTyping, isCodeValid, isCodeTyping } = this.props;
		const { highlightTheme } = this.context.config;
		const options = {
			...codemirrorOptions,
			theme: highlightTheme,
		};
		return (
			<EditorRenderer
				isValid={isCodeValid}
				isTyping={isCodeTyping}
			>
				<Codemirror
					value={code}
					onChange={this.handleChange}
					options={options}
					onFocusChange={onCodeTyping}
				/>
			</EditorRenderer>
		);
	}
}
