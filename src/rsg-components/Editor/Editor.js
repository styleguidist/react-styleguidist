// CodeMirror
import '../../utils/codemirror-jsx';
import 'codemirror/lib/codemirror.css';

import { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import Codemirror from 'react-codemirror';

import s from './Editor.css';

var cssRequire = require.context('codemirror/theme/', false, /^\.\/.*\.css$/);

let UPDATE_DELAY = 100;

export default class Editor extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		highlightTheme: PropTypes.string.isRequired,
		onChange: PropTypes.func
	};

	static codemirrorOptions = {
		mode: 'jsx',
		lineNumbers: false,
		lineWrapping: true,
		smartIndent: false,
		matchBrackets: true,
		viewportMargin: Infinity
	};

	constructor() {
		super();
		this._handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY);
	}

	componentWillMount() {
		let { highlightTheme } = this.props;

		cssRequire(`./${highlightTheme}.css`);
	}

	handleChange(newCode) {
		let { onChange } = this.props;
		if (onChange) {
			onChange(newCode);
		}
	}

	render() {
		let { highlightTheme } = this.props;
		let options = merge({}, Editor.codemirrorOptions, {theme: highlightTheme});

		return (
			<div className={s.root}>
				<Codemirror value={this.props.code} onChange={this._handleChange} options={options}/>
			</div>
		);
	}
}
