import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, borderRadius }) => ({
	root: {
		marginBottom: space[4],
		border: [[1, color.border, 'solid']],
		borderRadius,
	},
	preview: {
		padding: space[2],
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
	},
	toolbar: {
		marginLeft: 'auto',
		marginRight: space[2],
	},
});

export function PlaygroundRenderer({ classes, name, preview, tabButtons, tabBody, toolbar }) {
	return (
		<div className={classes.root}>
			<div className={classes.preview} data-preview={name}>{preview}</div>
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
	tabButtons: PropTypes.node.isRequired,
	tabBody: PropTypes.node.isRequired,
	toolbar: PropTypes.node.isRequired,
};

export default Styled(styles)(PlaygroundRenderer);
