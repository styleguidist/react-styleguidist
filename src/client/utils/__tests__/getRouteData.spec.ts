/* eslint-disable @typescript-eslint/naming-convention */

import deepfreeze from 'deepfreeze';
import getRouteData from '../getRouteData';
import { DisplayModes } from '../../consts';
import * as Rsg from '../../../typings';

const module: Rsg.ExamplesModule = {
	default: () => null,
	__esModule: true,
	__documentScope: {},
	__exampleScope: {},
	__storiesScope: {},
	__currentComponent: () => null,
	__examples: [],
	__namedExamples: {},
};

const sections: Rsg.Section[] = deepfreeze([
	{
		exampleMode: 'collapse',
		sections: [
			{
				name: 'Components',
				slug: 'components',
				components: [
					{
						name: 'Button',
						props: {
							displayName: 'Button',
							examples: module,
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
				content: module,
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
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'component',
				targetIndex: undefined,
				sections: [
					expect.objectContaining({
						components: [expect.objectContaining({ name: 'Button' })],
					}),
				],
			})
		);
	});

	it('should return one section', () => {
		const result = getRouteData(sections, '#!/Section');
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'section',
				targetIndex: undefined,
				sections: [
					expect.objectContaining({
						name: 'Section',
						components: [],
						sections: [],
					}),
				],
			})
		);
	});

	it('should return target index for a component', () => {
		const result = getRouteData(sections, '#!/Button//1');
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'example',
				targetIndex: 1,
				sections: [
					expect.objectContaining({
						components: [expect.objectContaining({ name: 'Button' })],
					}),
				],
			})
		);
	});

	it('should return target index as a string for a component', () => {
		const result = getRouteData(sections, '#!/Button//basic');
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'example',
				targetIndex: 'basic',
				sections: [
					expect.objectContaining({
						components: [expect.objectContaining({ name: 'Button' })],
					}),
				],
			})
		);
	});

	it('should return target index for a section', () => {
		const result = getRouteData(sections, '#!/Section//1');
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'example',
				targetIndex: 1,
				sections: [
					expect.objectContaining({
						name: 'Section',
						components: [],
						sections: [],
					}),
				],
			})
		);
	});

	it('should return first section if pagePerSection and hash is empty', () => {
		const subSection = sections[0].sections as Rsg.Section[];
		const result = getRouteData(subSection, '', true);
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'all',
				targetIndex: undefined,
				sections: [
					expect.objectContaining({
						name: 'Components',
						components: [
							expect.objectContaining({ name: 'Button' }),
							expect.objectContaining({ name: 'Image' }),
						],
						sections: [],
					}),
				],
			})
		);
	});

	it('should return one section without components if pagePerSection=true', () => {
		const result = getRouteData(sections, '#/Buttons', true);
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'all',
				targetIndex: undefined,
				sections: [
					expect.objectContaining({
						name: 'Buttons',
						components: [],
						sections: [],
					}),
				],
			})
		);
	});

	it('should return one component if pagePerSection=true and hash has a component', () => {
		const result = getRouteData(sections, '#/Buttons/Label', true);
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'all',
				targetIndex: undefined,
				sections: [
					expect.objectContaining({
						slug: 'buttons',
						components: [expect.objectContaining({ name: 'Label' })],
					}),
				],
			})
		);
	});

	it('should return not found if pagePerSection=true and hash does not exist', () => {
		const result = getRouteData(sections, '#/Buttons/Label/Not', true);
		expect(result).toEqual(
			expect.objectContaining({
				displayMode: 'notFound',
				targetIndex: undefined,
				sections: [],
			})
		);
	});
});
