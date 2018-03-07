import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space }) => ({
	table: {
		marginTop: 0,
		marginBottom: space[2],
		borderCollapse: 'collapse',
	},
});

export function TableRenderer({ classes, children }) {
	return <table className={classes.table}>{children}</table>;
}
TableRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(TableRenderer);
