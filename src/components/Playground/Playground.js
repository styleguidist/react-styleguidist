import { Component, PropTypes } from 'react';
import Editor from 'components/Editor';
import Preview from 'components/Preview';

import s from './Playground.css';

export default class Playground extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired
	}

	constructor(props) {
		super();
		this.state = {
			code: props.code
		};
	}

	handleChange = (newCode) => {
		this.setState({
			code: newCode
		});
	}

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
}
