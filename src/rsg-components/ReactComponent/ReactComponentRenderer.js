import React from 'react';
import PropTypes from 'prop-types';
import Link from 'rsg-components/Link';
import Heading from 'rsg-components/Heading';
import Styled from 'rsg-components/Styled';
import JsDocAuthors from 'rsg-components/JsDoc/Authors';
import JsDocDeprecated from 'rsg-components/JsDoc/Deprecated';
import JsDocLinks from 'rsg-components/JsDoc/Links';
import JsDocSince from 'rsg-components/JsDoc/Since';
import JsDocVersion from 'rsg-components/JsDoc/Version';

const styles = ({ font, monospace, light }) => ({
	root: {
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
	deprecatedName: {
		textDecoration: 'line-through',
		color: light,
		fontFamily: font,
		fontSize: 36,
		fontWeight: 'normal',
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
	tags,
	examples,
	isolated = false,
}) {
	function renderComponentName(name, tags) {
		if ('deprecated' in tags) {
			return <span className={classes.deprecatedName}>{name}</span>;
		}
		return name;
	}

	return (
		<div className={classes.root} id={name + '-container'}>
			<header className={classes.header}>
				<Heading level={2} className={classes.primaryHeading} slug={slug}>
					{renderComponentName(name, tags)}
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
				<JsDocDeprecated tags={tags} />
				{description}
				<JsDocVersion tags={tags} />
				<JsDocSince tags={tags} />
				<JsDocLinks tags={tags} />
				<JsDocAuthors tags={tags} />
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
	tags: PropTypes.object,
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
