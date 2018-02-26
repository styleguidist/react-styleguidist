import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Styled from 'rsg-components/Styled';

const styles = ({ space, fontSize, fontFamily }) => ({
	td: {
		fontFamily: fontFamily.base,
		padding: [[space[0], space[2], space[0], 0]],
		fontSize: fontSize.base,
	},
	th: {
		fontWeight: 'bold',
	},
});

export function TableCellRenderer({ classes, header, children }) {
	if (header) {
		return <th className={cx(classes.td, classes.th)}>{children}</th>;
	}

	return <td className={classes.td}>{children}</td>;
}
TableCellRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	header: PropTypes.bool,
	children: PropTypes.node.isRequired,
};
TableCellRenderer.defaultProps = {
	header: false,
};

export default Styled(styles)(TableCellRenderer);
