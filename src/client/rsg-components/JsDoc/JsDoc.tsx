import React from 'react';
import PropTypes from 'prop-types';
import { TagProps, TagObject } from 'react-docgen';
import map from 'lodash/map';
import Markdown from 'rsg-components/Markdown';

const plural = (array: TagObject[], caption: string) =>
	array.length === 1 ? caption : `${caption}s`;
const list = (array: TagObject[]) => array.map(item => item.description).join(', ');
const paragraphs = (array: TagObject[]) => array.map(item => item.description).join('\n\n');

const fields = {
	deprecated: (value: TagObject[]) => `**Deprecated:** ${value[0].description}`,
	see: (value: TagObject[]) => paragraphs(value),
	link: (value: TagObject[]) => paragraphs(value),
	author: (value: TagObject[]) => `${plural(value, 'Author')}: ${list(value)}`,
	version: (value: TagObject[]) => `Version: ${value[0].description}`,
	since: (value: TagObject[]) => `Since: ${value[0].description}`,
};

export function getMarkdown(props: TagProps) {
	return map(fields, (format: (value: TagObject[]) => string, field: keyof TagProps) => {
		const tag = props[field];
		return tag && format(tag);
	})
		.filter(Boolean)
		.join('\n\n');
}

export default function JsDoc(props: TagProps) {
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
