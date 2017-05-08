import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

const styles = ({ space, fontFamily, fontSize }) => ({
	root: {
		marginBottom: space[4],
	},
	heading: {
		margin: [[0, 0, space[2]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.h1,
	},
});

export function SectionRenderer({ classes, name, slug, content, components, sections }) {
	return (
		<section className={classes.root}>
			{name && (
				<Heading level={1} slug={slug} className={classes.heading}>{name}</Heading>
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
