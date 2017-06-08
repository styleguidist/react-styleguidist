import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
import RCLlogo from './RCL-Logo';

const styles = ({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) => ({
	root: {
		color: color.base,
		backgroundColor: color.baseBackground,
	},
	hasSidebar: {
		paddingLeft: sidebarWidth,
		[mq.small]: {
			paddingLeft: 0,
		},
	},
	content: {
		maxWidth,
		padding: [[space[2], space[4]]],
		margin: [[0, 'auto']],
		[mq.small]: {
			padding: space[2],
		},
		display: 'block',
	},
	sidebar: {
		backgroundColor: color.sidebarBackground,
		border: [[color.border, 'solid']],
		borderWidth: [[0, 1, 0, 0]],
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0,
		width: sidebarWidth,
		overflow: 'auto',
		[mq.small]: {
			position: 'static',
			width: 'auto',
			borderWidth: [[1, 0, 0, 0]],
			paddingBottom: space[0],
		},
	},
	logo: {
		padding: space[2],
		display: 'block',
	},
	footer: {
		display: 'block',
		color: color.light,
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
	},
	link: {
		'&:hover, &:active': {
			color: '#1978c8',
		},
		color: '#fff',
		textDecoration: 'none',
	},
	active: {
		color: '#1978c8',
	},
});

function renderListModeToggle(selectedListType, listTypes, onListToggle, classes) {
	return (
		<ul className="list-toggle">
			{listTypes.map((type, idx) => {
				return (
					<li key={idx}>
						<a
							href={`#${type}`}
							className={cx(selectedListType === type ? classes.active : classes.link)}
							onClick={() => onListToggle(type)}
						>
							{type}
						</a>
					</li>
				);
			})}
		</ul>
	);
}

export function StyleGuideRenderer(props) {
	const {
		selectedListType,
		listTypes,
		onListToggle,
		classes,
		homepageUrl,
		children,
		toc,
		hasSidebar,
	} = props;

	return (
		<div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
			<main className={cx(classes.content, !hasSidebar ? 'fullwidth' : '')}>
				{' '}{children}
				<footer className={classes.footer}>
					<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
				</footer>
			</main>
			{hasSidebar &&
				<div className={cx(classes.sidebar, 'sidebar')}>
					<a href="/" className={classes.logo}>
						{RCLlogo()}
					</a>
					{renderListModeToggle(selectedListType, listTypes, onListToggle, classes)}
					{toc}
				</div>}
		</div>
	);
}

StyleGuideRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	toc: PropTypes.node.isRequired,
	hasSidebar: PropTypes.bool,
	selectedListType: PropTypes.string,
	listTypes: PropTypes.array,
	onListToggle: PropTypes.func,
};

export default Styled(styles)(StyleGuideRenderer);
