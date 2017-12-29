import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';

import './section.scss';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
	},
});

export function SectionRenderer(allProps) {
	const { classes, name, slug, content, contentAsArray, components, sections, depth, description } = allProps;

	return (
		<div>
			<section className="section section--flex">
				<div className="section__lhs">
					{name && (
						<SectionHeading depth={depth} id={slug} slotName="sectionToolbar" slotProps={allProps}>
							{name}
						</SectionHeading>
					)}
					{description && <Markdown text={description} />}
					{content}
					{components}
				</div>
				<div className="section__rhs">
					{contentAsArray && contentAsArray.map((content, key) => (
						<div key={key}>{content}</div>
					))}
				</div>
			</section>
			{sections}
		</div>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	slug: PropTypes.string,
	content: PropTypes.node,
	contentAsArray: PropTypes.array,
	components: PropTypes.node,
	sections: PropTypes.node,
	isolated: PropTypes.bool,
	depth: PropTypes.number.isRequired,
};

export default Styled(styles)(SectionRenderer);
