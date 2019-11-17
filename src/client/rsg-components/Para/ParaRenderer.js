import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, color, fontFamily }) => ({
	para: {
		marginTop: 0,
		marginBottom: space[2],
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: 'inherit',
		lineHeight: 1.5,
	},
});

export function ParaRenderer({ classes, semantic, children }) {
	const Tag = semantic || 'div';

	return <Tag className={classes.para}>{children}</Tag>;
}

ParaRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	semantic: PropTypes.oneOf(['p']),
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(ParaRenderer);
