import React, { PropTypes } from 'react';

const Renderer = ({ title, components }) => (
	<main>
		{components}
	</main>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
};

export default Renderer;
