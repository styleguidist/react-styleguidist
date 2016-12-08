import hasJsonLoader from '../hasJsonLoader';

it('should return true if given Webpack config has JSON loader', () => {
	const result = hasJsonLoader({
		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						babelrc: false,
						cacheDirectory: true,
					},
				},
				{
					test: p => /\.css$/.test(p),
					loader: 'style-loader!css-loader',
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
				},
			],
		},
	});
	expect(result).toBeTruthy();
});

it('should return false if given Webpack config has no JSON loader', () => {
	const result = hasJsonLoader({
		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						babelrc: false,
						cacheDirectory: true,
					},
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
			],
		},
	});
	expect(result).toBeFalsy();
});
