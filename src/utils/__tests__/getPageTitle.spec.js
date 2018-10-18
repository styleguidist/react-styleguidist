import getPageTitle from '../getPageTitle';

const baseTitle = 'Styleguide';

describe('getPageTitle', () => {
	it('should return style guide title for the all view', () => {
		const result = getPageTitle([], baseTitle, 'all');
		expect(result).toBe(baseTitle);
	});

	it('should return component name for component isolation mode', () => {
		const name = 'Component';
		const result = getPageTitle([{ components: [{ name }] }], baseTitle, 'component');
		expect(result).toMatch(name);
	});

	it('should return component name for example isolation mode', () => {
		const name = 'Component';
		const result = getPageTitle([{ components: [{ name }] }], baseTitle, 'example');
		expect(result).toMatch(name);
	});

	it('should return section name for example isolation mode of a example content', () => {
		const sectionName = 'Section';
		const result = getPageTitle(
			[{ name: sectionName, content: [], components: [] }],
			baseTitle,
			'example'
		);
		expect(result).toMatch(sectionName);
	});

	it('should return section name for example isolation mode, if no components are passed', () => {
		const name = 'Section';
		const result = getPageTitle([{ name }], baseTitle, 'example');
		expect(result).toMatch(name);
	});

	it('should return section name for section isolation mode', () => {
		const name = 'Section';
		const result = getPageTitle([{ name }], baseTitle, 'section');
		expect(result).toMatch(name);
	});

	it('should return Error 404 for notFound isolation mode', () => {
		const name = 'Section';
		const result = getPageTitle([{ name }], baseTitle, 'notFound');
		expect(result).toMatch('Page not found');
	});
});
