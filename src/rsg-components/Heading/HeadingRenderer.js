import React, { PropTypes } from 'react';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

export const styles = ({ link, linkHover }) => ({
	heading: {
		position: 'relative',
		overflow: 'visible',
		marginLeft: -30,
		paddingLeft: 30,
		'&:hover > $anchor': {
			isolate: false,
			visibility: 'visible',
		},
	},
	anchor: {
		position: 'absolute',
		bottom: '.125em',
		left: 10,
		display: 'block',
		color: link,
		fontSize: '0.65em',
		fontFamily: 'inherit',
		fontWeight: 'normal',
		textDecoration: 'none',
		visibility: 'hidden',
		'&:hover, &:active': {
			isolate: false,
			color: linkHover,
			cursor: 'pointer',
		},
	},
});

export function HeadingRenderer({ classes, children, slug, level, ...props }) {
	const Tag = `h${level}`;
	return (
		<Tag {...props} className={cx(classes.heading, props.className)}>
			<a className={classes.anchor} href={`#${slug}`} id={slug} aria-hidden>#</a>
			{children}
		</Tag>
	);
}

HeadingRenderer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	slug: PropTypes.string.isRequired,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
};

export default Styled(styles)(HeadingRenderer);
