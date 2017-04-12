import React from 'react';
import PropTypes from 'prop-types';

const ComponentsRenderer = ({ components, sections }) => (
	<div>
		{components}
		{sections}
	</div>
);

ComponentsRenderer.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.node.isRequired,
};

export default ComponentsRenderer;
