import getComponent from '../getComponent';

describe('getComponent', () => {
	describe('if there is no default export in the module', () => {
		describe('if there is only one named export in the module', () => {
			it('should return that', () => {
				const module = { oneNamedExport: 'isLonely' };
				const actual = getComponent(module);
				expect(actual).toBe(module.oneNamedExport);
			});
		});
		describe('if there is a named export whose name matches the name argument', () => {
			it('should return that', () => {
				const name = 'Component';
				const module = { [name]: 'isNamed', OtherComponent: 'isAlsoNamed' };
				const actual = getComponent(module, name);
				expect(actual).toBe(module[name]);
			});
		});
		describe('if there is more than one named export and no matching name', () => {
			it('should fall back on returning the module as a whole', () => {
				const name = 'Component';
				const module = { RandomName: 'isNamed', confusingExport: 123 };
				const actual = getComponent(module, name);
				expect(actual).toBe(module);
			});
		});
	});

	describe('if there is a default export', () => {
		it('should return that', () => {
			const module = { default: 'useMe' };
			const actual = getComponent(module);
			expect(actual).toBe(module.default);
		});
	});
});
