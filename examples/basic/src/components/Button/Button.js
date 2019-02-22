import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * The only true button.
 */
export default function Button({ color, size, onClick, disabled, children }) {
	const styles = {
		color,
		fontSize: Button.sizes[size],
	};

	return (
		<button className="button" style={styles} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
Button.propTypes = {
	/** Button label */
	children: PropTypes.node.isRequired,
	/** The color for the button */
	color: PropTypes.string,
	/** The size of the button */
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/** Disable button */
	disabled: PropTypes.bool,
	/** Gets called when the user clicks on the button */
	onClick: PropTypes.func,

	/** TO_BE_REMOVED: Nothing to do with button only for testing purpose */
	tree: PropTypes.shape({
		rootId: PropTypes.string.isRequired,
		items: PropTypes.objectOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				parentId: PropTypes.string,
				children: PropTypes.arrayOf(PropTypes.string).isRequired,
				hasChildren: PropTypes.bool.isRequired,
				hasParent: PropTypes.bool.isRequired,
				isChecked: PropTypes.bool.isRequired,
				isExpanded: PropTypes.bool.isRequired,
				isChildrenLoading: PropTypes.bool.isRequired,
				type: PropTypes.string.isRequired,
				data: PropTypes.shape({
					title: PropTypes.string.isRequired,
				}).isRequired,
				defaults: PropTypes.shape({
					isChecked: PropTypes.bool,
					isExpanded: PropTypes.bool,
				}),
			})
		).isRequired,
	}),
};
Button.defaultProps = {
	color: '#333',
	size: 'normal',
	onClick: event => {
		// eslint-disable-next-line no-console
		console.log('You have clicked me!', event.target);
	},
};
Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
