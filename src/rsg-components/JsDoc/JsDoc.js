import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import map from 'lodash/map';

const plural = (array, caption) => (array.length === 1 ? caption : `${caption}s`);
const list = array => array.map(item => item.description).join(', ');
const paragraphs = array => array.map(item => item.description).join('\n\n');

const fields = {
	deprecated: value => `**Deprecated:** ${value[0].description}`,
	see: value => paragraphs(value),
	link: value => paragraphs(value),
	author: value => `${plural(value, 'Author')}: ${list(value)}`,
	version: value => `Version: ${value[0].description}`,
	since: value => `Since: ${value[0].description}`,
};

export function getMarkdown(props) {
	return map(fields, (format, field) => props[field] && format(props[field]))
		.filter(Boolean)
		.join('\n\n');
}

export default function JsDoc(props) {
	const markdown = getMarkdown(props);
	return markdown ? <Markdown text={markdown} /> : null;
}

JsDoc.propTypes = {
	deprecated: PropTypes.array,
	see: PropTypes.array,
	link: PropTypes.array,
	author: PropTypes.array,
	version: PropTypes.array,
	since: PropTypes.array,
};
