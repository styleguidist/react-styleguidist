import React, { PropTypes } from 'react';

const Renderer = ({ title, components }) => (
	<div className="pb3">
		{components}
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
};

export default Renderer;
