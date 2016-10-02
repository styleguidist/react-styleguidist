import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import classnames from 'classnames';

const s = require('./StyleGuide.css');

const StyleGuideRenderer = ({ title, components, toc, sidebar }) => (
	<div className={classnames(s.root, { [s.withoutSidebar]: !sidebar })}>
		<main className={s.wrapper}>
			<div className={s.content}>
				<div className={s.components}>
					{components}
					<footer className={s.footer}>
						<Markdown
							text="Generated with [React Styleguidist](https://github.com/sapegin/react-styleguidist)"
						/>
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

StyleGuideRenderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
};

export default StyleGuideRenderer;
