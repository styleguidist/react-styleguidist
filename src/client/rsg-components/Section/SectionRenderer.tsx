import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';
import * as Rsg from '../../../typings';

const styles = ({ space }: Rsg.Theme) => ({
	root: {
		marginBottom: space[4],
	},
});

interface SectionRendererProps extends JssInjectedProps {
	slug: string;
	depth: number;
	name?: string;
	description?: string;
	content?: React.ReactNode;
	components?: React.ReactNode;
	sections?: React.ReactNode;
	isolated?: boolean;
	pagePerSection?: boolean;
	[prop: string]: any;
}

export const SectionRenderer: React.FunctionComponent<SectionRendererProps> = (allProps) => {
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
	} = allProps;

	return (
		<section className={classes.root} data-testid={`section-${slug}`}>
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
			{description && <Markdown text={description} />}
			{content}
			{sections}
			{components}
		</section>
	);
};

SectionRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	slug: PropTypes.string.isRequired,
	content: PropTypes.any,
	components: PropTypes.any,
	sections: PropTypes.any,
	isolated: PropTypes.bool,
	depth: PropTypes.number.isRequired,
	pagePerSection: PropTypes.bool,
};

export default Styled<SectionRendererProps>(styles)(SectionRenderer);
