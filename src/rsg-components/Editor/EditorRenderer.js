import React, { PropTypes } from 'react';

import s from './Editor.css';

const EditorRenderer = ({ children, isValid, isTyping }) => {
	const typingStyle = isTyping ? s.root_edit : s.root;
	return (
		<div className={isValid ? typingStyle : s.root_err}>
			{children}
		</div>);
};

EditorRenderer.propTypes = {
	children: PropTypes.node.isRequired,
	isValid: PropTypes.bool.isRequired,
	isTyping: PropTypes.bool.isRequired,
};

export default EditorRenderer;
