import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import Sections from 'rsg-components/Sections';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default function Section({ section, depth }, { isolatedSection = false }) {
	const { name, slug, content, components, sections } = section;

	const contentJsx = content && <Examples examples={content} name={name} />;
	const componentsJsx = components && <Components components={components} depth={depth + 1} />;
	const sectionsJsx = sections && <Sections sections={sections} depth={depth + 1} />;

	return (
		<SectionRenderer
			name={name}
			slug={slug}
			content={contentJsx}
			components={componentsJsx}
			sections={sectionsJsx}
			isolated={isolatedSection}
			depth={depth}
		/>
	);
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired,
};

Section.contextTypes = {
	isolatedSection: PropTypes.bool,
};
