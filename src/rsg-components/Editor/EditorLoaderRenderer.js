import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, color, space, fontSize }) => ({
	root: {
		padding: [[space[1], space[2], space[1], space[1]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		color: color.light,
		backgroundColor: color.codeBackground,
	},
});

export function EditorLoaderRenderer({ classes }) {
	return <div className={classes.root}>Loading…</div>;
}

EditorLoaderRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(EditorLoaderRenderer);
