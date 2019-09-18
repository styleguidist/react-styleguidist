import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * The only true button, with support for dark and light themes.
 */
export default class Button extends Component {
	static contextTypes = {
		currentTheme: PropTypes.string,
	};

	render() {
		const { onClick, children } = this.props;

		return (
			<button className={`button button--${this.context.currentTheme}`} onClick={onClick}>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	/** Button label */
	children: PropTypes.node.isRequired,
	/** Gets called when the user clicks on the button */
	onClick: PropTypes.func,
};

Button.defaultProps = {
	onClick: event => {
		// eslint-disable-next-line no-console
		console.log('You have clicked me!', event.target);
	},
};
