import deepfreeze from 'deepfreeze';
import filterSectionsByName from '../filterSectionsByName';

const sections = deepfreeze([
	{
		name: 'General',
		sections: [
			{
				name: 'Particles',
				components: [
					{
						name: 'Button',
					},
					{
						name: 'Image',
					},
				],
			},
		],
	},
]);

describe('filterSectionsByName', () => {
	it('should recursively filter sections and components by name', () => {
		const result = filterSectionsByName(sections, 'button');
		expect(result).toMatchSnapshot();
	});

	it('should skip sections without matches inside', () => {
		const result = filterSectionsByName(sections, 'general');
		expect(result).toMatchSnapshot();
	});

	it('should return empty array if no components of sections match query', () => {
		const result = filterSectionsByName(sections, 'pizza');
		expect(result).toEqual([]);
	});
});
