import { render } from '@testing-library/react';
import renderStyleguide from '../renderStyleguide';

const styleguide = {
	config: {
		title: 'My Style Guide',
		pagePerSection: false,
	},
	welcomeScreen: false,
	patterns: ['components/**.js'],
	sections: [
		{
			exampleMode: 'collapse',
			usageMode: 'collapse',
			slug: 'section',
			components: [
				{
					slug: 'foo',
					pathLine: 'components/foo.js',
					filepath: 'components/foo.js',
					props: {
						displayName: 'Button',
						description: 'Foo foo',
					},
				},
				{
					slug: 'bar',
					pathLine: 'components/bar.js',
					filepath: 'components/bar.js',
					props: {
						displayName: 'Image',
						description: 'Bar bar',
					},
				},
			],
		},
	],
};
const codeRevision = 1;
const doc = {
	title: () => {},
};
const history = {
	replaceState: () => {},
};

test('should render the style guide', () => {
	const location = { hash: '' };
	const { getByText } = render(renderStyleguide(styleguide, codeRevision, location, doc, history));
	expect(getByText('components/foo.js')).toBeInTheDocument();
	expect(getByText('components/bar.js')).toBeInTheDocument();
});

test('should change document title', () => {
	const title = jest.fn();
	const location = { hash: '' };

	Object.defineProperty(location, 'title', {
		set: title,
	});
	renderStyleguide(styleguide, codeRevision, location, location, history);
	expect(title).toBeCalledWith('My Style Guide');
});

test('should change document title in isolated mode', () => {
	const title = jest.fn();
	const location = { hash: '#!/Button' };

	Object.defineProperty(location, 'title', {
		set: title,
	});
	renderStyleguide(styleguide, codeRevision, location, location, history);
	expect(title).toBeCalledWith('Button — My Style Guide');
});

test('should remove #/ from the address bar', () => {
	const location = { hash: '#/', pathname: '/pizza', search: '?foo=bar' };
	const historyWithSpy = { replaceState: jest.fn() };

	renderStyleguide(styleguide, codeRevision, location, location, historyWithSpy);
	expect(historyWithSpy.replaceState).toBeCalledWith('', 'My Style Guide', '/pizza?foo=bar');
});
