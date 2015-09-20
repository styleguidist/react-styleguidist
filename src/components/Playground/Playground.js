import React, { PropTypes } from 'react';
import Editor from 'components/Editor/Editor';
import Preview from 'components/Preview/Preview';

import s from './Playground.css';

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

	componentWillReceiveProps(nextProps) {
		let { code } = nextProps;
		if (code) {
			this.setState({
				code
			});
		}
	},

	handleChange(newCode) {
		this.setState({
			code: newCode
		});
	},

	render() {
		let { code } = this.state;

		return (
			<div className={s.root}>
				<div className={s.preview}>
					<Preview code={code}/>
				</div>
				<div className={s.editor}>
					<Editor code={code} onChange={this.handleChange}/>
				</div>
			</div>
		);
	}
});
