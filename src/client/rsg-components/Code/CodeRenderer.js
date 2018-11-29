import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily }) => ({
	code: {
		fontFamily: fontFamily.monospace,
		fontSize: 'inherit',
		color: 'inherit',
		background: 'transparent',
		whiteSpace: 'inherit',
	},
});

export function CodeRenderer({ classes, children }) {
	return <code className={classes.code}>{children}</code>;
}
CodeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(CodeRenderer);
