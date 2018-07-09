import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }) => ({
	version: {
		color: color.lightest,
		margin: [[5, 0, 0, 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		fontWeight: 'normal',
	},
});

export function VersionRenderer({ classes, children }) {
	return <h2 className={classes.version}>{children}</h2>;
}

VersionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(VersionRenderer);
