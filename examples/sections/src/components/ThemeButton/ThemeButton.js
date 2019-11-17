import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../ThemeContext';
import './ThemeButton.css';

/**
 * Button that is themed by a context value
 */
export default class ThemeButton extends Component {
	render() {
		const className =
			this.context === 'light' ? 'ThemeButton ThemeButton--light' : 'ThemeButton ThemeButton--dark';
		return <button className={className}>{this.props.children}</button>;
	}
}

/** ThemeContext {string} */
ThemeButton.contextType = ThemeContext;
ThemeButton.propTypes = {
	/**
	 * ThemeButton label
	 */
	children: PropTypes.string.isRequired,
};
