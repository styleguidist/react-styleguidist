import findUserWebpackConfig from '../findUserWebpackConfig';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return an object with create-react-app Webpack config', () => {
	process.chdir('test/apps/cra');
	const result = findUserWebpackConfig();
	expect(result).toMatch(/^react-scripts\//);
});

it('should return an object with user Webpack config located in project root folder', () => {
	process.chdir('test/apps/basic');
	const result = findUserWebpackConfig();
	expect(result).toMatch(/webpack.config.js$/);
});

it('should return an object with user Webpack config located in nested folder', () => {
	process.chdir('test/apps/webpack-nested');
	const result = findUserWebpackConfig();
	expect(result).toMatch(/webpack.config.js$/);
});
