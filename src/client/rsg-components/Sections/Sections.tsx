import React from 'react';
import PropTypes from 'prop-types';
import Section, { SectionViewModel } from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';

const Sections: React.FunctionComponent<{
	sections: SectionViewModel[];
	depth: number;
	root?: boolean;
}> = ({ sections, depth }) => {
	return (
		<SectionsRenderer>
			{sections
				.filter(section => !section.href)
				.map((section, idx) => (
					<Section key={idx} section={section} depth={depth} />
				))}
		</SectionsRenderer>
	);
};

Sections.propTypes = {
	sections: PropTypes.array.isRequired,
	depth: PropTypes.number.isRequired,
	root: PropTypes.bool,
};

export default Sections;
