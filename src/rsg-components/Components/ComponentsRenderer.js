import React, { PropTypes } from 'react';

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
