import React from 'react';
import PropTypes from 'prop-types';

import s from './Editor.css';

const EditorRenderer = ({ children }) => (
	<div className={s.root}>
		{children}
	</div>
);

EditorRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default EditorRenderer;
