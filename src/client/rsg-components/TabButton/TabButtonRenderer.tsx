import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { Styles } from 'jss';
import cx from 'clsx';
import * as Rsg from '../../../typings';

export const styles = ({
	space,
	color,
	fontFamily,
	fontSize,
	buttonTextTransform,
}: Rsg.Theme): Styles => ({
	button: {
		padding: [[space[1], 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.light,
		background: 'transparent',
		textTransform: buttonTextTransform,
		transition: 'color 750ms ease-out',
		border: 'none',
		cursor: 'pointer',
		'&:hover, &:focus': {
			isolate: false,
			outline: 0,
			color: color.linkHover,
			transition: 'color 150ms ease-in',
		},
		'&:focus:not($isActive)': {
			isolate: false,
			outline: [[1, 'dotted', color.linkHover]],
		},
		'& + &': {
			isolate: false,
			marginLeft: space[1],
		},
	},
	isActive: {
		borderBottom: [[2, color.linkHover, 'solid']],
	},
});

interface TabButtonProps extends JssInjectedProps {
	className?: string;
	name: string;
	onClick: (e: React.MouseEvent) => void;
	active?: boolean;
	children: React.ReactNode;
}

export const TabButtonRenderer: React.FunctionComponent<TabButtonProps> = ({
	classes,
	name,
	className,
	onClick,
	active,
	children,
}) => {
	const classNames = cx(classes.button, className, {
		[classes.isActive]: active,
	});

	return (
		<button
			type="button"
			name={name}
			className={classNames}
			onClick={onClick}
			aria-pressed={active}
		>
			{children}
		</button>
	);
};

TabButtonRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	active: PropTypes.bool,
	children: PropTypes.any.isRequired,
};
TabButtonRenderer.defaultProps = {
	active: false,
};

export default Styled<TabButtonProps>(styles)(TabButtonRenderer);
