import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

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

export function SectionRenderer({ classes, name, slug, content, components, sections }) {
	return (
		<section className={classes.root}>
			{name && (
				<Heading hierarchy={1} slug={slug} className={classes.heading}>{name}</Heading>
			)}
			{content}
			{components}
			{sections}
		</section>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	slug: PropTypes.string,
	content: PropTypes.node,
	components: PropTypes.node,
	sections: PropTypes.node,
};

export default Styled(styles)(SectionRenderer);
