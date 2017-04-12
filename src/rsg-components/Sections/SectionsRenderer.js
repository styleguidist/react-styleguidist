import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

export function SectionsRenderer({ classes, children }) {
	return (
		<section className={classes.root}>
			{children}
		</section>
	);
}

SectionsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(SectionsRenderer);
