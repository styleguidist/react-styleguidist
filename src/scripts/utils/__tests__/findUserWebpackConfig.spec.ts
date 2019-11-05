import findUserWebpackConfig from '../findUserWebpackConfig';

const cwd = process.cwd();
afterEach(() => process.chdir(cwd));

it('should return path to Create React App Webpack old config (react-scripts <= 2.1.1)', () => {
	const result = findUserWebpackConfig(a => a);
	expect(result).toMatchInlineSnapshot(`"react-scripts/config/webpack.config.dev"`);
});

it('should return path to Create React App Webpack config (react-scripts > 2.1.1)', () => {
	const result = findUserWebpackConfig(a => {
		if (/webpack\.config\.dev/.test(a)) {
			// Simulate an error. For example, if the file doesn't exist.
			throw new Error();
		}
		return a;
	});
	expect(result).toMatchInlineSnapshot(`"react-scripts/config/webpack.config"`);
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
