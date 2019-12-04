import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A button wrapped by a Decorator/Enhancer
 *
 * @version 1.0.1
 * @author [Jeremy Gayed](https://github.com/tizmagik)
 * @deprecated Use the [only true button](#button) instead
 */
const WrappedButton = ({ color, size, children }) => {
	const styles = {
		color,
		fontSize: WrappedButton.sizes[size],
	};

	return (
		<button className="wrapped-button" style={styles}>
			{children}
		</button>
	);
};
WrappedButton.propTypes = {
	/**
	 * Button label.
	 */
	children: PropTypes.string.isRequired,
	/**
	 * The color for the button
	 *
	 * @see Check [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
	 */
	color: PropTypes.string,
	/**
	 * The size of the Button
	 *
	 * @since Version 1.0.1
	 */
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/**
	 * The width of the button
	 *
	 * @deprecated Do not use! Use size instead!
	 */
	width: PropTypes.number,
	/**
	 * Gets called when the user clicks on the button
	 *
	 * @param { SyntheticEvent } event The react `SyntheticEvent`
	 * @return { SyntheticEvent } The `onClick` `SyntheticEvent`
	 */
	onClick: PropTypes.func,
	/**
	 * A prop that should not be visible in the doc.
	 * @ignore
	 */
	ignoredProp: PropTypes.bool,
};
WrappedButton.defaultProps = {
	color: '#333',
	size: 'normal',
};
WrappedButton.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};

const Decorator = Composed =>
	class MyHOC extends Component {
		render() {
			return <Composed {...this.props} />;
		}
	};

export default Decorator(WrappedButton);
