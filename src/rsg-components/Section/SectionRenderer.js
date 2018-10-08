import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';
import Pathline from 'rsg-components/Pathline';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
	},
	pathLineContainer: {
		marginBottom: space[3],
	},
});

export function SectionRenderer(allProps) {
	const {
		classes,
		name,
		slug,
		content,
		components,
		sections,
		depth,
		description,
		pagePerSection,
		pathLine,
	} = allProps;

	return (
		<section className={classes.root}>
			{name && (
				<SectionHeading
					depth={depth}
					id={slug}
					slotName="sectionToolbar"
					pagePerSection={pagePerSection}
					slotProps={allProps}
				>
					{name}
				</SectionHeading>
			)}
			{pathLine && (
				<div className={classes.pathLineContainer}>
					<Pathline>{pathLine}</Pathline>
				</div>
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
	pagePerSection: PropTypes.bool,
	pathLine: PropTypes.string,
};

export default Styled(styles)(SectionRenderer);
