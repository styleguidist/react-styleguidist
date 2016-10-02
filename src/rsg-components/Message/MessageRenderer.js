import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const s = require('./Message.css');

const MessageRenderer = ({ children }) => (
	<div className={s.root}>
		<Markdown text={Array.isArray(children) ? children.join('\n') : children} />
	</div>
);

MessageRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MessageRenderer;
