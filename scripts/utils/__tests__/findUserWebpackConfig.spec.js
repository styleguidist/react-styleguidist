import findUserWebpackConfig from '../findUserWebpackConfig';

const cwd = process.cwd();
afterEach(() => {
	process.chdir(cwd);
});

it('should return path to create-react-app Webpack config', () => {
	process.chdir('test/apps/cra');
	const result = findUserWebpackConfig();
	console.error('CWD1: ' + result + '\nCWD1: ' + process.cwd());  // eslint-disable-line no-console
	expect(result).toMatch(/^react-scripts\//);
});

it('should return an absolute path to user Webpack config located in project root folder', () => {
	process.chdir('test/apps/basic');
	const result = findUserWebpackConfig();
	console.error('CWD2: ' + result + '\nCWD2: ' + process.cwd());  // eslint-disable-line no-console
	expect(result).toMatch(/^\//);
	expect(result).toMatch(/webpack.config.js$/);
});

it('should return an absolute path to user Webpack config located in nested folder', () => {
	process.chdir('test/apps/webpack-nested');
	const result = findUserWebpackConfig();
	console.error('CWD3: ' + result + '\nCWD3: ' + process.cwd());  // eslint-disable-line no-console
	expect(result).toMatch(/^\//);
	expect(result).toMatch(/webpack.config.js$/);
});
