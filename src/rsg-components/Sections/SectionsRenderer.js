import React, { PropTypes } from 'react';

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
