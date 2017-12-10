const path = require('path');

module.exports = {
	verbose: false,
	require: ['babel-polyfill'],
	skipComponentsWithoutExample: false,
	components: './src/components/**/[A-Z]*.js',
	ignore: ['**/__tests__/**', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.js$/,
					include: fileName => {
						if (fileName.includes(path.join('node_modules', 'react-native-vector-icons', 'lib'))) {
							return true;
						}

						if (fileName.includes('node_modules')) {
							return false;
						}
						return true;
					},
					loader: 'babel-loader',
					options: {
						plugins: ['react-native-web/babel'],
						presets: ['es2015', 'stage-0', 'react-native'],
						babelrc: false,
					},
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack-loader'],
				},
				{
					test: /\.ttf$/,
					loader: 'file-loader',
					include: path.resolve(__dirname, '../node_modules/react-native-vector-icons/Fonts'),
				},
			],
		},
	},
	dangerouslyUpdateWebpackConfig(webpackConfig, env) {
		webpackConfig.resolve.alias['react-native'] = 'react-native-web';
		webpackConfig.resolve.extensions = ['.web.js', '.js'];
		return webpackConfig;
	},
};
