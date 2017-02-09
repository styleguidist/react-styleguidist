import React, { PropTypes } from 'react';
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

export function SectionRenderer({ classes, name, content, components, sections }) {
	return (
		<div className={classes.root}>
			{
				name && <h2 className={classes.heading} id={name}>{name}</h2>
			}
			{content}
			{components}
			{sections}
		</div>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	content: PropTypes.node,
	components: PropTypes.node,
	sections: PropTypes.node,
};

export default Styled(styles)(SectionRenderer);
