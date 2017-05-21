import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'rsg-components/Heading';
import Markdown from 'rsg-components/Markdown';
import JsDoc from 'rsg-components/JsDoc';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontSize, fontFamily, space }) => ({
	root: {
		marginBottom: space[6],
		fontSize: fontSize.text,
	},
	header: {
		marginBottom: space[3],
	},
	heading: {
		color: color.base,
		marginBottom: space[1],
		fontFamily: fontFamily.base,
		fontSize: fontSize.h4,
		fontWeight: 'normal',
	},
	pathLine: {
		fontFamily: fontFamily.monospace,
		color: color.light,
		fontSize: fontSize.small,
	},
	description: {
		color: color.base,
		marginBottom: space[3],
		fontSize: fontSize.text,
	},
	subsection: {
		marginBottom: space[4],
	},
});

export function ReactComponentRenderer(allProps) {
	const { classes, name, slug, pathLine, description, props, methods, tags, examples } = allProps;
	return (
		<div className={classes.root} id={name + '-container'}>
			<header className={classes.header}>
				<Heading
					id={slug}
					deprecated={!!tags.deprecated}
					slotName="componentToolbar"
					slotProps={allProps}
				>
					{name}
				</Heading>
				<div className={classes.pathLine}>{pathLine}</div>
			</header>
			<div className={classes.description}>
				{description && <Markdown text={description} />}
				<JsDoc {...tags} />
			</div>
			{props &&
				<div className={classes.subsection}>
					<h3 className={classes.heading}>Props</h3>
					{props}
				</div>}
			{methods &&
				<div className={classes.subsection}>
					<h3 className={classes.heading}>Methods</h3>
					{methods}
				</div>}
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
	description: PropTypes.string,
	props: PropTypes.node,
	methods: PropTypes.node,
	examples: PropTypes.node,
	isolated: PropTypes.bool,
	metadata: PropTypes.object.isRequired,
};

ReactComponentRenderer.defaultProps = {
	tags: {},
};

export default Styled(styles)(ReactComponentRenderer);
