import React from 'react';
import PropTypes from 'prop-types';
import Code from 'react-styleguidist-plugin-code'
import Styled from 'react-styleguidist-plugin-styled'
import cx from 'classnames';

export const styles = ({ fontSize, color }) => ({
	name: {
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
	return (
		<span className={classNames}>
			<Code>{children}</Code>
		</span>
	);
}

NameRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(NameRenderer);
