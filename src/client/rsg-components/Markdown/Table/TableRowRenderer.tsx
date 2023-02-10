import React from 'react';
import PropTypes from 'prop-types';

interface Props {
	children?: React.ReactNode;
}

export const TableRowRenderer = ({ children }: Props) => {
	return <tr>{children}</tr>;
};
TableRowRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TableRowRenderer;
