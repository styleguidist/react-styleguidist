import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ monospace }) => ({
	code: {
		display: 'inline',
		fontFamily: monospace,
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
