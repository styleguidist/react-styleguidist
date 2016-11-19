import React, { PropTypes } from 'react';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

const styles = ({ font, base, light, border, baseBackground, codeBackground }) => ({
	root: {
		isolate: false,
		color: base,
		backgroundColor: baseBackground,
	},
	hasSidebar: {
		isolate: false,
		paddingLeft: 200,
	},
	content: {
		isolate: false,
		maxWidth: 1000,
		padding: [[15, 30]],
		margin: [[0, 'auto']],
	},
	sidebar: {
		backgroundColor: codeBackground,
		borderRight: [[1, border, 'solid']],
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0,
		width: 200,
		overflow: 'scroll',
	},
	components: {
		isolate: false,
		overflow: 'auto',  // To prevent the pane from growing out of the screen
	},
	logo: {
		padding: 15,
		borderBottom: [[1, border, 'solid']],
	},
	footer: {
		color: light,
		fontFamily: font,
		fontSize: 12,
	},
});

export const StyleGuideRenderer = ({ classes, title, homepageUrl, components, toc, sidebar }) => (
	<div className={cx(classes.root, sidebar && classes.hasSidebar)}>
		<main className={classes.content}>
			<div className={classes.components}>
				{components}
				<footer className={classes.footer}>
					<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
				</footer>
			</div>
		</main>
		{sidebar &&
			<div className={classes.sidebar}>
				<div className={classes.logo}>
					<Logo>{title}</Logo>
				</div>
				{toc}
			</div>
		}
	</div>
);

StyleGuideRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
	sidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);
