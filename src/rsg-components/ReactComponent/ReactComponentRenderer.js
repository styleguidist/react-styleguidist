import React, { PropTypes } from 'react';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ font, monospace, light }) => ({
	root: {
		isolate: false,
		marginBottom: 50,
		fontSize: 16,
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	header: {
		position: 'relative',
		marginBottom: 20,
	},
	isolatedLink: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontFamily: font,
		fontSize: 14,
		opacity: 0,
		transition: 'opacity ease-in-out .15s .2s',
	},
	primaryHeading: {
		position: 'relative',
		margin: [[0, 0, 7]],
		fontFamily: font,
		fontSize: 36,
		fontWeight: 'normal',
	},
	heading: {
		margin: [[0, 0, 7]],
		fontFamily: font,
		fontSize: 20,
		fontWeight: 'normal',
	},
	pathLine: {
		fontFamily: monospace,
		color: light,
		fontSize: 14,
	},
	description: {
		marginBottom: 20,
		fontSize: 16,
	},
	props: {
		marginBottom: 30,
	},
});

export const ReactComponentRenderer = ({ classes, name, pathLine, description, props, examples, sidebar }) => {
	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<h2 className={classes.primaryHeading} id={name}>
					{name}
				</h2>
				<div className={classes.pathLine}>{pathLine}</div>
				<div className={classes.isolatedLink}>
					{sidebar ? (
						<Link href={'#!/' + name}>Open isolated ⇢</Link>
					) : (
						<Link href="/">← Back</Link>
					)}
				</div>
			</header>
			<div className={classes.description}>
				{description}
			</div>
			<div className={classes.props}>
				<h3 className={classes.heading}>Props</h3>
				{props}
			</div>
			{examples}
		</div>
	);
};

ReactComponentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	examples: PropTypes.node,
	sidebar: PropTypes.bool,
};

export default Styled(styles)(ReactComponentRenderer);
