// CodeMirror
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';

import _ from 'lodash';
import { Component, PropTypes } from 'react';
import debounce from 'lodash/function/debounce';
import Codemirror from 'react-codemirror';

import s from './Editor.css';

var cssRequire = require.context('codemirror/theme/', false, /^\.\/.*\.css$/);

let UPDATE_DELAY = 100;

export default class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		syntaxTheme: PropTypes.string,
		onChange: PropTypes.func
	}
	static codemirrorOptions = {
		mode: 'xml',
		lineNumbers: false,
		lineWrapping: true,
		smartIndent: false,
		matchBrackets: true,
		viewportMargin: Infinity,
		theme: 'base16-light'
	}

	constructor() {
		super();
		this._handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	componentWillMount() {
		let { syntaxTheme } = this.props;

		if (!_.isUndefined(syntaxTheme)) {
			_.assign(Editor.codemirrorOptions, {theme: syntaxTheme});
		}

		cssRequire(`./${Editor.codemirrorOptions.theme}.css`);
	}

	handleChange(newCode) {
		let { onChange } = this.props;
		if (onChange) {
			onChange(newCode);
		}
	}

	render() {
		return (
			<div className={s.root}>
				<Codemirror value={this.props.code} onChange={this._handleChange} options={Editor.codemirrorOptions}/>
			</div>
		);
	}
}
