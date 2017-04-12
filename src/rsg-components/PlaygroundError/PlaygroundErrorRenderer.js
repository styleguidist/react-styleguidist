import React from 'react';
import PropTypes from 'prop-types';

const s = require('./PlaygroundError.css');

const PlaygroundError = ({ message }) => (
	<pre className={s.root}>{message}</pre>
);

PlaygroundError.propTypes = {
	message: PropTypes.string.isRequired,
};

export default PlaygroundError;
