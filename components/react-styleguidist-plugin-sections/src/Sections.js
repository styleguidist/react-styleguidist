import React from 'react';
import PropTypes from 'prop-types';
import Section from 'react-styleguidist-plugin-section'
import SectionsRenderer from 'react-styleguidist-plugin-sections/sectionsrenderer'

export default function Sections({ sections, depth }) {
	return (
		<SectionsRenderer>
			{sections.map((section, idx) => <Section key={idx} section={section} depth={depth} />)}
		</SectionsRenderer>
	);
}

Sections.propTypes = {
	sections: PropTypes.array.isRequired,
	root: PropTypes.bool,
	depth: PropTypes.number.isRequired,
};
