import React from 'react';
import PropTypes from 'prop-types';
import Examples, { ExampleModel } from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
import { ComponentViewModel } from 'rsg-components/ReactComponent';
import { DisplayModes } from '../../consts';

export interface SectionViewModel {
	name?: string;
	slug?: string;
	href?: string;
	filepath?: string;
	description?: 'string';
	sections?: SectionViewModel[];
	components?: ComponentViewModel[];
	content?: ExampleModel[] | string;
	exampleMode?: string;
	usageMode?: string;
	sectionDepth?: number;
}

const Section: React.FunctionComponent<{
	section: SectionViewModel;
	depth: number;
}> = ({ section, depth }) => {
	const {
		displayMode,
		config: { pagePerSection },
	} = useStyleGuideContext();
	const {
		name,
		slug,
		filepath,
		content,
		components,
		sections,
		description,
		exampleMode,
		usageMode,
	} = section;

	const contentJsx = Array.isArray(content) ? (
		<Examples examples={content} name={name} exampleMode={exampleMode} />
	) : null;
	const componentsJsx = components && (
		<Components
			usageMode={usageMode}
			exampleMode={exampleMode}
			components={components}
			depth={depth + 1}
		/>
	);

	const sectionsJsx = sections && <Sections sections={sections} depth={depth + 1} />;

	return (
		<SectionRenderer
			description={description}
			pagePerSection={pagePerSection}
			name={name}
			slug={slug}
			filepath={filepath}
			content={contentJsx}
			components={componentsJsx}
			sections={sectionsJsx}
			isolated={displayMode !== DisplayModes.all}
			depth={depth}
		/>
	);
};

Section.propTypes = {
	section: PropTypes.any.isRequired,
	depth: PropTypes.number.isRequired,
};

export default Section;
