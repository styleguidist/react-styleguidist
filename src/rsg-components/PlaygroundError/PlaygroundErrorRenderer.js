import React, { PropTypes } from 'react';

const s = require('./PlaygroundError.css');

const PlaygroundError = ({ message }) => (
	<pre className={s.root}>{message}</pre>
);

PlaygroundError.propTypes = {
	message: PropTypes.string.isRequired,
};

export default PlaygroundError;
