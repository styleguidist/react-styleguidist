import React from 'react';
import PropTypes from 'prop-types';
import Link from 'rsg-components/Link';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';

const styles = ({ base, font, monospace, light, spacing }) => ({
	root: {
		marginBottom: spacing.space48,
		fontSize: 16,
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	header: {
		position: 'relative',
		marginBottom: spacing.space24,
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
		color: base,
		position: 'relative',
		marginTop: 0,
		marginBottom: spacing.space8,
		fontFamily: font,
		fontSize: 36,
		fontWeight: 'normal',
	},
	heading: {
		color: base,
		margin: [[0, 0, spacing.space8]],
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
		color: base,
		marginBottom: spacing.space24,
		fontSize: 16,
	},
	subsection: {
		marginBottom: spacing.space32,
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
