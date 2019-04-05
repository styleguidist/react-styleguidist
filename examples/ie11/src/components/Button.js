import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default function Button({ children }) {
	return <button className="button">{children}</button>;
}

Button.propTypes = {
	children: PropTypes.string.isRequired,
};
