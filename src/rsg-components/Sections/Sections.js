import React, { PropTypes } from 'react';
import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';

export default function Sections({
	sections,
	sidebar,
}) {
	return (
		<SectionsRenderer>
			{
				sections.map((section, idx) => (
					<Section
						key={idx}
						section={section}
						sidebar={sidebar}
					/>
				))
			}
		</SectionsRenderer>
	);
}

Sections.propTypes = {
	sections: PropTypes.array.isRequired,
	sidebar: PropTypes.bool,
};
