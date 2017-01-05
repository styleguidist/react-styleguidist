import getProps from '../getProps';

it('getProps() should return an object for props', () => {
	const result = getProps({
		description: 'The only true button.',
		methods: [],
		props: {
			children: {
				type: {},
				required: true,
				description: 'Button label.',
			},
			color: {
				type: {},
				required: false,
				description: '',
			},
		},
	});

	expect(result).toMatchSnapshot();
});

it('getProps() should return an object for props without description', () => {
	const result = getProps({
		props: {
			children: {
				type: {},
				required: true,
				description: 'Button label.',
			},
		},
	});

	expect(result).toMatchSnapshot();
});

it('getProps() should return an object for props with doclets', () => {
	const result = getProps({
		description: `
The only true button.

@example example.md
`,
	});

	expect(result).toMatchSnapshot();
});
