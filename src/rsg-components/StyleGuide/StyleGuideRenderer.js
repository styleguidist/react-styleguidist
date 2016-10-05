import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import cx from 'classnames';

const s = require('./StyleGuide.css');

const StyleGuideRenderer = ({ title, homepageUrl, components, toc, sidebar }) => (
	<div className={cx(s.root, sidebar && s.hasSidebar)}>
		<main className={s.content}>
			<div className={s.components}>
				{components}
				<footer className={s.footer}>
					<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
				</footer>
			</div>
		</main>
		{sidebar &&
			<div className={s.sidebar}>
				<h1 className={s.heading}>{title}</h1>
				{toc}
			</div>
		}
	</div>
);

StyleGuideRenderer.propTypes = {
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
};

export default StyleGuideRenderer;
