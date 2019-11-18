import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

export function ExamplesRenderer({ classes, name, children }) {
	return (
		<article className={classes.root} data-testid={`${name}-examples`}>
			{children}
		</article>
	);
}

ExamplesRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(ExamplesRenderer);
