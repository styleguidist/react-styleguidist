import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist-plugin-styled'

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

export function SectionsRenderer({ classes, children }) {
	return <section className={classes.root}>{children}</section>;
}

SectionsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(SectionsRenderer);
