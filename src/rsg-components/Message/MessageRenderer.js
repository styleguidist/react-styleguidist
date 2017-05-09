import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
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
