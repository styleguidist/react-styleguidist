import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

const styles = ({ monospace, name, light }) => ({
	name: {
		fontFamily: monospace,
		fontSize: 13,
		color: name,
	},
	isDeprecated: {
		color: light,
		textDecoration: 'line-through',
	},
});

export function NameRenderer({ classes, name, deprecated }) {
	const classNames = cx(classes.name, {
		[classes.isDeprecated]: deprecated,
	});
	return <Code className={classNames}>{name}</Code>;
}

NameRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled(styles)(NameRenderer);
