import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, color, borderRadius }) => ({
	root: {
		marginBottom: space[4],
	},
	preview: {
		padding: space[2],
		border: [[1, color.border, 'solid']],
		borderRadius,
		// the next 2 lines are required to contain floated components
		width: '100%',
		display: 'inline-block',
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: space[1],
	},
	toolbar: {
		marginLeft: 'auto',
	},
	tab: {}, // expose className to allow using it in 'styles' settings
	padded: {
		'& > *': {
			isolate: false,
			marginLeft: '-8px',
			marginRight: '-8px',
			'& > *': {
				isolate: false,
				marginRight: '8px',
				marginLeft: '8px',
			},
		},
	},
});

export function PlaygroundRenderer({
	classes,
	exampleIndex,
	name,
	padded,
	preview,
	previewProps,
	tabButtons,
	tabBody,
	toolbar,
}) {
	const { className, ...props } = previewProps;
	const previewClasses = cx(classes.preview, className, { [classes.padded]: padded });
	return (
		<div className={classes.root} data-testid={`${name}-example-${exampleIndex}`}>
			<div className={previewClasses} {...props} data-preview={name}>
				{preview}
			</div>
			<div className={classes.controls}>
				<div className={classes.tabs}>{tabButtons}</div>
				<div className={classes.toolbar}>{toolbar}</div>
			</div>
			<div className={classes.tab}>{tabBody}</div>
		</div>
	);
}

PlaygroundRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	exampleIndex: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	padded: PropTypes.bool.isRequired,
	preview: PropTypes.node.isRequired,
	previewProps: PropTypes.object.isRequired,
	tabButtons: PropTypes.node.isRequired,
	tabBody: PropTypes.node.isRequired,
	toolbar: PropTypes.node.isRequired,
};

export default Styled(styles)(PlaygroundRenderer);
