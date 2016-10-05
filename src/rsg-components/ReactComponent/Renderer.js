import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

import classNames from 'classnames';

const BUILD_ORIGIN = process.env.NODE_ENV === 'development' ? DEV_BUILD_ORIGIN : PROD_BUILD_ORIGIN

const Renderer = ({ name, hasSlice, nameFallback, pathLine, description, propList, examples, designMarkdown, sidebar }) => {
	const isSingleColumn = !designMarkdown || !propList;

    const rendererClass = 'rsg-react-component__renderer'

	const designClasses = classNames('pr3-ns w-100 w-50-ns', {
		'fl': !isSingleColumn,
		'center': isSingleColumn
	})

	const codeClasses = classNames('pl3-ns w-100 w-50-ns', {
		'fl': !isSingleColumn,
		'center': isSingleColumn
	})

	return sidebar ?
		<a href={`#!/${name}`} className={`${rendererClass} bg-white db b--black-30 br2 ba pa4 mt3 no-underline shadow-hover`}>
			<h3 className="ma0 black f3 fw4">
				{name}
			</h3>
		</a>
	:
		<div className={rendererClass}>
			<h1 id={name}>
				{name}
			</h1>
			<article className="cf">
				{designMarkdown &&
					<div className={designClasses}>
						<h2>Design</h2>
						{hasSlice &&
							<div>
								<h4 className="ReactStyleguidist-Markdown__h4 ReactStyleguidist-common__font">
									Exported Slice
								</h4>
								<img className="mb2" src={`${BUILD_ORIGIN}slices/${nameFallback}/slice.png`} />
							</div>
						}
						{designMarkdown}
					</div>
				}
				{propList &&
					<div className={codeClasses}>
						<h2>Code</h2>
						{description}
						{propList}
						{examples}
					</div>
				}
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
