import React, { PropTypes } from 'react';

const s = require('./ReactComponent.css');

const ReactComponentRenderer = ({ name, pathLine, description, props, examples, sidebar }) => {
	return (
		<div className={s.root}>
			<header className={s.header}>
				<h2 className={s.primaryHeading} id={name}>
					{name}
				</h2>
				<div className={s.pathLine}>{pathLine}</div>
				{sidebar ? (
					<a className={s.isolatedLink} href={'#!/' + name}>Open isolated ⇢</a>
				) : (
					<a className={s.isolatedLink} href="/">← Back</a>
				)}
			</header>
			<div>
				{description}
			</div>
			<div className={s.props}>
				<h3 className={s.heading}>Props</h3>
				{props}
			</div>
			{examples}
		</div>
	);
};

ReactComponentRenderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	examples: PropTypes.node,
	sidebar: PropTypes.bool,
};

export default ReactComponentRenderer;
