import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontSize, fontFamily }) => ({
	td: {
		padding: [[space[0], space[2], space[0], 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		lineHeight: 1.5,
	},
	th: {
		composes: '$td',
		fontWeight: 'bold',
	},
});

export function TableCellRenderer({ classes, header, children }) {
	if (header) {
		return <th className={classes.th}>{children}</th>;
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
