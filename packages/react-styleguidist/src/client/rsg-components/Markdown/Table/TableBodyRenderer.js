import React from 'react';
import PropTypes from 'prop-types';

export function TableBodyRenderer({ children }) {
	return <tbody>{children}</tbody>;
}
TableBodyRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TableBodyRenderer;
