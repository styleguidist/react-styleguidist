import { PropTypes } from 'react';

import s from './StyleGuide.css';

const StyleGuideRenderer = ({ title, components, toc, sidebar }) => (
	<div className={s.root}>
		<main className={s.content}>
			<h1 className={s.heading}>{title}</h1>
			<div className={s.wrapper}>
				<div className={s.components}>
					{components}
					<footer className={s.footer}>
						Generated with <a className={s.link} href="https://github.com/styleguidist/react-styleguidist">React Styleguidist</a>
					</footer>
				</div>
				{sidebar &&
					<div className={s.sidebar}>{toc}</div>
				}
			</div>
		</main>
	</div>
);

StyleGuideRenderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
};

export default StyleGuideRenderer;
