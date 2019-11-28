import React from 'react';
import PropTypes from 'prop-types';
import { TagProps } from 'react-docgen';
import map from 'lodash/map';
import Markdown from 'rsg-components/Markdown';
import { Tag } from 'doctrine';

const plural = (array: any[], caption: string) => (array.length === 1 ? caption : `${caption}s`);
const list = (array: Tag[]) => array.map(item => item.description).join(', ');
const paragraphs = (array: Tag[]) => array.map(item => item.description).join('\n\n');

const fields = {
	deprecated: (value: Tag[]) => `**Deprecated:** ${value[0].description}`,
	see: (value: Tag[]) => paragraphs(value),
	link: (value: Tag[]) => paragraphs(value),
	author: (value: Tag[]) => `${plural(value, 'Author')}: ${list(value)}`,
	version: (value: Tag[]) => `Version: ${value[0].description}`,
	since: (value: Tag[]) => `Since: ${value[0].description}`,
};

export function getMarkdown(props: TagProps) {
	return map(fields, (format: (value: Tag[]) => string, field: keyof TagProps) => {
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
