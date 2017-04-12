import React from 'react';
import PropTypes from 'prop-types';

const SectionsRenderer = ({ sections }) => {
	return (
		<div>
			{sections}
		</div>
	);
};

SectionsRenderer.propTypes = {
	sections: PropTypes.array.isRequired,
};

export default SectionsRenderer;
