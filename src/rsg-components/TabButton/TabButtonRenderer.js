import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export const styles = ({ space, color, fontFamily, fontSize }) => ({
	button: {
		padding: [[space[1], space[2]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.light,
		background: 'transparent',
		textTransform: 'uppercase',
		transition: 'color 750ms ease-out',
		cursor: 'pointer',
		'&:hover': {
			isolate: false,
			color: color.linkHover,
			transition: 'color 150ms ease-in',
		},
	},
	isActive: {
		borderBottom: [[2, color.linkHover, 'solid']],
	},
});

export function TabButtonRenderer({ classes, name, className, onClick, active, children }) {
	const classNames = cx(classes.button, className, {
		[classes.isActive]: active,
	});

	return (
		<button type="button" name={name} className={classNames} onClick={onClick}>
			{children}
		</button>
	);
}

TabButtonRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	active: PropTypes.bool,
	children: PropTypes.node,
};

export default Styled(styles)(TabButtonRenderer);
