import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = () => ({
	root: {
		marginBottom: 30,
	},
});

export function MessageRenderer({ classes, children }) {
	return (
		<div className={classes.root}>
			<Markdown text={Array.isArray(children) ? children.join('\n') : children} />
		</div>
	);
}

MessageRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(MessageRenderer);
