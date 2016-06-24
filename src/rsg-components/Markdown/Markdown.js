import React, { PropTypes } from 'react';
import MDReactComponent from 'markdown-react-js';
import cx from 'classnames';
import unescapeHtml from 'lodash/unescape';

import s from './Markdown.css';

/* eslint-disable no-console, react/prop-types */

const headingRegExp = /^h(\d)$/;
const voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta',
	'param', 'source', 'track', 'wbr'];
const bugsUrl = 'https://github.com/sapegin/react-styleguidist/issues';

// Fixing malformed HTML (closing tags, fixing entities)
function fixHTML(html) {
	var div = document.createElement('div');
	div.innerHTML = html;
	return {__html: div.innerHTML};
}

function handleIterate(Tag, props, children) {
	// Increase the level of headings
	let m = Tag.match(headingRegExp);
	if (m) {
		Tag = 'h' + (Number(m[1]) + 2);
	}

	// Add class name with tag name to all tags: <span class="span"/>
	if (!props.className) {
		if (s[Tag]) {
			props.className = s[Tag];
		}
		else {
			console.error(`No CSS class to render tag "${Tag}". Please report this issue at ${bugsUrl}`);
		}
	}

	if (Tag === 'code') {
		if (props['data-language']) {
			// Render fenced blocks with language flag as highlighted source
			return <div key={props.key} dangerouslySetInnerHTML={{ __html: children }} />;
		}

		// Unescape inline code blocks
		children = children.map(unescapeHtml);
	}

	// Very basic HTML support
	if (Tag === 'p' && children[0] && children[0][0] === '<') {
		return <div key={props.key} dangerouslySetInnerHTML={fixHTML(children)} />;
	}

	// Avoid React warning about void elements with children
	if (voidTags.indexOf(Tag) !== -1) {
		return <Tag {...props} />;
	}
	return <Tag {...props}>{children}</Tag>;
}

export default function Markdown({
	text,
	className,
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
	className: PropTypes.string,
};
