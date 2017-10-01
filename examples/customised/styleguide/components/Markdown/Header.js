import React from 'react';
import PropTypes from 'prop-types';

import s from './Header.css'

function Header({ level, children }) {
	return React.createElement(
		`h${level}`,
		{
			className: s[`h${level}`],
		},
		children
	);
}

Header.propTypes = {
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
	children: PropTypes.node,
};

export default {
	h1: {
		component: Header,
		props: {
			level: 1,
		},
	},
	h2: {
		component: Header,
		props: {
			level: 2,
		},
	},
	h3: {
		component: Header,
		props: {
			level: 3,
		},
	},
	h4: {
		component: Header,
		props: {
			level: 4,
		},
	},
	h5: {
		component: Header,
		props: {
			level: 5,
		},
	},
	h6: {
		component: Header,
		props: {
			level: 6,
		},
	},

};
