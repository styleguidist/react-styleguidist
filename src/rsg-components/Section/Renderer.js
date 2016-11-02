import React, { PropTypes } from 'react';

const Renderer = ({ name, content, components }) => {
	return (
		<div className="rsg-section__renderer">
			<header>
				<h1 id={name}>
					<a href={'#' + name}></a>
					{name}
				</h1>
			</header>
			<div>
				{content}
			</div>
			<div>
				{components}
			</div>
		</div>
  );
};

Renderer.propTypes = {
	name: PropTypes.string.isRequired,
	content: PropTypes.array,
	components: PropTypes.object,
};

export default Renderer;
