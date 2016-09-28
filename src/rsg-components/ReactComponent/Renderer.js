import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const Renderer = ({ name, pathLine, description, propList, examples, designMarkdown, sidebar }) => {
	return sidebar ?
		<a href={`#!/${name}`} className="bg-white db b--black-30 br2 ba pa4 mt3 no-underline">
			<h3 className="ma0 black f3 fw4">
				{name}
			</h3>
		</a>
	:
		<div>
			<h1 id={name}>
				{name}
			</h1>
			<article className="cf">
				<div className="fl pr3-ns w-100 w-50-ns">
					<h2>Design</h2>
					{designMarkdown}
				</div>
				<div className="fl pl3-ns w-100 w-50-ns">
					<h2>Code</h2>
					{description}
					{propList}
					{examples}
				</div>
			</article>
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
