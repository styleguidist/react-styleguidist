import webpack, {
	Compiler,
	Configuration,
	validate,
	ValidationError,
	WebpackPluginInstance,
} from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import makeWebpackConfig from '../make-webpack-config';
import * as Rsg from '../../typings';

jest.mock('copy-webpack-plugin');

type WebpackPlugin = WebpackPluginInstance | ((this: Compiler, compiler: Compiler) => void) | '...';

const styleguideConfig = ({
	styleguideDir: __dirname,
	require: [],
	title: 'Style Guide',
} as unknown) as Rsg.SanitizedStyleguidistConfig;

const getClasses = (plugins: WebpackPlugin[] = [], name: string): WebpackPlugin[] =>
	plugins.filter((x) => x.constructor.name === name);

const getClassNames = (plugins: WebpackPlugin[] = []): string[] =>
	plugins.map((x) => x.constructor.name);

const process$env$nodeEnv = process.env.NODE_ENV;

beforeEach(() => {
	((CopyWebpackPlugin as unknown) as jest.Mock).mockClear();
});

afterEach(() => {
	process.env.NODE_ENV = process$env$nodeEnv;
});

it('should return a development config', () => {
	const env = 'development';
	const config = makeWebpackConfig(styleguideConfig, env);

	expect(() => validate(config)).not.toThrow(ValidationError);
	expect(config).toMatchObject({
		mode: env,
	});
	expect(config).not.toHaveProperty('optimization');
});

it('should return a production config', () => {
	const env = 'production';
	const config = makeWebpackConfig(styleguideConfig, env);
	expect(() => validate(config)).not.toThrow(ValidationError);

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
	const result = getClasses(config.optimization && config.optimization.minimizer, 'TerserPlugin');
	expect(result).toHaveLength(1);
});

it('should set aliases', () => {
	const result = makeWebpackConfig(styleguideConfig, 'development');
	expect(result.resolve && result.resolve.alias).toMatchSnapshot();
});

it('should set aliases from moduleAliases option', () => {
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			moduleAliases: {
				foo: 'bar',
			},
		},
		'development'
	);
	expect(result.resolve && result.resolve.alias).toMatchSnapshot();
});

it('should set aliases from styleguideComponents option', () => {
	const result = makeWebpackConfig(
		{
			...styleguideConfig,
			styleguideComponents: {
				foo: 'bar',
			},
		},
		'development'
	);
	expect(result.resolve && result.resolve.alias).toMatchSnapshot();
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
	expect((getClasses(result.plugins, 'CleanWebpackPlugin')[0] as any).verbose).toBe(true);
});

it('should set from with assetsDir in CopyWebpackPlugin', () => {
	makeWebpackConfig({ ...styleguideConfig, assetsDir: '/assets/' }, 'production');
	expect(CopyWebpackPlugin).toHaveBeenCalledWith({
		patterns: [{ from: '/assets/' }],
	});
});

it('should set array of from with assetsDir array in CopyWebpackPlugin', () => {
	makeWebpackConfig({ ...styleguideConfig, assetsDir: ['/assets1/', '/assets2/'] }, 'production');
	expect(CopyWebpackPlugin).toHaveBeenCalledWith({
		patterns: [{ from: '/assets1/' }, { from: '/assets2/' }],
	});
});

it('should merge user webpack config', () => {
	const result = makeWebpackConfig(
		{ ...styleguideConfig, webpackConfig: { resolve: { alias: { foo: 'bar' } } } },
		'development'
	);
	expect(result.resolve && result.resolve.alias).toMatchSnapshot();
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
			dangerouslyUpdateWebpackConfig: (c: Configuration) => {
				if (c.resolve) {
					c.resolve.extensions = extensions;
				}
				return c;
			},
		},
		'development'
	);
	expect(result.resolve && result.resolve.extensions).toEqual(extensions);
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
	expect(
		(getClasses(result.plugins, 'MiniHtmlWebpackPlugin')[0] as any).options.context.container
	).toEqual('foo-bar');
});
