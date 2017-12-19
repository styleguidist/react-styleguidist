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
						props: {
							displayName: 'Button',
							examples: ['example 0', 'example 1'],
						},
						module: 1,
					},
					{
						name: 'Image',
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
		const result = getRouteData(sections, '#!/Button');
		expect(result).toMatchSnapshot();
	});

	it('should return one section', () => {
		const result = getRouteData(sections, '#!/Section');
		expect(result).toMatchSnapshot();
	});

	it('should return one example from a component', () => {
		const result = getRouteData(sections, '#!/Button/1');
		expect(result).toMatchSnapshot();
	});

	it('should return one example from a section', () => {
		const result = getRouteData(sections, '#!/Section/1');
		expect(result).toMatchSnapshot();
	});
});
