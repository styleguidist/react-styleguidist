const webpack = require('webpack');

module.exports = {
	require: ['babel-polyfill'],
	components: 'src/**/[A-Z]*.js',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					options: {
						plugins: ['react-native-web'],
						presets: ['react-native'],
						babelrc: false,
					},
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								hash: 'sha512',
								digest: 'hex',
								name: '[hash].[ext]',
							},
						},
					],
				},
				{
					test: /\.ttf$/,
					loader: 'file-loader',
				},
			],
		},
	},
	dangerouslyUpdateWebpackConfig(webpackConfig) {
		const newWebpackConfig = webpackConfig;

		// Add enviornment variables to the browser
		newWebpackConfig.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: process.env,
			})
		);

		// auto resolves any react-native import as react-native-web
		newWebpackConfig.resolve.alias['react-native'] = 'react-native-web';
		newWebpackConfig.resolve.extensions = ['.web.js', '.js'];

		return newWebpackConfig;
	},
};
