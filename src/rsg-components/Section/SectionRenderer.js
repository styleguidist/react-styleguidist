import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ font }) => ({
	root: {
		isolate: false,
		marginBottom: 50,
	},
	heading: {
		margin: [[0, 0, 20]],
		fontFamily: font,
		fontSize: 38,
		fontWeight: 'bold',
	},
});

export function SectionRenderer({ classes, name, content, components }) {
	return (
		<div className={classes.root}>
			<h2 className={classes.heading} id={name}>{name}</h2>
			{content}
			{components}
		</div>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.node,
	components: PropTypes.object,
};

export default Styled(styles)(SectionRenderer);
