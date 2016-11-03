import React, { PropTypes } from 'react';

const SectionRenderer = ({ name, content, components }) => {
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

SectionRenderer.propTypes = {
	name: PropTypes.string.isRequired,
	content: PropTypes.node,
	components: PropTypes.object,
};

export default SectionRenderer;
