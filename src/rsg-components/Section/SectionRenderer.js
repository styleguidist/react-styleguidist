import React, { PropTypes } from 'react';

const s = require('./Section.css');

const SectionRenderer = ({ name, content, components }) => {
	return (
		<div className={s.root}>
			<header className={s.header}>
				<h1 className={s.heading} id={name}>
					<a className={s.anchor} href={'#' + name}></a>
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
