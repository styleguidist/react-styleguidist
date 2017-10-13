import React from 'react';
import PropTypes from 'prop-types';

import s from './Header.css';

function Header({ level, children }) {
	return React.createElement(
		level,
		{
			className: s[level],
		},
		children
	);
}

Header.propTypes = {
	level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
	children: PropTypes.node.isRequired,
};

export default Header;
