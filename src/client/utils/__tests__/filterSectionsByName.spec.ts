import deepfreeze from 'deepfreeze';
import filterSectionsByName from '../filterSectionsByName';
import * as Rsg from '../../../typings';

const sectionsRaw: Rsg.Section[] = [
	{
		exampleMode: 'collapse',
		name: 'General',
		sections: [
			{
				exampleMode: 'collapse',
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
];
const sections = deepfreeze(sectionsRaw);

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
