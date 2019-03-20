import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, link, baseBackground, mq }) => ({
	root: {
		color: base,
		backgroundColor: baseBackground,
	},
	header: {
		color: '#fff',
		backgroundColor: link,
	},
	bar: {
		display: 'flex',
		alignItems: 'center',
		[xsmall]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	nav: {
		marginLeft: 'auto',
		marginRight: '-0.5em',
		[xsmall]: {
			margin: [[10, 0, 0]],
		},
	},
	headerLink: {
		'&, &:link, &:visited': {
			marginLeft: '0.5em',
			marginRight: '0.5em',
			fontFamily: font,
			color: '#efefef',
		},
		'&:hover, &:active': {
			color: '#fff',
			cursor: 'pointer',
		},
	},
	content: {
		maxWidth: 1000,
		padding: [[15, 30]],
		margin: [[0, 'auto']],
		[mq.small]: {
			padding: 15,
		},
		display: 'block',
	},
	components: {
		overflow: 'auto', // To prevent the pane from growing out of the screen
	},
	footer: {
		display: 'block',
		color: light,
		fontFamily: font,
		fontSize: 12,
	},
});

export function StyleGuideRenderer({ classes, title, homepageUrl, children }) {
	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<div className={classes.content}>
					<div className={classes.bar}>
						<Logo>{title}</Logo>
						<nav className={classes.nav}>
							<a
								className={classes.headerLink}
								href="https://github.com/styleguidist/react-styleguidist/tree/master/docs"
							>
								Docs
							</a>
							<a
								className={classes.headerLink}
								href="https://github.com/styleguidist/react-styleguidist"
							>
								GitHub
							</a>
							<a className={classes.headerLink} href="https://gitter.im/styleguidist/styleguidist">
								Gitter
							</a>
						</nav>
					</div>
				</div>
			</header>
			<main className={classes.content}>
				{children}
				<footer className={classes.footer}>
					<Markdown text={`Created with [React Styleguidist](${homepageUrl}) ❤️`} />
				</footer>
			</main>
		</div>
	);
}

StyleGuideRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(StyleGuideRenderer);
