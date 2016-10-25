import React, { PropTypes } from 'react';

import s from '../Markdown/Markdown.css';

const CodeRenderer = ({ className, children }) => (
	<span className={className}>
		<code className={s.code}>{children}</code>
	</span>
);

CodeRenderer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default CodeRenderer;
