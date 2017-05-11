/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
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
	tabSize: 2,
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

	constructor(props) {
		super(props);
		this.state = {
			code: props.code,
		};
		this.handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			code: nextProps.code,
		});
	}

	shouldComponentUpdate(nextProps, netxState) {
		return netxState.code !== this.state.code;
	}

	handleChange(newCode) {
		this.setState({ code: newCode });
		this.props.onChange(newCode);
	}

	render() {
		const { code } = this.state;
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
