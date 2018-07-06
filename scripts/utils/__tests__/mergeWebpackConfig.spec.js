import mergeWebpackConfig from '../mergeWebpackConfig';

class UglifyJsPlugin {}
class MyPlugin {}
class MiniHtmlWebpackPlugin {}

it('should merge two objects', () => {
	const result = mergeWebpackConfig({ a: 0, b: 0 }, { b: 1 });
	expect(result).toEqual({ a: 0, b: 1 });
});

it('should merge an object and a function', () => {
	const result = mergeWebpackConfig({ a: 0, b: 0 }, () => ({ b: 1 }));
	expect(result).toEqual({ a: 0, b: 1 });
});

it('should pass an environment to a user config', () => {
	const env = 'production';
	const userConfig = jest.fn();
	mergeWebpackConfig({}, userConfig, env);
	expect(userConfig).toBeCalledWith(env);
});

it('should ignore certain sections', () => {
	const result = mergeWebpackConfig({ entry: 0 }, () => ({ entry: 1, module: 1 }));
	expect(result).toEqual({ entry: 0, module: 1 });
});

it('should ignore certain Webpack plugins', () => {
	const baseInstance = new UglifyJsPlugin();
	const userInstance = new UglifyJsPlugin();
	const result = mergeWebpackConfig(
		{
			plugins: [baseInstance],
		},
		{
			plugins: [userInstance, new MyPlugin(), new MiniHtmlWebpackPlugin()],
		}
	);
	expect(result.plugins).toHaveLength(2);
	expect(result.plugins[0]).toBe(baseInstance);
	expect(result.plugins[0].constructor.name).toBe('UglifyJsPlugin');
	expect(result.plugins[1].constructor.name).toBe('MyPlugin');
});

it('should pass devtool settings in development', () => {
	const result = mergeWebpackConfig(
		{ devtool: false },
		() => ({ devtool: 'source-map' }),
		'development'
	);
	expect(result).toEqual({ devtool: 'source-map' });
});

it('should ignore devtool settings in production', () => {
	const result = mergeWebpackConfig(
		{ devtool: false },
		() => ({ devtool: 'source-map' }),
		'production'
	);
	expect(result).toEqual({ devtool: false });
});
