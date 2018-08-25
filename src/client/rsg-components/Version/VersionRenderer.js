import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }) => ({
	version: {
		color: color.light,
		margin: [[5, 0, 0, 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		fontWeight: 'normal',
	},
});

export function VersionRenderer({ classes, children }) {
	return (
		<p aria-label="version" className={classes.version}>
			{children}
		</p>
	);
}

VersionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(VersionRenderer);
