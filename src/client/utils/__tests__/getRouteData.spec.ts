import deepfreeze from 'deepfreeze';
import getRouteData from '../getRouteData';
import { DisplayModes } from '../../consts';
import * as Rsg from '../../../typings';

const example0: Rsg.Example = {
	type: 'code',
	content: 'const a = 0',
	evalInContext: () => () => 3,
};

const example1: Rsg.Example = {
	type: 'markdown',
	content: '# title',
};

const sections: Rsg.Section[] = deepfreeze([
	{
		sections: [
			{
				name: 'Components',
				slug: 'components',
				components: [
					{
						name: 'Button',
						props: {
							displayName: 'Button',
							examples: [example0, example1],
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
				exampleMode: 'collapse',
				usageMode: 'collapse',
				sectionDepth: 0,
			},
			{
				name: 'Section',
				slug: 'section',
				content: [example0, example1],
				components: [],
				sections: [],
				exampleMode: 'collapse',
				usageMode: 'collapse',
				sectionDepth: 0,
			},
			{
				name: 'Buttons',
				slug: 'buttons',
				components: [
					{
						name: 'Label',
						module: 1,
					},
					{
						name: 'RandomButton',
						module: 2,
					},
				],
				sections: [],
				exampleMode: 'collapse',
				usageMode: 'collapse',
				sectionDepth: 2,
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

	it('should return first section if pagePerSection and hash is empty', () => {
		const subSection = sections[0].sections as Rsg.Section[];
		const result = getRouteData(subSection, '', true);
		expect(result).toMatchSnapshot();
	});

	it('should return one section if pagePerSection and hash is #/Section', () => {
		const result = getRouteData(sections, '#/Section', true);
		expect(result).toMatchSnapshot();
	});

	it('should return one section without components if pagePerSection and hash is #/Buttons', () => {
		const result = getRouteData(sections, '#/Buttons', true);
		expect(result).toMatchSnapshot();
	});

	it('should return one component if pagePerSection and hash is #/Buttons/Label', () => {
		const result = getRouteData(sections, '#/Buttons/Label', true);
		expect(result).toMatchSnapshot();
	});

	it('should return not found if pagePerSection and hash is #/Buttons/Label/Not', () => {
		const result = getRouteData(sections, '#/Buttons/Label/Not', true);
		expect(result).toMatchSnapshot();
	});
});
