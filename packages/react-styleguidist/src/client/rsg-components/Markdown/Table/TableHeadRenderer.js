import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ color }) => ({
	thead: {
		borderBottom: [[1, color.border, 'solid']],
	},
});

export function TableHeadRenderer({ classes, children }) {
	return <thead className={classes.thead}>{children}</thead>;
}
TableHeadRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(TableHeadRenderer);
