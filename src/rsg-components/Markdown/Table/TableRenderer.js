import React from 'react';
import PropTypes from 'prop-types';

import { styles as paraStyles } from 'rsg-components/Para';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily }) => ({
	table: {
		...paraStyles({ space, color, fontFamily }).para,
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
