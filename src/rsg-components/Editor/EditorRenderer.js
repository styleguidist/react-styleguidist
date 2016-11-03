import React, { PropTypes } from 'react';

import s from './Editor.css';

const EditorRenderer = ({ children }) => (
	<div className={`rsg-editor ${s.root}`}>
		{children}
	</div>
);

EditorRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default EditorRenderer;
