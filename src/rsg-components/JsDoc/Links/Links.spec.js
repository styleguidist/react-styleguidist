import React from 'react';
import { LinksRenderer } from './LinksRenderer';

describe('Links', () => {
	function createTestTag(title, description = 'Test description') {
		return {
			title,
			description,
		};
	}

	const linkTags = {
		link: [createTestTag('link'), createTestTag('link', '[Test](#TestLink)')],
	};
	const seeTags = {
		see: [createTestTag('see'), createTestTag('see', 'Test description 2')],
	};

	it('renderer should render for one @link tag', () => {
		const tags = {
			link: [linkTags.link[0]],
		};

		const actual = render(
			<LinksRenderer classes={{}} tags={tags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render for two @link tags', () => {
		const actual = render(
			<LinksRenderer classes={{}} tags={linkTags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render for two @see tags', () => {
		const actual = render(
			<LinksRenderer classes={{}} tags={seeTags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render for mixed @see and @link tags', () => {
		const tags = {
			...linkTags,
			...seeTags,
		};

		const actual = render(
			<LinksRenderer classes={{}} tags={tags} />
		);

		expect(actual).toMatchSnapshot();
	});


	it('renderer should not render for empty tags', () => {
		const actual = shallow(
			<LinksRenderer classes={{}} tags={{}} />
		);

		expect(actual.node).toBe(null);
	});
});

