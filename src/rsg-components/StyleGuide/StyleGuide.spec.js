import React from 'react';
import Components from '../Components';
import Logo from '../Logo';
import Message from '../Message';
import TableOfContents from '../TableOfContents';
import StyleGuide from './StyleGuide';
import { StyleGuideRenderer } from './StyleGuideRenderer';

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

it('should render components list', () => {
	const actual = shallow(
		<StyleGuide
			codeKey={1}
			config={config}
			components={components}
			sections={sections}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should pass error message instead of components list when there is no components and sections', () => {
	const actual = shallow(
		<StyleGuide
			codeKey={1}
			config={config}
			components={[]}
			sections={[]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('renderer should render logo, table on contents and components', () => {
	const actual = shallow(
		<StyleGuideRenderer
			classes={{}}
			title={config.title}
			components={<Components components={components} sections={sections} />}
			sections={sections}
			toc={<TableOfContents components={components} sections={sections} />}
			homepageUrl="http://react-styleguidist.js.org/"
			sidebar
		/>
	);

	expect(actual).toMatchSnapshot();
});
