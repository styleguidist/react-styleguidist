import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';

const styles = ({ space, fontFamily, fontSize }) => ({
	root: {
		marginBottom: space[4],
	},
	heading: {
		marginBottom: space[2],
		fontFamily: fontFamily.base,
		fontSize: fontSize.h1,
	},
});

export function SectionRenderer(allProps) {
	const { classes, name, slug, content, components, sections } = allProps;
	return (
		<section className={classes.root}>
			{name &&
				<Heading primary id={slug} slotName="sectionToolbar" slotProps={allProps}>
					{name}
				</Heading>}
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
	isolated: PropTypes.bool,
};

export default Styled(styles)(SectionRenderer);
