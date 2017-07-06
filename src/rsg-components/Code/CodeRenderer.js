import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily }) => ({
	code: {
		display: 'inline',
		fontFamily: fontFamily.monospace,
		fontSize: 'inherit',
		color: 'inherit',
		background: 'transparent',
	},
});

export function CodeRenderer({ classes, className, children }) {
	return (
		<span className={className}>
			<code className={classes.code}>{children}</code>
		</span>
	);
}

CodeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Styled(styles)(CodeRenderer);
