import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ReactComponentRenderer = ({ imagePath, hasSlice, nameFallback, designMarkdown, name, pathLine, description, props, examples, sidebar }) => {
	const isSingleColumn = !designMarkdown || !props;

	const rendererClass = 'rsg-react-component__renderer';
	const containerClass = 'rsg-react-component__renderer-container';

	const designClasses = classNames(containerClass, 'pr3-ns w-100 w-50-ns', {
		fl: !isSingleColumn,
		center: isSingleColumn,
	});

	const codeClasses = classNames(containerClass, 'pl3-ns w-100 w-50-ns', {
		fl: !isSingleColumn,
		center: isSingleColumn,
	});

	return sidebar ?
		<a href={`#!/${name}`} className={`${rendererClass} bg-white db b--black-30 br2 ba pa4 mt2 no-underline trans-all shadow-hover`}>
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
								<img className="mb2" src={`${imagePath}${nameFallback}/assets/slice.png`} />
							</div>
						}
						{designMarkdown}
					</div>
				}
				<div className={codeClasses}>
					<h2>Code</h2>
					{description}
					{props}
					{examples}
				</div>
			</article>
		</div>;
};

ReactComponentRenderer.propTypes = {
	imagePath: PropTypes.string.isRequired,
	hasSlice: PropTypes.bool.isRequired,
	nameFallback: PropTypes.string.isRequired,
	designMarkdown: PropTypes.node,
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	examples: PropTypes.node,
	sidebar: PropTypes.bool,
};

export default ReactComponentRenderer;
