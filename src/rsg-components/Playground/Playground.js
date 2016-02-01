import { Component, PropTypes } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';

import s from './Playground.css';

class Playground extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: props.code
		};
	}

	handleChange = (newCode) => {
		this.setState({
			code: newCode
		});
	};

	componentWillReceiveProps(nextProps) {
		let { code } = nextProps;
		if (code) {
			this.setState({
				code
			});
		}
	}

	render() {
		let { code } = this.state;
		let { highlightTheme } = this.props;

		return (
			<div className={s.root}>
				<div className={s.preview}>
					<Preview code={code} evalInContext={this.props.evalInContext}/>
				</div>
				<div className={s.editor}>
					<Editor code={code} highlightTheme={highlightTheme} onChange={this.handleChange}/>
				</div>
			</div>
		);
	}
}

Playground.propTypes = {
	highlightTheme: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	evalInContext: PropTypes.func.isRequired
};

export default Playground;
