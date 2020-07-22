import deepfreeze from 'deepfreeze';
import processComponents from '../processComponents';

const options = { useRouterLinks: false };

describe('processComponents', () => {
	it('should set components’ displayName to a name property', () => {
		const components = deepfreeze([
			{
				props: {
					displayName: 'Foo',
				},
			},
		]);
		const result = processComponents(components, options);
		expect(result[0].name).toBe('Foo');
	});

	it('should calculate href', () => {
		const components = deepfreeze([
			{
				slug: 'foo',
				props: {
					displayName: 'Foo',
				},
			},
		]);
		const result = processComponents(components, options);
		expect(result[0].href).toBe('/#foo');
	});

	describe('should set visibleName property on the component', () => {
		it('from an visibleName component prop if available', () => {
			const components = deepfreeze([
				{
					props: {
						displayName: 'Foo',
						visibleName: 'Foo Bar',
					},
				},
			]);
			const result = processComponents(components, options);
			expect(result[0].visibleName).toBe('Foo Bar');
		});

		it('from an displayName component prop if visibleName prop is not available', () => {
			const components = deepfreeze([
				{
					props: {
						displayName: 'Foo',
					},
				},
			]);
			const result = processComponents(components, options);
			expect(result[0].visibleName).toBe('Foo');
		});
	});

	it('should append @example doclet to all examples', () => {
		const components = deepfreeze([
			{
				props: {
					displayName: 'Foo',
					examples: [1, 2] as any[],
					example: [3, 4] as any[],
				},
			},
		]);
		const result = processComponents(components, options);
		expect(result[0].props && result[0].props.examples).toEqual([1, 2, 3, 4]);
	});
});
