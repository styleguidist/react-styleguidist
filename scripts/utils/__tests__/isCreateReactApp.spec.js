import isCreateReactApp from '../isCreateReactApp';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return true if given package.json depends on Create React App', () => {
	process.chdir('test/apps/cra');
	const result = isCreateReactApp();
	expect(result).toBeTruthy();
});

it('should return false if given package.json does not depend on Create React App', () => {
	process.chdir('test/apps/basic');
	const result = isCreateReactApp();
	expect(result).toBeFalsy();
});
