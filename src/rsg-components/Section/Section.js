import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default function Section({ section, primary }, { isolatedSection = false }) {
	const { name, slug, content, components, sections } = section;

	const contentJsx = content && <Examples examples={content} name={name} />;
	const componentsJsx = components && <Components components={components} />;
	const sectionsJsx = sections && <Sections sections={sections} />;

	return (
		<SectionRenderer
			name={name}
			slug={slug}
			content={contentJsx}
			components={componentsJsx}
			sections={sectionsJsx}
			isolated={isolatedSection}
			primary={primary}
		/>
	);
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
	primary: PropTypes.bool,
};

Section.contextTypes = {
	isolatedSection: PropTypes.bool,
};
