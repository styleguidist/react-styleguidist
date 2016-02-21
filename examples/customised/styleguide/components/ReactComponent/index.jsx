import { Component, PropTypes } from 'react';

const s = require('./ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples }) => {
	return (
		<div className={s.root} id={name}>
			<div className={s.meta}>
				<header className={s.header}>
					<a className={s.anchor} href={'#' + name}>
						<h2 className={s.heading}>{name}</h2>
					</a>
					<p className={s.pathLine}>{pathLine}</p>
					<div className={s.description}>
						{description}
					</div>
				</header>
				<div className={s.props}>
					{propList}
				</div>
			</div>
			<div className={s.examples}>
				{examples}
			</div>
		</div>
	);
};

Renderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.object,
	propList: PropTypes.object,
	examples: PropTypes.array
};


export default Renderer;
