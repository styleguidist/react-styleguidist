import React, { PropTypes } from 'react';

const SectionsRenderer = ({ sections }) => {
	return (
		<div className="rsg-sections">
			{sections}
		</div>
  );
};

SectionsRenderer.propTypes = {
	sections: PropTypes.array.isRequired,
};

export default SectionsRenderer;
