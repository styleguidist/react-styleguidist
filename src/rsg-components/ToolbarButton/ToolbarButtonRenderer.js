import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export const styles = ({ space, color }) => ({
	button: {
		padding: 2, // Increase clickable area a bit
		color: color.light,
		background: 'transparent',
		transition: 'color 750ms ease-out',
		cursor: 'pointer',
		'&:hover, &:focus': {
			isolate: false,
			color: color.linkHover,
			transition: 'color 150ms ease-in',
		},
		'&:focus': {
			isolate: false,
			outline: [[1, 'dotted', color.linkHover]],
		},
		'& + &': {
			isolate: false,
			marginLeft: space[1],
		},
		// Style react-icons icon passed as children
		'& svg': {
			width: space[3],
			height: space[3],
			color: 'currentColor',
			cursor: 'inherit',
		},
	},
	isSmall: {
		'& svg': {
			width: 14,
			height: 14,
		},
	},
});

export function ToolbarButtonRenderer({
	classes,
	className,
	onClick,
	href,
	title,
	small,
	children,
}) {
	const classNames = cx(classes.button, className, {
		[classes.isSmall]: small,
	});

	if (href !== undefined) {
		return (
			<a href={href} title={title} className={classNames} aria-label={title}>
				{children}
			</a>
		);
	}

	return (
		<button type="button" onClick={onClick} title={title} className={classNames} aria-label={title}>
			{children}
		</button>
	);
}

ToolbarButtonRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string,
	small: PropTypes.bool,
	children: PropTypes.node,
};

export default Styled(styles)(ToolbarButtonRenderer);
