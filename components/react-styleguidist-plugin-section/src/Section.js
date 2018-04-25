import React from 'react';
import PropTypes from 'prop-types';
import Examples from 'react-styleguidist-plugin-examples'
import Components from 'react-styleguidist-plugin-components'
import Sections from 'react-styleguidist-plugin-sections'
import SectionRenderer from './SectionRenderer'
import { DisplayModes } from 'react-styleguidist-common';

export default function Section({ section, depth }, { displayMode }) {
	const { name, slug, filepath, content, components, sections, description } = section;

	const contentJsx = content && <Examples examples={content} name={name} />;
	const componentsJsx = components && <Components components={components} depth={depth + 1} />;
	const sectionsJsx = sections && <Sections sections={sections} depth={depth + 1} />;

	return (
		<SectionRenderer
			description={description}
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
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired,
};

Section.contextTypes = {
	displayMode: PropTypes.string,
};
