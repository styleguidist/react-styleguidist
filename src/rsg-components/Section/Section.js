import React, { PropTypes } from 'react';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default function Section({ section }) {
	const { name, content, components, sections } = section;

	const contentJsx = content && (
		<Examples examples={content} />
	);
	const componentsJsx = components && (
		<Components
			components={components}
		/>
	);
	const sectionsJsx = sections && (
		<Sections
			sections={sections}
		/>
	);
	return (
		<SectionRenderer
			name={name}
			content={contentJsx}
			components={componentsJsx}
			sections={sectionsJsx}
		/>
	);
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
};
