import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

export function ExamplesRenderer({ classes, children }) {
	return (
		<article className={classes.root}>
			{children}
		</article>
	);
}

ExamplesRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(ExamplesRenderer);
