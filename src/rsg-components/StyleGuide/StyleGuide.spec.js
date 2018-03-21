import React from 'react';
import TableOfContents from '../TableOfContents';
import StyleGuide from './StyleGuide';
import { StyleGuideRenderer } from './StyleGuideRenderer';
import { DisplayModes } from '../../consts';

const sections = [
	{
		components: [
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
		],
	},
];
const config = {
	title: 'Hello',
	showSidebar: true,
};

it('should render components list', () => {
	const actual = shallow(
		<StyleGuide
			codeRevision={1}
			config={config}
			sections={sections}
			allSections={sections}
			slots={{}}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render welcome screen', () => {
	const actual = shallow(
		<StyleGuide
			codeRevision={1}
			config={config}
			sections={[]}
			allSections={[]}
			slots={{}}
			welcomeScreen
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render an error when componentDidCatch() is triggered', () => {
	const wrapper = shallow(
		<StyleGuide codeRevision={1} config={config} sections={[]} allSections={[]} slots={{}} />
	);
	wrapper
		.instance()
		.componentDidCatch({ toString: () => 'error' }, { componentStack: { toString: () => 'info' } });
	wrapper.update();
	expect(wrapper).toMatchSnapshot();
});

describe('sidebar rendering', () => {
	it('renderer should have sidebar if showSidebar is not set', () => {
		const wrapper = shallow(
			<StyleGuide
				codeRevision={1}
				config={config}
				sections={sections}
				allSections={sections}
				slots={{}}
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(true);
	});

	it('renderer should not have sidebar if showSidebar is false', () => {
		const wrapper = shallow(
			<StyleGuide
				codeRevision={1}
				config={{
					...config,
					showSidebar: false,
				}}
				sections={sections}
				allSections={sections}
				slots={{}}
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(false);
	});

	it('renderer should not have sidebar in isolation mode', () => {
		const wrapper = shallow(
			<StyleGuide
				codeRevision={1}
				config={config}
				sections={sections}
				allSections={sections}
				slots={{}}
				displayMode={DisplayModes.component}
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(false);
	});

	it('renderer should have sidebar if pagePerSection is true', () => {
		const wrapper = shallow(
			<StyleGuide
				codeRevision={1}
				config={config}
				sections={sections}
				allSections={sections}
				slots={{}}
				displayMode={DisplayModes.component}
				pagePerSection
			/>
		);

		expect(wrapper.prop('hasSidebar')).toEqual(true);
	});
});

it('renderer should render logo, table of contents, ribbon and passed children', () => {
	const actual = shallow(
		<StyleGuideRenderer
			classes={{}}
			title={config.title}
			toc={<TableOfContents sections={sections} />}
			homepageUrl="http://react-styleguidist.js.org/"
			hasSidebar
		>
			<h1>Content</h1>
		</StyleGuideRenderer>
	);

	expect(actual).toMatchSnapshot();
});
