import filterComponentsByExactName from '../filterComponentsByExactName';

const components = [
	{
		name: 'Button',
	},
	{
		name: 'Image',
	},
];

describe('filterComponentsByExactName', () => {
	it('should return components with exact name', () => {
		const result = filterComponentsByExactName(components, 'Image');
		expect(result.map(x => x.name)).toEqual(['Image']);
	});
});
