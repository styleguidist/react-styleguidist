import React, { PropTypes } from 'react';
import MDReactComponent from 'markdown-react-js';
import cx from 'classnames';
import unescapeHtml from 'lodash/unescape';

import s from './Markdown.css';

/* eslint-disable react/prop-types, react/no-multi-comp */

const headingRegExp = /^h(\d)$/;

function handleIterate(Tag, props, children) {
	// Increase the level of headings
	let m = Tag.match(headingRegExp);
	if (m) {
		Tag = 'h' + (Number(m[1]) + 2);
	}

	// Add class name with tag name to all tags: <span class="span"/>
	if (!props.className) {
		props.className = s[Tag];
	}

	// Unescape inline code blocks
	if (Tag === 'code' && !props['data-language']) {
		children = children.map(unescapeHtml);
	}

	return <Tag {...props}>{children}</Tag>;
}

export default function Markdown({
	text,
	className
}) {
	let classes = cx(s.root, className);

	return (
		<MDReactComponent
			text={text}
			className={classes}
			onIterate={handleIterate}
		/>
	);
}

Markdown.propTypes = {
	text: PropTypes.string.isRequired,
	className: PropTypes.string
};
