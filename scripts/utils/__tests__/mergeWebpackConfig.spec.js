import mergeWebpackConfig from '../mergeWebpackConfig';

class UglifyJsPlugin {}
class MyPlugin {}

class LoaderOptionsPlugin {
	constructor(options) {
		this.options = options;
	}
}

it('should merge two objects', () => {
	const result = mergeWebpackConfig({ a: 0, b: 0 }, { b: 1 }, {});
	expect(result).toEqual({ a: 0, b: 1, plugins: [] });
});

it('should merge an object and a function', () => {
	const result = mergeWebpackConfig({ a: 0, b: 0 }, () => ({ b: 1 }), {});
	expect(result).toEqual({ a: 0, b: 1, plugins: [] });
});

it('should pass an environment to a user config', () => {
	const env = 'production';
	const userConfig = jest.fn();
	mergeWebpackConfig({}, userConfig, { env });
	expect(userConfig).toBeCalledWith(env);
});

it('should ignore given sections', () => {
	const result = mergeWebpackConfig({ a: 0 }, () => ({ a: 1, b: 1 }), { ignore: ['a'] });
	expect(result).toEqual({ a: 0, b: 1, plugins: [] });
});

it('should ignore certain Webpack plugins', () => {
	const result = mergeWebpackConfig({
		plugins: [
			new UglifyJsPlugin(),
		],
	}, {
		plugins: [
			new UglifyJsPlugin(),
			new MyPlugin(),
		],
	}, {});
	expect(result.plugins).toHaveLength(2);
	expect(result.plugins[0].constructor.name).toBe('UglifyJsPlugin');
	expect(result.plugins[1].constructor.name).toBe('MyPlugin');
});

it('should merge all LoaderOptionsPlugin plugins into one', () => {
	const result = mergeWebpackConfig({
		plugins: [
			new LoaderOptionsPlugin({
				options: {
					a: 'a value',
				},
			}),
		],
	}, {
		plugins: [
			new LoaderOptionsPlugin({
				options: {
					b: 'b value',
				},
			}),
		],
	}, {});
	expect(result.plugins).toHaveLength(1);
	expect(result.plugins[0].constructor.name).toBe('LoaderOptionsPlugin');
	expect(result.plugins[0].options).toEqual({ options: { a: 'a value', b: 'b value' } });
});
