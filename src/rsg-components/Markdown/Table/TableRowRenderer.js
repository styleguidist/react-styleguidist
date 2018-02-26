import React from 'react';
import PropTypes from 'prop-types';

export function TableRowRenderer({ children }) {
	return <tr>{children}</tr>;
}
TableRowRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TableRowRenderer;
