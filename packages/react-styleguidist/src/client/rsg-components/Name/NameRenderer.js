import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export const styles = ({ fontFamily, fontSize, color }) => ({
	name: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.name,
	},
	isDeprecated: {
		color: color.light,
		textDecoration: 'line-through',
	},
});

export function NameRenderer({ classes, children, deprecated }) {
	const classNames = cx(classes.name, {
		[classes.isDeprecated]: deprecated,
	});
	return <code className={classNames}>{children}</code>;
}

NameRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(NameRenderer);
