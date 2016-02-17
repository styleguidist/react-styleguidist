const s = require('./ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples }) => {
	return (
		<div className={s.root}>
			<header className={s.header}>
				<h2 className={s.heading} id={name}>
					<a className={s.anchor} href={'#' + name}></a>
					{name}
				</h2>
				<div className={s.pathLine}>{pathLine}</div>
			</header>
			<div className={s.description}>
				{description}
			</div>
			{propList}
			{examples}
		</div>
	);
};

export default Renderer;
