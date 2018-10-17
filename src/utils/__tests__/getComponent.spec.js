import getComponent from '../getComponent';

describe('getComponent', () => {
	describe('if there is a default export in the module', () => {
		it('should return that', () => {
			const module = { default: 'useMe' };
			const actual = getComponent(module);
			expect(actual).toBe(module.default);
		});
	});

	describe('if there is more than one named export but no default', () => {
		it('should fall back on returning the module as a whole', () => {
			const module = { RandomName: 'isNamed', confusingExport: 123 };
			const actual = getComponent(module);
			expect(actual).toBe(module);
		});
	});

	describe('if there is one export but no default', () => {
		it('should fall back on returning the module as a whole', () => {
			const module = { confusingExport: 123 };
			const actual = getComponent(module);
			expect(actual).toBe(module);
		});
	});
});
