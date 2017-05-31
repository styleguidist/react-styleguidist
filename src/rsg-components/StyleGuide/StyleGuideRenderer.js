import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

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
		borderBottom: [[1, color.border, 'solid']],
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
							href={`/#${type}`}
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
		title,
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
					<div className={classes.logo}>
						<svg
							id="RCL-Logo"
							className="RCL-Logo"
							data-name="Layer 1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 604.46 284.5"
						>
							<defs />
							<title>RCL-Logo</title>
							<path
								className="cls-1"
								d="M369.45,710.25,310.83,603.09H288.61V710.25H224.92v-270h103a178.86,178.86,0,0,1,37.95,4A98.76,98.76,0,0,1,399,457.79,70.91,70.91,0,0,1,422.46,483q8.77,15.64,8.77,38.9,0,27.46-14.87,46.14t-41.19,26.7l70.55,115.55ZM366.78,523q0-9.53-4-15.45a27.55,27.55,0,0,0-10.34-9.15A45.24,45.24,0,0,0,338.23,494a105.1,105.1,0,0,0-15.14-1.14H288.22V555.8h31a105,105,0,0,0,16.48-1.33,52.63,52.63,0,0,0,15.33-4.77,29.17,29.17,0,0,0,11.3-9.92Q366.78,533.3,366.78,523Z"
								transform="translate(-224.92 -433)"
							/>
							<path
								className="cls-1"
								d="M629.16,705.48q-26.31,12-60.64,12-31.27,0-57.78-10.3a133.39,133.39,0,0,1-76.46-74.37q-11.07-26.31-11.06-58,0-32.41,11.25-58.73a130.6,130.6,0,0,1,31.08-44.81,137.7,137.7,0,0,1,46.53-28.41,166.79,166.79,0,0,1,113.84.19q27.64,10.11,44.81,29.56L626.49,516.9a54.77,54.77,0,0,0-24-18.69,79.75,79.75,0,0,0-30.51-6.1,77.26,77.26,0,0,0-31.46,6.29,73.81,73.81,0,0,0-24.6,17.35,79.12,79.12,0,0,0-16,26.12,92.22,92.22,0,0,0-5.72,33,94.86,94.86,0,0,0,5.72,33.56,78.13,78.13,0,0,0,15.83,26.12,71.19,71.19,0,0,0,24.22,17,76.94,76.94,0,0,0,30.89,6.1q19.45,0,33.94-7.63A65.81,65.81,0,0,0,628,630.16l45.38,42.71A128.55,128.55,0,0,1,629.16,705.48Z"
								transform="translate(-224.92 -433)"
							/>
							<path
								className="cls-1"
								d="M659.29,710.25v-270h65.59V653.43H829.38v56.82Z"
								transform="translate(-224.92 -433)"
							/>
						</svg>
					</div>
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
