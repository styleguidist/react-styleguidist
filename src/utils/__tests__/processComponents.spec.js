import deepfreeze from 'deepfreeze';
import processComponents from '../processComponents';

describe('processComponents', () => {
	it('should set components’ displayName to a name property', () => {
		const components = deepfreeze([
			{
				props: {
					displayName: 'Foo',
				},
				module: 13,
			},
		]);
		const result = processComponents(components);
		expect(result[0].name).toBe('Foo');
	});

	it('should append @example doclet to all examples', () => {
		const components = deepfreeze([
			{
				props: {
					displayName: 'Foo',
					examples: [1, 2],
					example: [3, 4],
				},
				module: 11,
			},
		]);
		const result = processComponents(components);
		expect(result[0].props.examples).toEqual([1, 2, 3, 4]);
	});
});
