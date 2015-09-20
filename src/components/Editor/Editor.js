// CodeMirror
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';

import React, { PropTypes } from 'react';
import debounce from 'lodash/function/debounce';
import Codemirror from 'react-codemirror';

import s from './Editor.css';

let UPDATE_DELAY = 100;

export default React.createClass({
	displayName: 'Editor',
	propTypes: {
		code: PropTypes.string.isRequired,
		onChange: PropTypes.func
	},
	codemirrorOptions: {
		mode: 'xml',
		lineNumbers: false,
		lineWrapping: true,
		smartIndent: false,
		matchBrackets: true,
		viewportMargin: Infinity,
		theme: 'base16-light'
	},

	handleChange(newCode) {
		let { onChange } = this.props;
		if (onChange) {
			onChange(newCode);
		}
	},

	render() {
		let handleChange = debounce(this.handleChange, UPDATE_DELAY);

		return (
			<div className={s.root}>
				<Codemirror value={this.props.code} onChange={handleChange} options={this.codemirrorOptions}/>
			</div>
		);
	}
});
