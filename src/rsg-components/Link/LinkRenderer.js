import React, { PropTypes } from 'react';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

export const styles = ({ link, linkHover }) => ({
	link: {
		'&, &:link, &:visited': {
			isolate: false,
			fontFamily: 'inherit',
			fontSize: 'inherit',
			color: link,
			textDecoration: 'none',
		},
		'&:hover, &:active': {
			isolate: false,
			color: linkHover,
			cursor: 'pointer',
		},
	},
});

export function LinkRenderer({ classes, children, ...props }) {
	return (
		<a {...props} className={cx(classes.link, props.className)}>
			{children}
		</a>
	);
}

LinkRenderer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(LinkRenderer);
