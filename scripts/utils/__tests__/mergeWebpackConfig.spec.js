import mergeWebpackConfig from '../mergeWebpackConfig';

class UglifyJsPlugin {}
class MyPlugin {}

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
	const result = mergeWebpackConfig(
		{
			plugins: [new UglifyJsPlugin()],
		},
		{
			plugins: [new UglifyJsPlugin(), new MyPlugin()],
		}
	);
	expect(result.plugins).toHaveLength(2);
	expect(result.plugins[0].constructor.name).toBe('UglifyJsPlugin');
	expect(result.plugins[1].constructor.name).toBe('MyPlugin');
});
