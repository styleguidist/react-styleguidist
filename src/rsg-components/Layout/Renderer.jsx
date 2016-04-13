import {PropTypes} from 'react';
import classnames from 'classnames';

const s = require('./Layout.css');

const Renderer = ({ title, components, toc, sidebar }) => (
	<div className={classnames(s.root, { [s.withoutSidebar]: !sidebar })}>
		<main className={s.wrapper}>
			<div className={s.content}>
				<div className={s.components}>
					{components}
					<footer className={s.footer}>
						Generated with <a className={s.link} href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
					</footer>
				</div>
			</div>
			<div className={s.sidebar}>
				<h1 className={s.heading}>{title}</h1>
				{toc}
			</div>
		</main>
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool
};

export default Renderer;
