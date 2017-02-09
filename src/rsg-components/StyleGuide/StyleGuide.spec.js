import React from 'react';
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
const sections = [{ components }];
const config = {
	title: 'Hello',
};

it('should render components list', () => {
	const actual = shallow(
		<StyleGuide
			codeKey={1}
			config={config}
			sections={sections}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render error message when there is no components and sections', () => {
	const actual = shallow(
		<StyleGuide
			codeKey={1}
			config={config}
			sections={[]}
		/>
	);

	expect(actual).toMatchSnapshot();
});

describe('sidebar rendering', () => {
	it('renderer should have sidebar if showSidebar is not set', () => {
		const wrapper = shallow(
			<StyleGuide
				codeKey={1}
				config={config}
				sections={sections}
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(true);
	});

	it('renderer should not have sidebar if showSidebar is false', () => {
		const wrapper = shallow(
			<StyleGuide
				codeKey={1}
				config={{
					...config,
					showSidebar: false,
				}}
				sections={sections}
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(false);
	});

	it('renderer should not have sidebar in isolation mode', () => {
		const wrapper = shallow(
			<StyleGuide
				codeKey={1}
				config={config}
				sections={sections}
				isolatedComponent
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(false);
	});

	it('renderer should not have sidebar if there are no sections', () => {
		const wrapper = shallow(
			<StyleGuide
				codeKey={1}
				config={config}
				sections={[]}
			/>
		);
		expect(wrapper.prop('hasSidebar')).toEqual(false);
	});
});

it('renderer should render logo, table of contents and passed children', () => {
	const actual = shallow(
		<StyleGuideRenderer
			classes={{}}
			title={config.title}
			toc={<TableOfContents components={components} sections={sections} />}
			homepageUrl="http://react-styleguidist.js.org/"
			sidebar
		>
			<h1>Content</h1>
		</StyleGuideRenderer>
	);

	expect(actual).toMatchSnapshot();
});
