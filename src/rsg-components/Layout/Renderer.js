import React, { PropTypes } from 'react';

const Renderer = ({ title, components }) => (
	<div>
		{components}
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
};

export default Renderer;
