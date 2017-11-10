import React from 'react';
import JsDoc, { getMarkdown } from './JsDoc';

const tags = {
	deprecated: [
		{
			title: 'description',
			description: 'Use *another* method',
		},
	],
	version: [
		{
			title: 'version',
			description: '2.0.0',
		},
	],
	since: [
		{
			title: 'since',
			description: '1.0.0',
		},
	],
	author: [
		{
			title: 'author',
			description: '[Author 1](#TestLink)',
		},
		{
			title: 'author',
			description: '[Author 2](#TestLink2)',
		},
	],
	see: [
		{
			title: 'see',
			description: '[See 1](#TestLink)',
		},
		{
			title: 'see',
			description: '[See 2](#TestLink2)',
		},
	],
	link: [
		{
			title: 'link',
			description: '[Link 1](#TestLink)',
		},
	],
};

describe('getMarkdown', () => {
	it('should return Markdown for all tags', () => {
		const result = getMarkdown(tags);
		expect(result).toMatchSnapshot();
	});

	it('should return Markdown for one author', () => {
		const result = getMarkdown({
			author: [tags.author[0]],
		});
		expect(result).toMatchSnapshot();
	});

	it('should return Markdown for multiple authors', () => {
		const result = getMarkdown({
			author: tags.author,
		});
		expect(result).toMatchSnapshot();
	});
});

describe('JsDoc', () => {
	it('should render Markdown', () => {
		const actual = shallow(<JsDoc {...tags} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render null for empty tags', () => {
		const actual = shallow(<JsDoc />);

		expect(actual.getElement()).toBe(null);
	});
});
