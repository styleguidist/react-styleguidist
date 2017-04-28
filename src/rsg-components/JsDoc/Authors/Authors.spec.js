import React from 'react';
import { AuthorsRenderer } from './AuthorsRenderer';

describe('Authors', () => {
	const authorOne = {
		title: 'author',
		description: 'Test author',
	};
	const authorTwo = {
		title: 'author',
		description: '[Test](#TestLink)',
	};

	it('renderer should render for one @author tag', () => {
		const tags = {
			author: [authorOne],
		};

		const actual = render(
			<AuthorsRenderer classes={{}} tags={tags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should render for two @author tags', () => {
		const tags = {
			author: [authorOne, authorTwo],
		};

		const actual = render(
			<AuthorsRenderer classes={{}} tags={tags} />
		);

		expect(actual).toMatchSnapshot();
	});

	it('renderer should not render for empty tags', () => {
		const actual = shallow(
			<AuthorsRenderer classes={{}} tags={{}} />
		);

		expect(actual.node).toBe(null);
	});
});

