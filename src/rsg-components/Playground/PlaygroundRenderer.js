import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
	},
	toolbar: {
		marginLeft: 'auto',
	},
	tab: {}, // expose className to allow using it in 'styles' settings
});

export function PlaygroundRenderer({
	classes,
	name,
	preview,
	previewProps,
	tabButtons,
	tabBody,
	toolbar,
}) {
	const { className, ...props } = previewProps;
	return (
		<div className={classes.root}>
			<div className={cx(classes.preview, className)} {...props} data-preview={name}>
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
	name: PropTypes.string.isRequired,
	preview: PropTypes.node.isRequired,
	previewProps: PropTypes.object.isRequired,
	tabButtons: PropTypes.node.isRequired,
	tabBody: PropTypes.node.isRequired,
	toolbar: PropTypes.node.isRequired,
};

export default Styled(styles)(PlaygroundRenderer);
