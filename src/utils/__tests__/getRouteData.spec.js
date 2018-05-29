import deepfreeze from 'deepfreeze';
import getRouteData from '../getRouteData';
import { DisplayModes } from '../../consts';

const sections = deepfreeze([
	{
		sections: [
			{
				components: [
					{
						name: 'Button',
						slug: 'button',
						props: {
							displayName: 'Button',
							examples: ['example 0', 'example 1'],
						},
						module: 1,
					},
					{
						name: 'Image',
						slug: 'image',
						props: {
							displayName: 'Image',
						},
						module: 2,
					},
				],
				sections: [],
			},
			{
				name: 'Section',
				slug: 'section',
				content: ['example 0', 'example 1'],
				components: [],
				sections: [],
			},
		],
	},
]);

describe('getRouteData', () => {
	it('should return "all" mode by default', () => {
		const result = getRouteData([], '');
		expect(result.displayMode).toBe(DisplayModes.all);
	});

	it('should return one component', () => {
		const result = getRouteData(sections, '#!/button');
		expect(result).toMatchSnapshot();
	});

	it('should return one section', () => {
		const result = getRouteData(sections, '#!/section');
		expect(result).toMatchSnapshot();
	});

	it('should return one example from a component', () => {
		const result = getRouteData(sections, '#!/button/1');
		expect(result).toMatchSnapshot();
	});

	it('should return one example from a section', () => {
		const result = getRouteData(sections, '#!/section/1');
		expect(result).toMatchSnapshot();
	});

	it('should return first section if pagePerSection and hash is empty', () => {
		const result = getRouteData(sections, '', true);
		expect(result).toMatchSnapshot();
	});

	it('should return first component if pagePerSection and hash is empty', () => {
		const result = getRouteData(sections[0].sections, '', true);
		expect(result).toMatchSnapshot();
	});
});
