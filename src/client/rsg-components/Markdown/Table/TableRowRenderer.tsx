import React from 'react';
import PropTypes from 'prop-types';

export const TableRowRenderer: React.FunctionComponent = ({ children }) => {
	return <tr>{children}</tr>;
};
TableRowRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TableRowRenderer;
