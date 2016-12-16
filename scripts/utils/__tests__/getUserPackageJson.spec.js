import getUserPackageJson from '../getUserPackageJson';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return true if given package.json depends on create-react-app', () => {
	const result = getUserPackageJson();
	expect(result).toBeTruthy();
});
