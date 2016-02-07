import { Component, PropTypes } from 'react';
import {sample} from 'lodash';

import s from './RandomButton.css';

/**
 * Button that changes label on every click.
 */
class RandomButton extends Component {
	constructor(props) {
		super();
		this.state = {
			label: sample(props.variants)
		};
	}

	handleClick() {
		this.setState({
			label: sample(this.props.variants)
		});
	}

	render() {
		return (
			<button className={s.root} onClick={this.handleClick.bind(this)}>{this.state.label}</button>
		);
	}
}

RandomButton.propTypes = {
	/**
	 * List of possible labels.
	 */
	variants: PropTypes.array.isRequired
};

export default RandomButton;
