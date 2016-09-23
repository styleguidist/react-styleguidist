import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const Renderer = ({ name, pathLine, description, propList, examples, sidebar, designContent }) => {
	return (
		<div>
			{sidebar ?
				<a href={`#!/${name}`} className="bg-white db b--black-30 br2 ba pa4 mt3 no-underline">
					<h3 className="ma0 black f3 fw4">
						{name}
					</h3>
				</a>
			:
				<div>
					<div className="fixed">
						<header className="w-content-ns bg-white  h3 bb b--black-20">
							<div className="w-100 h-100 mw8 flex items-center justify-end center ph3">
								<a href="#">
									🙅
								</a>
							</div>
						</header>
					</div>
					<a href="#">← Back</a>
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
			}
		</div>
	);
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
