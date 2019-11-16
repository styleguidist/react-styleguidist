import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled, { JssInjectedProps, Theme } from 'rsg-components/Styled';

const styles = ({ color }: Theme) => ({
	link: {
		'&, &:link, &:visited': {
			fontSize: 'inherit',
			color: color.link,
			textDecoration: 'none',
		},
		'&:hover, &:active': {
			isolate: false,
			color: color.linkHover,
			cursor: 'pointer',
		},
	},
});

interface LinkProps extends JssInjectedProps {
	children: React.ReactNode;
	className?: string;
	href?: string;
	target?: string;
}

export const LinkRenderer: React.FunctionComponent<LinkProps> = ({
	classes,
	children,
	...props
}) => {
	return (
		<a {...props} className={cx(classes.link, props.className)}>
			{children}
		</a>
	);
};

LinkRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.node,
	className: PropTypes.string,
	href: PropTypes.string,
};

export default Styled<LinkProps>(styles)(LinkRenderer);
