import { PropTypes } from 'react';
import Sticky from 'react-sticky';

import s from './Layout.css';

const Renderer = ({ title, components, toc }) => (
	<div className={s.root}>
		<main className={s.content}>
			<h1 className={s.heading}>{title}</h1>
			<div className={s.wrapper}>
				<div className={s.components}>
					{components}
					<footer className={s.footer}>
						Generated with <a className={s.link} href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
					</footer>
				</div>
				<div className={s.sidebar}>
					<Sticky className={s.sidebar} stickyClass={s.sidebarIsSticky} topOffset={-15} stickyStyle={{}}>
						{toc}
					</Sticky>
				</div>
			</div>
		</main>
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired
};

export default Renderer;
