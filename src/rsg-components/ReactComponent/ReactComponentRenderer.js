import React, { PropTypes } from 'react';
import Link from 'rsg-components/Link';
import Heading from 'rsg-components/Heading';
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
		marginTop: 0,
		marginBottom: 7,
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
	subsection: {
		marginBottom: 30,
	},
});

export function ReactComponentRenderer({
	classes,
	name,
	slug,
	pathLine,
	description,
	props,
	methods,
	examples,
	isolated = false,
}) {
	return (
		<div className={classes.root} id={name + '-container'}>
			<header className={classes.header}>
				<Heading level={2} className={classes.primaryHeading} slug={slug}>
					{name}
				</Heading>
				<div className={classes.pathLine}>{pathLine}</div>
				<div className={classes.isolatedLink}>
					{isolated ? (
						<Link href="/">← Back</Link>
					) : (
						<Link href={'#!/' + name}>Open isolated ⇢</Link>
					)}
				</div>
			</header>
			<div className={classes.description}>
				{description}
			</div>
			{props && (
				<div className={classes.subsection}>
					<h3 className={classes.heading}>Props</h3>
					{props}
				</div>
			)}
			{methods && (
				<div className={classes.subsection}>
					<h3 className={classes.heading}>Methods</h3>
					{methods}
				</div>
			)}
			{examples}
		</div>
	);
}

ReactComponentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.node,
	props: PropTypes.node,
	methods: PropTypes.node,
	examples: PropTypes.node,
	isolated: PropTypes.bool,
};

export default Styled(styles)(ReactComponentRenderer);
