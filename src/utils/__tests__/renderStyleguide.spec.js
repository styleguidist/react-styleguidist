import renderStyleguide from '../renderStyleguide';

const styleguide = {
	config: {
		title: 'My Style Guide',
	},
	sections: [
		{
			components: [
				{
					props: {
						displayName: 'Button',
					},
					module: 'ButtonModule',
				},
				{
					props: {
						displayName: 'Image',
					},
					module: 'ImageModule',
				},
			],
		},
	],
	welcomeScreen: false,
	patterns: ['button', 'input'],
};
const codeRevision = 1;
const location = {
	hash: '',
};
const doc = {
	title: () => {},
};
const history = {
	replaceState: () => {},
};

afterEach(() => {
	delete global.Button;
	delete global.Image;
});

describe('renderStyleguide', () => {
	it('should render StyleGuide component', () => {
		const result = shallow(renderStyleguide(styleguide, codeRevision, location, doc, history));
		expect(result).toMatchSnapshot();
	});

	it('should globalize all components', () => {
		renderStyleguide(styleguide, codeRevision, location, doc, history);
		expect(global.Button).toBe('ButtonModule');
		expect(global.Image).toBe('ImageModule');
	});

	it('should globalize all components in isolated mode', () => {
		renderStyleguide(styleguide, codeRevision, { hash: '#!/Button' }, doc, history);
		expect(global.Button).toBe('ButtonModule');
		expect(global.Image).toBe('ImageModule');
	});

	it('should change document title', () => {
		const title = jest.fn();
		const location = { hash: '' };
		Object.defineProperty(location, 'title', {
			set: title,
		});
		renderStyleguide(styleguide, codeRevision, location, location, history);
		expect(title).toBeCalledWith('My Style Guide');
	});

	it('should change document title in isolated mode', () => {
		const title = jest.fn();
		const location = { hash: '#!/Button' };
		Object.defineProperty(location, 'title', {
			set: title,
		});
		renderStyleguide(styleguide, codeRevision, location, location, history);
		expect(title).toBeCalledWith('Button — My Style Guide');
	});

	it('should remove #/ from the address bar', () => {
		const location = { hash: '#/', pathname: '/pizza', search: '?foo=bar' };
		const history = { replaceState: jest.fn() };
		renderStyleguide(styleguide, codeRevision, location, location, history);
		expect(history.replaceState).toBeCalledWith('', 'My Style Guide', '/pizza?foo=bar');
	});
});
