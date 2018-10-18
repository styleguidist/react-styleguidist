import webpack, { validate } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import makeWebpackConfig from '../make-webpack-config';

jest.mock('copy-webpack-plugin', () => {
	const RealCopyWebpackPluginModule = require.requireActual('copy-webpack-plugin');
	return jest.fn(RealCopyWebpackPluginModule);
});

const theme = 'hl-theme';
const styleguideConfig = {
	styleguideDir: __dirname,
	require: [],
	editorConfig: {
		theme,
	},
	title: 'Style Guide',
};

const getClasses = (plugins, name) => plugins.filter(x => x.constructor.name === name);
const getClassNames = plugins => plugins.map(x => x.constructor.name);

const process$env$nodeEnv = process.env.NODE_ENV;

beforeEach(() => {
	CopyWebpackPlugin.mockClear();
});

afterEach(() => {
	process.env.NODE_ENV = process$env$nodeEnv;
});

it('should return a development config', () => {
	const env = 'development';
	const config = makeWebpackConfig(styleguideConfig, env);

	const errors = validate(config);
	expect(errors).toHaveLength(0);

	const plugins = getClassNames(config.plugins);
	expect(plugins).toContain('HotModuleReplacementPlugin');

	expect(config).toMatchObject({
		mode: env,
	});
	expect(config).not.toHaveProperty('optimization');
});

it('should return a production config', () => {
	const env = 'production';
	const config = makeWebpackConfig(styleguideConfig, env);
	const errors = validate(config);
	expect(errors).toHaveLength(0);

	const plugins = getClassNames(config.plugins);
	expect(plugins).toContain('CleanWebpackPlugin');
	expect(plugins).not.toContain('HotModuleReplacementPlugin');

	expect(config).toMatchObject({
		output: {
			filename: expect.stringContaining('[chunkhash'),
			chunkFilename: expect.stringContaining('[chunkhash'),
		},
	});

	expect(config).toMatchObject({
		mode: env,
	});
	expect(getClasses(config.optimization.minimizer, 'TerserPlugin')).toHaveLength(1);
});

it('should set aliases', () => {
	const result = makeWebpackConfig(styleguideConfig, 'development');
	expect(result.resolve.alias).toMatchSnapshot();
});

it('should prepend requires as webpack entries', () => {
	const result = makeWebpackConfig(
		{ ...styleguideConfig, require: ['a/b.js', 'c/d.css'] },
		'development'
	);
	expect(result.entry).toMatchSnapshot();
});

it('editorConfig theme should change alias', () => {
	const highlightTheme = 'solarized';
	const result = makeWebpackConfig(
		{ ...styleguideConfig, editorConfig: { theme: highlightTheme } },
		'development'
	);
	expect(result.resolve.alias['rsg-codemirror-theme.css']).toMatch(highlightTheme);
});

it('should use editorConfig theme over highlightTheme', () => {
	const highlightTheme = 'solarized';
	const result = makeWebpackConfig({ ...styleguideConfig, highlightTheme }, 'development');
	expect(result.resolve.alias['rsg-codemirror-theme.css']).toMatch(theme);
});

it('should enable verbose mode in CleanWebpackPlugin', () => {
	const result = makeWebpackConfig({ ...styleguideConfig, verbose: true }, 'production');
	expect(getClasses(result.plugins, 'CleanWebpackPlugin')).toMatchSnapshot();
});

it('should set from with assetsDir in CopyWebpackPlugin', () => {
	makeWebpackConfig({ ...styleguideConfig, assetsDir: '/assets/' }, 'production');
	expect(CopyWebpackPlugin).toHaveBeenCalledWith([{ from: '/assets/' }]); //([
});

it('should add CopyWebpackPlugin to plugins in production', () => {
	makeWebpackConfig({ ...styleguideConfig }, 'production');
	expect(CopyWebpackPlugin).toHaveBeenCalledWith([]);
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

	// Doesn’t really test that values won’t be overwritten, just that
	// DefinePlugin is applied twice. To write a real test we’d have to run
	// webpack
	expect(getClasses(result.plugins, 'DefinePlugin')).toMatchSnapshot();
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

it('should pass template context to HTML plugin', () => {
	const template = {
		pizza: 'salami',
	};
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			template,
		},
		'development'
	);
	expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0]).toMatchObject({
		options: {
			context: template,
			template: expect.any(Function),
		},
	});
});

it('should pass template function to HTML plugin', () => {
	const template = () => '<html />';
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			template,
		},
		'development'
	);
	expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0]).toMatchObject({
		options: {
			context: expect.any(Object),
			template,
		},
	});
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

it('should pass specified mountPointId to HTML plugin', () => {
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			mountPointId: 'foo-bar',
		},
		'development'
	);
	expect(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0].options.context.container).toEqual(
		'foo-bar'
	);
});
