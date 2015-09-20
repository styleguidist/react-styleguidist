import { Component, PropTypes } from 'react';

import s from './Button.css';

/**
 * The only true button.
 */
export default class Button extends Component {
	static propTypes = {
		/**
		 * Button label.
		 */
		children: PropTypes.string.isRequired,
		color: PropTypes.string,
		size: PropTypes.oneOf(['small', 'normal', 'large']),
	}
	static defaultProps = {
		color: '#333',
		size: 'normal'
	}
	static sizes = {
		small: '10px',
		normal: '14px',
		large: '18px'
	}

	render() {
		let styles = {
			color: this.props.color,
			fontSize: Button.sizes[this.props.size]
		};

		return (
			<button className={s.root} style={styles}>{this.props.children}</button>
		);
	}
}
