import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const Renderer = ({ name, pathLine, description, propList, examples, sidebar, designContent }) => {
	return sidebar ?
		<a href={`#!/${name}`} className="bg-white db b--black-30 br2 ba pa4 mt3 no-underline">
			<h3 className="ma0 black f3 fw4">
				{name}
			</h3>
		</a>
	:
		<div>
			<h2 id={name}>
				{name}
			</h2>
			<div>
				{designContent && <Markdown text={designContent.content} />}
			</div>
			<div>
				{description}
				{propList}
				{examples}
			</div>
		</div>
};

Renderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.object,
	propList: PropTypes.object,
	examples: PropTypes.array,
	sidebar: PropTypes.bool,
};

export default Renderer;
