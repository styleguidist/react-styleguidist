import test from 'ava';
import React from 'react';
import Components from '../Components';
import Message from '../Message';
import TableOfContents from '../TableOfContents';
import StyleGuide from './StyleGuide';
import StyleGuideRenderer from './StyleGuideRenderer';

const components = [
	{
		name: 'Foo',
		pathLine: 'components/foo.js',
		filepath: 'components/foo.js',
		props: {
			description: 'Foo foo',
		},
	},
	{
		name: 'Bar',
		pathLine: 'components/bar.js',
		filepath: 'components/bar.js',
		props: {
			description: 'Bar bar',
		},
	},
];
const sections = [];
const config = {
	title: 'Hello',
};

test('should render components list', () => {
	const actual = shallow(
		<StyleGuide
			config={config}
			components={components}
			sections={sections}
		/>
	);

	expect(actual.node, 'to contain',
		<StyleGuideRenderer
			title={config.title}
			components={<Components components={components} sections={sections} />}
			sections={sections}
			toc={<TableOfContents components={components} sections={sections} />}
			sidebar
		/>
	);
});

test('should pass error message instead of components list when there is no components and sections', () => {
	const actual = shallow(
		<StyleGuide
			config={config}
			components={[]}
			sections={[]}
		/>
	);

	expect(actual.node, 'to contain',
		<StyleGuideRenderer
			title={config.title}
			components={<Message />}
			sections={[]}
			toc={<TableOfContents components={[]} sections={[]}/>}
			sidebar
		/>
	);
});

test('renderer should render title, table on contents and components', () => {
	const actual = shallow(
		<StyleGuideRenderer
			title={config.title}
			components={<Components components={components} sections={sections} />}
			sections={sections}
			toc={<TableOfContents components={components} sections={sections} />}
			sidebar
		/>
	);

	expect(actual.node, 'to contain',
		<h1>{config.title}</h1>
	);
	expect(actual.node, 'to contain',
		<TableOfContents components={components} sections={sections} />
	);
	expect(actual.node, 'to contain',
		<Components components={components} sections={sections} />
	);
});
