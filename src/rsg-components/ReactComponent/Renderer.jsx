import {PropTypes} from 'react';

const s = require('./ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples }) => {
	return (
		<div className={s.root}>
			<header className={s.header}>
				<h2 className={s.heading} id={name}>
					{name}
				</h2>
				<div className={s.pathLine}>{pathLine}</div>
			</header>
			<div>
				{description}
			</div>
			{propList}
			{examples}
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
