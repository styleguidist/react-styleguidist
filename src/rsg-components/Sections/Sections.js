import React from 'react';
import PropTypes from 'prop-types';
import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';

export default function Sections({ sections }) {
	return (
		<SectionsRenderer>
			{sections.map((section, idx) => {
				if (section.sections.length || section.components.length || section.content) {
					return <Section key={idx} section={section} />;
				}

				return null;
			})}
		</SectionsRenderer>
	);
}

Sections.propTypes = {
	sections: PropTypes.array.isRequired,
};
