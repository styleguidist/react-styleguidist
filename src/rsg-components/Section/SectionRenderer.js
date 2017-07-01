import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
	},
});

export function SectionRenderer(allProps) {
	const { classes, name, slug, content, components, sections } = allProps;
	return (
		<section className={classes.root}>
			{name &&
				<SectionHeading primary id={slug} slotName="sectionToolbar" slotProps={allProps}>
					{name}
				</SectionHeading>}
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
