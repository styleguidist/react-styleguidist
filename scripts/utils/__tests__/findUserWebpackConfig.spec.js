import findUserWebpackConfig from '../findUserWebpackConfig';

const cwd = process.cwd();
afterEach(() => process.chdir(cwd));

it('should return path to Create React App Webpack config', () => {
	const result = findUserWebpackConfig(a => a);
	expect(result).toMatch(/^react-scripts\//);
});

it('should return an absolute path to user Webpack config located in project root folder', () => {
	process.chdir('test/apps/basic');

	const result = findUserWebpackConfig();
	expect(result).toMatch(/^\//);
	expect(result).toMatch(/webpack.config.js$/);
});

it('should return false if there is no webpack config', () => {
	process.chdir('test/apps/no-webpack');

	const result = findUserWebpackConfig();
	expect(result).toBeFalsy();
});
