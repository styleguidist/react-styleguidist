import {PropTypes} from 'react';
import classnames from 'classnames';

const s = require('./ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples, visible, active }) => {
	return (
		<div className={classnames(s.root, { [s.visible]: visible && active })}>
			<header className={s.header}>
				<h2 className={s.heading} id={name}>
					<a className={s.anchor} href={'#' + name}></a>
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
	examples: PropTypes.array,
	visible: PropTypes.bool
};


export default Renderer;
