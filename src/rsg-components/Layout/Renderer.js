import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Downloads from 'rsg-components/Downloads';

const s = require('./Layout.css');

const ROUTES = {
	DEFAULT: 'Default',
	DOWNLOADS: 'Downloads'
};

const Renderer = ({ title, components, toc, sidebar, routeName }) => (
	<div className={classnames(s.root, { [s.withoutSidebar]: !sidebar })}>
		<main className={s.wrapper}>
			{((routeName) => {
				switch(routeName) {
					case ROUTES.DOWNLOADS:
						return <Downloads />
					default:
						return (
							<div className={s.content}>
								<div className={s.components}>
									{components}
									<footer className={s.footer}>
										Generated with <a className={s.link} href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
									</footer>
								</div>
							</div>
						)
				}
			})(routeName)}
			<div className={s.sidebar}>
				<h1 className={s.heading}>{title}</h1>
				<a style={{display: 'block'}} href="#">Library</a>
				<a style={{display: 'block'}} href="#/Downloads">Downloads</a>
			</div>
		</main>
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
};

export default Renderer;
