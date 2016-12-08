import vm from 'vm';
import getPropsCode from '../getPropsCode';

it('getPropsCode() should return valid JS for props', () => {
	const result = getPropsCode({
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

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(result).toMatchSnapshot();
});

it('getPropsCode() should return valid JS for props without description', () => {
	const result = getPropsCode({
		props: {
			children: {
				type: {},
				required: true,
				description: 'Button label.',
			},
		},
	});

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(result).toMatchSnapshot();
});

it('getPropsCode() should return valid JS for props with doclets', () => {
	const result = getPropsCode({
		description: `
The only true button.

@example example.md
`,
	});

	expect(new vm.Script(`a=${result}`)).not.toThrowError(SyntaxError);
	expect(result).toMatchSnapshot();
});
