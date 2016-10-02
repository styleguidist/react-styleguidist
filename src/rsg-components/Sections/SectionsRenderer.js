import React, { PropTypes } from 'react';

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
