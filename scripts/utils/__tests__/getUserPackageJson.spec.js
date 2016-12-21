import getUserPackageJson from '../getUserPackageJson';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return object with package.json contents', () => {
	process.chdir('test/apps/cra');
	const result = getUserPackageJson();
	expect(result).toBeTruthy();
	expect(result.name).toBe('pizza-cra');
});
