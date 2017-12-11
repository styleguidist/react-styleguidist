import webpack from 'webpack';
import makeWebpackConfig from '../make-webpack-config';

const styleguideConfig = {
	styleguideDir: __dirname,
	require: [],
	highlightTheme: 'hl-theme',
	title: 'Style Guide',
	template: 'template.html',
};

const process$env$nodeEnv = process.env.NODE_ENV;

afterEach(() => {
	process.env.NODE_ENV = process$env$nodeEnv;
});

it('should return a development config', () => {
	const result = makeWebpackConfig(styleguideConfig, 'development');
	expect(result).toMatchSnapshot();
});

it('should return a production config', () => {
	const result = makeWebpackConfig(styleguideConfig, 'production');
	expect(result).toMatchSnapshot();
});

it('should prepend requires as webpack entries', () => {
	const result = makeWebpackConfig(
		{ ...styleguideConfig, require: ['a/b.js', 'c/d.css'] },
		'development'
	);
	expect(result.entry).toMatchSnapshot();
});

it('should enable verbose mode in CleanWebpackPlugin', () => {
	const result = makeWebpackConfig({ ...styleguideConfig, verbose: true }, 'production');
	expect(result.plugins.filter(x => x.constructor.name === 'CleanWebpackPlugin')).toMatchSnapshot();
});

it('should merge user webpack config', () => {
	const result = makeWebpackConfig(
		{ ...styleguideConfig, webpackConfig: { resolve: { alias: { foo: 'bar' } } } },
		'development'
	);
	expect(result.resolve.alias).toMatchSnapshot();
});

it('should not owerwrite user DefinePlugin', () => {
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			webpackConfig: {
				plugins: [
					new webpack.DefinePlugin({
						'process.env.PIZZA': JSON.stringify('salami'),
					}),
				],
			},
		},
		'development'
	);

	// Doesn’t really test that values won’t be overwritten, just that DefinePlugin is applied twice
	// To write a real test we’d have to run webpack
	expect(result.plugins.filter(x => x.constructor.name === 'DefinePlugin')).toMatchSnapshot();
});

it('should update webpack config', () => {
	const extensions = ['.web.js', '.js'];
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			dangerouslyUpdateWebpackConfig: c => {
				c.resolve.extensions = extensions;
				return c;
			},
		},
		'development'
	);
	expect(result.resolve.extensions).toEqual(extensions);
});

it('should update NODE_ENV', () => {
	process.env.NODE_ENV = '';
	makeWebpackConfig(styleguideConfig, 'production');
	expect(process.env.NODE_ENV).toBe('production');
});

it('should not overwrite NODE_ENV', () => {
	makeWebpackConfig(styleguideConfig, 'production');
	expect(process.env.NODE_ENV).toBe(process$env$nodeEnv);
});
