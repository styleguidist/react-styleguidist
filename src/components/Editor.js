import React, { PropTypes } from 'react';
import debounce from 'lodash/function/debounce';
import Codemirror from 'react-codemirror';

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
			<Codemirror value={this.props.code} onChange={handleChange} options={this.codemirrorOptions}/>
		);
	}
});
