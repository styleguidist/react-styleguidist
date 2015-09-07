import React, { PropTypes } from 'react';
import Editor from './Editor';
import Preview from './Preview';

export default React.createClass({
	displayName: 'Playground',
	propTypes: {
		code: PropTypes.string.isRequired,
	},

	getInitialState() {
		return {
			code: this.props.code
		};
	},

	handleChange(newCode) {
		this.setState({
			code: newCode
		});
	},

	render() {
		let { code } = this.state;

		return (
			<div>
				<Editor code={code} onChange={this.handleChange}/>
				<Preview code={code}/>
			</div>
		);
	}
});
