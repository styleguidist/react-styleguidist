import React, { PropTypes } from 'react';

const Renderer = ({ title, components }) => (
	<main>
		{components}
		<footer>
			Generated with <a href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
		</footer>
	</main>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
};

export default Renderer;
