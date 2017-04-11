import React from 'react';
import PropTypes from 'prop-types';

export default function SectionsRenderer({ sections }) {
	return (
		<div>
			{sections}
		</div>
	);
}

SectionsRenderer.propTypes = {
	sections: PropTypes.array.isRequired,
};
