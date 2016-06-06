import React, { Component, PropTypes } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';

import s from './Playground.css';

export default class Playground extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		showCode: PropTypes.bool,
	};

	constructor(props) {
		super();
		this.state = {
			code: props.code,
			showCode: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		let { code } = nextProps;
		if (code) {
			this.setState({
				code,
			});
		}
	}

	handleChange(newCode) {
		this.setState({
			code: newCode,
		});
	}

	handleCodeToggle() {
		this.setState({
			showCode: !this.state.showCode,
		});
	}

	render() {
		let { code } = this.state;
		let { highlightTheme } = this.props;

		return (
			<div className={s.root}>
				<div className={s.preview}>
					<Preview code={code} evalInContext={this.props.evalInContext} />
				</div>
				{this.state.showCode ? (
					<div className={s.editor}>
						<Editor code={code} highlightTheme={highlightTheme} onChange={code => this.handleChange(code)} />
						<div className={s.hideCode} onClick={() => this.handleCodeToggle()}>
							hide code
						</div>
					</div>
				) : (
					<div className={s.showCode} onClick={() => this.handleCodeToggle()}>
						show code
					</div>
				)}
			</div>
		);
	}
}
