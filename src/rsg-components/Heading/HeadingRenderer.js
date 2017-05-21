import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slot from 'rsg-components/Slot';
import Styled from 'rsg-components/Styled';

export const styles = ({ color, space, fontSize, fontFamily }) => ({
	root: {
		display: 'flex',
		marginBottom: space[1],
		alignItems: 'center',
	},
	heading: {
		color: color.base,
		fontSize: fontSize.h2,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
	},
	isPrimary: {
		fontSize: fontSize.h1,
	},
	isDeprecated: {
		textDecoration: 'line-through',
		color: color.light,
	},
	toolbar: {
		marginLeft: 'auto',
	},
});

export function HeadingRenderer({
	classes,
	children,
	id,
	slotName,
	slotProps,
	primary,
	deprecated,
}) {
	const Tag = primary ? 'h1' : 'h2';
	const headingClasses = cx(classes.heading, {
		[classes.isPrimary]: primary,
		[classes.isDeprecated]: deprecated,
	});
	return (
		<Tag id={id} className={classes.root}>
			<div className={headingClasses}>{children}</div>
			<Slot className={classes.toolbar} name={slotName} props={slotProps} />
		</Tag>
	);
}

HeadingRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	slotName: PropTypes.string.isRequired,
	slotProps: PropTypes.object.isRequired,
	primary: PropTypes.bool,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(HeadingRenderer);
