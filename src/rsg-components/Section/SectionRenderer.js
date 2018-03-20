import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
	},
});

export function SectionRenderer(allProps) {
	const { classes, name, slug, content, components, sections, depth, description } = allProps;

	return (
		<section className={classes.root}>
			{name && (
				<SectionHeading depth={depth} id={slug} slotName="sectionToolbar" slotProps={allProps}>
					{name}
				</SectionHeading>
			)}
			{description && <Markdown text={description} />}
			{content}
			{sections}
			{components}
		</section>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	slug: PropTypes.string,
	filepath: PropTypes.string,
	content: PropTypes.node,
	components: PropTypes.node,
	sections: PropTypes.node,
	isolated: PropTypes.bool,
	depth: PropTypes.number.isRequired,
};

export default Styled(styles)(SectionRenderer);
